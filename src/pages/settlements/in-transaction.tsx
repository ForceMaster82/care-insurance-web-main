import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import {isServer, ModalProvider} from '@caredoc/utils-web'
import {subDays} from 'date-fns'
import {Loading} from '@caredoc/templates-web'
import {reaction, toJS} from 'mobx'
import {observer} from 'mobx-react-lite'
import {stringify} from 'qs'
import Layout from '../../templates/layouts/Layout'
import SettlementsInTransactionView from '../../views/settlements-in-transaction'
import {
  SearchCategory,
  SettlementInTransactionPageSearchFilterKey,
} from '../../types'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {formatDate, getToday} from '../../utils/date'
import usePagination from '~hooks/use-pagination'
import {RECEPTIONS_PATH} from '~constants/route-paths'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import useSettlementList from '~hooks/api/settlement/use-settlement-list'

const SettlementsInTransactionPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')
  const searchCategoryQueryValue = pageQuery?.get('search-category') as
    | SearchCategory
    | undefined

  const router = useRouter()

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<SettlementInTransactionPageSearchFilterKey>({
        SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
        SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
        TRANSACTION_DATE_FROM:
          pageQuery?.get('transaction-date-from') ||
          // eslint-disable-next-line no-magic-numbers
          formatDate(subDays(getToday(), 7)),
        TRANSACTION_DATE_UNTIL:
          pageQuery?.get('transaction-date-until') || formatDate(getToday()),
      }),
  )

  const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const {data: settlementListData} = useSettlementList({
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    progressingStatus: 'COMPLETED',
    searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
    searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
    sort: 'LAST_TRANSACTION_DATE_TIME_DESC',
    transactionDateFrom: searchFilterStore.searchFilter.TRANSACTION_DATE_FROM,
    transactionDateUntil: searchFilterStore.searchFilter.TRANSACTION_DATE_UNTIL,
  })

  const handleOnChangeSearchFilter =
    <K extends SettlementInTransactionPageSearchFilterKey>(key: K) =>
    (value: SearchFilter[K]) => {
      searchFilterStore.set(key, value)
    }

  const handleOnClickAccidentNumberInSearchResult = (
    receptionId: string,
  ): void => {
    const query = stringify({
      ...searchFilterStore.toQueryData(),
      'page-number': pageNumber,
    })

    router.replace({query}, undefined, {shallow: true})
    router.push(RECEPTIONS_PATH.DETAIL(receptionId))
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
      <Layout currentPage="SETTLEMENT">
        {settlementListData ? (
          <SettlementsInTransactionView
            onChangeSearchFilter={handleOnChangeSearchFilter}
            onClickAccidentNumber={handleOnClickAccidentNumberInSearchResult}
            searchFilter={toJS(searchFilterStore.searchFilter)}
            setPageNumber={setPageNumber}
            settlementListData={settlementListData}
          />
        ) : (
          <Loading />
        )}
      </Layout>
    </ModalProvider>
  )
})

export default SettlementsInTransactionPage
