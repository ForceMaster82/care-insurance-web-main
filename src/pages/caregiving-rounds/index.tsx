/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Loading} from '@caredoc/templates-web'
import {stringify} from 'qs'
import {reaction, toJS} from 'mobx'
import {observer} from 'mobx-react-lite'
import {isServer} from '@caredoc/utils-web'
import {format} from 'date-fns'
import CaregivingRoundsView from '../../views/caregiving-rounds'
import {DEFAULT_PAGE_SIZE} from '../../constants/data'
import useCaregivingRoundList from '../../hooks/api/caregiving-round/use-caregiving-round-list'
import usePagination from '../../hooks/use-pagination'
import useUserDetail from '../../hooks/api/user/use-user-detail'
import {getUserIdFromToken} from '../../utils/manage-token'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {downloadFile} from '../../utils/download-file'
import {BOM_UTF_8} from '../../constants'
import {fetcher} from '../../utils/fetcher'
import {getFilenameFromHttpHeaders} from '../../utils/get-filename-from-http-headers'
import {
    BillingProgressingStatus,
    CaregivingProgressingStatus,
    CaregivingRoundsPageSearchFilterKey, Notify,
    ReceptionProgressingStatus,
    SearchCategory,
    SettlementProgressingStatus,
} from '~types'
import Layout from '~templates/layouts/Layout'

const CaregivingRoundsPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const receptionProgressingStatusQueryValue = pageQuery?.getAll(
    'reception-progressing-status',
  ) as ReceptionProgressingStatus[] | undefined
  const caregivingProgressingStatusQueryValue = pageQuery?.getAll(
    'caregiving-progressing-status',
  ) as CaregivingProgressingStatus[] | undefined
  const settlementProgressingStatusQueryValue = pageQuery?.getAll(
    'settlement-progressing-status',
  ) as SettlementProgressingStatus[] | undefined
  const billingProgressingStatusQueryValue = pageQuery?.getAll(
    'billing-progressing-status',
  ) as BillingProgressingStatus[] | undefined
  const pageNumberQueryValue = pageQuery?.get('page-number')
  const NotifyQueryValue = pageQuery?.get('notify') as Notify

  const router = useRouter()

  const {setPageNumber, pageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<CaregivingRoundsPageSearchFilterKey>({
        BILLING_PROGRESSING_STATUS:
          (billingProgressingStatusQueryValue?.length &&
            billingProgressingStatusQueryValue) || ['NOT_STARTED'],
        CAREGIVING_PROGRESSING_STATUS:
          (caregivingProgressingStatusQueryValue?.length &&
            caregivingProgressingStatusQueryValue) || ['CAREGIVING_IN_PROGRESS',],
        EXPECTED_CAREGIVING_START_DATE:
          pageQuery?.get('expected-caregiving-start-date') || '',
        FROM: pageQuery?.get('from') || '',
        RECEPTION_PROGRESSING_STATUS:
          (receptionProgressingStatusQueryValue?.length &&
            receptionProgressingStatusQueryValue) || ['CAREGIVING_IN_PROGRESS'],
        SEARCH_CATEGORY:
          (pageQuery?.get('search-category') as SearchCategory | undefined) ||
          'patientName',
        SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
        SETTLEMENT_PROGRESSING_STATUS:
          (settlementProgressingStatusQueryValue?.length &&
            settlementProgressingStatusQueryValue) || ['NOT_STARTED'],
        UNTIL: pageQuery?.get('until') || '',
        NOTIFY_CAREGIVING_PROGRESS: NotifyQueryValue,
      }),
  )

  const user = useUserDetail({userId: getUserIdFromToken()})

  const caregivingRoundListData = useCaregivingRoundList({
    expectedCaregivingStartDate:
      searchFilterStore.searchFilter.EXPECTED_CAREGIVING_START_DATE,
    from: searchFilterStore.searchFilter.FROM,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
    searchFilter: {
      BILLING_PROGRESSING_STATUS:
        searchFilterStore.searchFilter.BILLING_PROGRESSING_STATUS,
      CAREGIVING_PROGRESSING_STATUS:
        searchFilterStore.searchFilter.CAREGIVING_PROGRESSING_STATUS,
      RECEPTION_PROGRESSING_STATUS:
        searchFilterStore.searchFilter.RECEPTION_PROGRESSING_STATUS,
      SETTLEMENT_PROGRESSING_STATUS:
        searchFilterStore.searchFilter.SETTLEMENT_PROGRESSING_STATUS,
    },
    searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
    until: searchFilterStore.searchFilter.UNTIL,
    user,
    notify: searchFilterStore.searchFilter.NOTIFY_CAREGIVING_PROGRESS,
  })

  const handleOnClickListItem = (receptionId: string): void => {
    const query = stringify(
      {
        ...searchFilterStore.toQueryData(),
        'page-number': pageNumber,
      },
      {
        arrayFormat: 'repeat',
      },
    )

    router.replace({query}, undefined, {shallow: true})
    router.push(RECEPTIONS_PATH.DETAIL(receptionId))
  }

  const inArray = (arr:string[], val:string) => {
      for (let i=0; i<arr.length; i++) {
          if (arr[i] == val) return i;
      }
      return -1;
  }

  const handleOnChangeSearchFilters =
    <K extends CaregivingRoundsPageSearchFilterKey>(key: K) =>
    (value: SearchFilter[K]) => {
        searchFilterStore.set(key, value)
        if (inArray(['SEARCH_CATEGORY','SEARCH_KEYWORD'], key) == -1) {
            searchFilterStore.set('SEARCH_CATEGORY', '')
            searchFilterStore.set('SEARCH_KEYWORD', '')
        }
    }

  const handleOnClickCsvDownload =
    (expectedCaregivingStartDate: string) => async () => {
      if (!expectedCaregivingStartDate) {
        return
      }

      const path =
        (user?.organizationId &&
          `/api/v1/organizations/${user.organizationId}/caregiving-rounds`) ||
        '/api/v1/caregiving-rounds'

      try {
        const data = await fetcher<string>(
          `${path}?expected-caregiving-start-date=${expectedCaregivingStartDate}&caregiving-progressing-status=CAREGIVING_IN_PROGRESS`,
          {
            headers: {
              Accept: 'text/csv',
            },
          },
        )

        const fileName =
          getFilenameFromHttpHeaders(data.headers) ||
          `[간병관리]${format(
            new Date(expectedCaregivingStartDate),
            'yyyyMMdd',
          )}.csv`
        const file = new File([BOM_UTF_8 + data.body], fileName, {
          type: 'text/csv',
        })

        downloadFile(file)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : error

        // eslint-disable-next-line no-alert
        alert(errorMessage)
      }
    }

  useEffect(() => {
    const dispose = reaction(
      () => toJS(searchFilterStore.searchFilter),
      () => {
        resetPageNumber()
      },
    )

    return () => {
      dispose()
    }
  }, [resetPageNumber, searchFilterStore.searchFilter])

  return (
    <Layout currentPage="CAREGIVING">
      {caregivingRoundListData ? (
        <CaregivingRoundsView
          data={caregivingRoundListData}
          onChangePageNumber={setPageNumber}
          onChangeSearchFilter={handleOnChangeSearchFilters}
          onClickCsvDownload={handleOnClickCsvDownload}
          onClickListItem={handleOnClickListItem}
          searchFilter={toJS(searchFilterStore.searchFilter)}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default CaregivingRoundsPage
