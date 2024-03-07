import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useState} from 'react'
import {isServer, ModalProvider} from '@caredoc/utils-web'
import {Loading} from '@caredoc/templates-web'
import {observer} from 'mobx-react-lite'
import {reaction, toJS} from 'mobx'
import {stringify} from 'qs'
import useItemSelection from '../../hooks/use-item-selection'
import {
  formatDate,
  getFirstDateOfMonth,
  getLastDateOfMonth,
  getThisMonth,
  getThisYear,
} from '../../utils/date'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import {downloadBillingCertificates} from '../../utils/billing-certificate/download-billing-certificates'
import {
  BillingWaitingDepositPageSearchFilterKey,
  SearchCategory,
} from '../../types'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import Layout from '~templates/layouts/Layout'
import BillingsWaitingDepositView from '~views/billings-waiting-deposit'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import useBillingList from '~hooks/api/billing/use-billing-list'
import usePagination from '~hooks/use-pagination'

const BillingsWaitingDepositPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')
  const searchCategoryQueryValue = pageQuery?.get('search-category') as
    | SearchCategory
    | undefined

  const router = useRouter()

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<BillingWaitingDepositPageSearchFilterKey>({
        BILLING_DATE_FROM:
          pageQuery?.get('billing-date-from') ||
          formatDate(getFirstDateOfMonth(getThisYear(), getThisMonth() - 1)),
        BILLING_DATE_UNTIL:
          pageQuery?.get('billing-date-until') ||
          formatDate(getLastDateOfMonth()),
        SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
        SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
      }),
  )

  const {
    selectItem: selectBilling,
    selectedItems: selectedBillingIds,
    setSelectedItems: setSelectedBillings,
  } = useItemSelection()

  const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const billingListData = useBillingList({
    billingDateFrom: searchFilterStore.searchFilter.BILLING_DATE_FROM,
    billingDateUntil: searchFilterStore.searchFilter.BILLING_DATE_UNTIL,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    progressingStatus: ['WAITING_DEPOSIT'],
    searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
    searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
  })

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
    const downloadRequired =
      // eslint-disable-next-line no-alert
      confirm(
        `선택한 ${selectedBillingIds.length}건(들)의 사용확인서를 다운로드하시겠습니까?`,
      )

    if (!downloadRequired) {
      return
    }

    await downloadBillingCertificates(selectedBillingIds)

    setSelectedBillings([])
  }, [selectedBillingIds, setSelectedBillings])

  const handleOnChangeSearchFilter =
    <K extends BillingWaitingDepositPageSearchFilterKey>(key: K) =>
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
          <BillingsWaitingDepositView
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

export default BillingsWaitingDepositPage
