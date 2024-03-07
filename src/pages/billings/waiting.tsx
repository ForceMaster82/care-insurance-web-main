import {NextPage} from 'next'
import React, {useCallback, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {isServer, ModalProvider} from '@caredoc/utils-web'
import {useQueryClient} from '@tanstack/react-query'
import {Loading} from '@caredoc/templates-web'
import {observer} from 'mobx-react-lite'
import {reaction, toJS} from 'mobx'
import {stringify} from 'qs'
import {
  formatDate,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  getThisMonth,
  getThisYear,
} from '../../utils/date'
import useItemSelection from '../../hooks/use-item-selection'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import {downloadBillingCertificates} from '../../utils/billing-certificate/download-billing-certificates'
import {BillingWaitingPageSearchFilterKey, SearchCategory} from '../../types'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import Layout from '~templates/layouts/Layout'
import BillingsWaitingView from '~views/billings-waiting'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import usePagination from '~hooks/use-pagination'
import useBillingList from '~hooks/api/billing/use-billing-list'

const BillingsWaitingPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')
  const searchCategoryQueryValue = pageQuery?.get('search-category') as
    | SearchCategory
    | undefined

  const router = useRouter()

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<BillingWaitingPageSearchFilterKey>({
        SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
        SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
        USED_PERIOD_FROM:
          pageQuery?.get('used-period-from') ||
          formatDate(getFirstDateOfMonth(getThisYear(), getThisMonth() - 1)),
        USED_PERIOD_UNTIL:
          pageQuery?.get('used-period-until') ||
          formatDate(getLastDateOfMonth()),
      }),
  )

  const {
    selectedItems: selectedBillingIds,
    selectItem: selectBilling,
    setSelectedItems: setSelectedBillings,
  } = useItemSelection()

  const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const billingListData = useBillingList({
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    progressingStatus: ['WAITING_FOR_BILLING'],
    searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
    searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
    usedPeriodFrom: searchFilterStore.searchFilter.USED_PERIOD_FROM,
    usedPeriodUntil: searchFilterStore.searchFilter.USED_PERIOD_UNTIL,
  })

  const queryClient = useQueryClient()

  const handleOnClickListItemAccidentNumber = (receptionId: string): void => {
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
    router.push(RECEPTIONS_PATH.BILLINGS(receptionId))
  }

  const handleOnClickDownloadCertificates = useCallback(async () => {
    // eslint-disable-next-line no-alert
    const downloadRequired = confirm(
      `선택한 ${selectedBillingIds.length}건(들)의 사용확인서를 다운로드 및 청구 처리하시겠습니까?`,
    )

    if (!downloadRequired) {
      return
    }

    await downloadBillingCertificates(selectedBillingIds)

    queryClient.invalidateQueries({
      queryKey: ['billing', 'list'],
    })
    setSelectedBillings([])
  }, [queryClient, selectedBillingIds, setSelectedBillings])

  const handleOnChangeSearchFilter =
    <K extends BillingWaitingPageSearchFilterKey>(key: K) =>
    (value: SearchFilter[K]) => {
      searchFilterStore.set(key, value)
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
    <ModalProvider>
      <Layout currentPage="BILLING">
        {billingListData ? (
          <BillingsWaitingView
            billingListData={billingListData}
            onChangeSearchFilter={handleOnChangeSearchFilter}
            onClickDownloadCertificate={handleOnClickDownloadCertificates}
            onClickListItemAccidentNumber={handleOnClickListItemAccidentNumber}
            onSelectAllListItem={setSelectedBillings}
            onSelectListItem={selectBilling}
            searchFilter={toJS(searchFilterStore.searchFilter)}
            selectedListItemIds={selectedBillingIds}
            setPageNumber={setPageNumber}
          />
        ) : (
          <Loading />
        )}
      </Layout>
    </ModalProvider>
  )
})

export default BillingsWaitingPage
