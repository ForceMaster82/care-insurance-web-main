import {NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Loading} from '@caredoc/templates-web'
import {observer} from 'mobx-react-lite'
import {reaction, toJS} from 'mobx'
import {stringify} from 'qs'
import {isServer} from '@caredoc/utils-web'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {CaregivingRoundsPageSearchFilterKey, StatisticDailySettlementTransactionPageSearchFilterKey} from '../../types'
import {formatDate, getToday} from '../../utils/date'
import Layout from '~templates/layouts/Layout'
import StatisticDailySettlementTransactionView from '~views/statistic-daily-settlement-transaction'
import usePagination from '~hooks/use-pagination'
import useDailySettlementTransactionStatistic from '~hooks/api/settlement/use-daily-settlement-transaction-statistic'
import useDailyCaregivingRoundSettlementTransactionStatisticList from '~hooks/api/settlement/use-daily-caregiving-round-settlement-transaction-statistic-list'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import {SearchCategory} from '~types'
import {fetcher} from "utils/fetcher";
import {getFilenameFromHttpHeaders} from "utils/get-filename-from-http-headers";
import {format} from "date-fns";
import {downloadFile} from "utils/download-file";

const StatisticDailySettlementTransactionPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')

  const router = useRouter()

  const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<StatisticDailySettlementTransactionPageSearchFilterKey>(
        {
          // DATE: pageQuery?.get('date') || formatDate(getToday()),
          DATE: pageQuery?.get('date') || formatDate(new Date('2023-09-26')),
            SEARCH_CATEGORY:
                (pageQuery?.get('search-category') as SearchCategory | undefined) ||
                'patientName',
            SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
            UNTIL: '',
            FROM: '',
        },
      ),
  )

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
    router.push(RECEPTIONS_PATH.SETTLEMENTS(receptionId))
  }

  const totalTransactionAmount = useDailySettlementTransactionStatistic({
    date: searchFilterStore.searchFilter.DATE,
      searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
      searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
  })

  const handleOnClickExcelDownload = (
    expectedCaregivingStartDate: string,
    expectedCaregivingEndDate: string,
  ) => async () => {
      if (!expectedCaregivingStartDate || !expectedCaregivingEndDate) {
          return
      }

      const path = `${process.env.NEXT_PUBLIC_API_URL}/api/v2/statistic/settlementExcelDown?from=${expectedCaregivingStartDate}&until=${expectedCaregivingStartDate}`
      document.location.href = path
  }

  const settlementTransactionList =
    useDailyCaregivingRoundSettlementTransactionStatisticList({
      date: searchFilterStore.searchFilter.DATE,
      pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
      searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
    })

  const handleOnChangeSearchFilter =
    <K extends StatisticDailySettlementTransactionPageSearchFilterKey>(
      key: K,
    ) =>
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
    <Layout currentPage="CARE_STATUS">
      {settlementTransactionList ? (
        <StatisticDailySettlementTransactionView
          onClickExcelDownload={handleOnClickExcelDownload}
          onChangeSearchFilter={handleOnChangeSearchFilter}
          onClickListItemAccidentNumber={handleOnClickListItemAccidentNumber}
          searchFilter={toJS(searchFilterStore.searchFilter)}
          setPageNumber={setPageNumber}
          settlementTransactionList={settlementTransactionList}
          totalTransactionAmount={totalTransactionAmount}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default StatisticDailySettlementTransactionPage