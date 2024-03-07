import {NextPage} from 'next'
import React, {useCallback, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {subDays} from 'date-fns'
import {isServer, ModalProvider} from '@caredoc/utils-web'
import {Loading} from '@caredoc/templates-web'
import {observer} from 'mobx-react-lite'
import {reaction, toJS} from 'mobx'
import {stringify} from 'qs'
import useItemSelection from '../../hooks/use-item-selection'
import {
  BillingInTransactionPageSearchFilterKey,
  BillingProgressingStatus,
  SearchCategory,
} from '../../types'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import {downloadBillingCertificates} from '../../utils/billing-certificate/download-billing-certificates'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {formatDate, getToday} from '../../utils/date'
import Layout from '~templates/layouts/Layout'
import BillingsInTransactionView from '~views/billings-in-transaction'
import useBillingList from '~hooks/api/billing/use-billing-list'
import usePagination from '~hooks/use-pagination'
import {DEFAULT_PAGE_SIZE} from '~constants/data'

const BillingInTransactionPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')
  const searchCategoryQueryValue = pageQuery?.get('search-category') as
    | SearchCategory
    | undefined
  const billingProgressingStatusQueryValue = pageQuery?.getAll(
    'billing-progressing-status',
  ) as BillingProgressingStatus[] | undefined

  const router = useRouter()

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<BillingInTransactionPageSearchFilterKey>({
        BILLING_PROGRESSING_STATUS:
          (billingProgressingStatusQueryValue?.length &&
            billingProgressingStatusQueryValue) || [
            'UNDER_DEPOSIT',
            'OVER_DEPOSIT',
          ],
        SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
        SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
        TRANSACTION_DATE_FROM:
          pageQuery?.get('transaction-date-from') ||
          // eslint-disable-next-line no-magic-numbers
          formatDate(subDays(getToday(), 7)),
        TRANSACTION_DATE_UNTIL:
          pageQuery?.get('transaction-date-until') || formatDate(new Date()),
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
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    progressingStatus:
      searchFilterStore.searchFilter.BILLING_PROGRESSING_STATUS,
    searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
    searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
    sort: 'TRANSACTION_DATE_DESC',
    transactionDateFrom: searchFilterStore.searchFilter.TRANSACTION_DATE_FROM,
    transactionDateUntil: searchFilterStore.searchFilter.TRANSACTION_DATE_UNTIL,
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
    <K extends BillingInTransactionPageSearchFilterKey>(key: K) =>
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
          <BillingsInTransactionView
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

export default BillingInTransactionPage
