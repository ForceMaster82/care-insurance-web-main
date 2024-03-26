import {NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {Loading} from '@caredoc/templates-web'
import {reaction, toJS} from 'mobx'
import {stringify} from 'qs'
import {observer} from 'mobx-react-lite'
import {isServer} from '@caredoc/utils-web'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {StatisticDailyBillingTransactionPageSearchFilterKey} from '../../types'
import {formatDate, getToday} from '../../utils/date'
import Layout from '~templates/layouts/Layout'
import StatisticDailyBillingTransactionView from '~views/statistic-daily-billing-transaction'
import useDailyBillingTransactionStatistic from '~hooks/api/billing/use-daily-billing-transaction-statistic'
import useDailyCaregivingRoundBillingTransactionStatisticList from '~hooks/api/billing/use-daily-caregiving-round-billing-transaction-statistic'
import usePagination from '~hooks/use-pagination'
import {DEFAULT_PAGE_SIZE} from '~constants/data'

const StatisticDailyBillingTransactionPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')

  const router = useRouter()

  const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<StatisticDailyBillingTransactionPageSearchFilterKey>(
        {
          DATE: pageQuery?.get('date') || formatDate(getToday()),
            UNTIL: pageQuery?.get('from') || formatDate(getToday()),
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
    router.push(RECEPTIONS_PATH.BILLINGS(receptionId))
  }

    const handleOnClickExcelDownload = (
        expectedCaregivingStartDate: string,
        expectedCaregivingEndDate: string,
    ) => async () => {
        if (!expectedCaregivingStartDate || !expectedCaregivingEndDate) {
            return
        }

        const path = `${process.env.NEXT_PUBLIC_API_URL}/api/v2/statistic/billingExcelDown?from=${expectedCaregivingStartDate}&until=${expectedCaregivingEndDate}`
        document.location.href = path
    }

    const totalTransactionAmount = useDailyBillingTransactionStatistic({
    date: searchFilterStore.searchFilter.DATE,
  })

  const billingTransactionList =
    useDailyCaregivingRoundBillingTransactionStatisticList({
      date: searchFilterStore.searchFilter.DATE,
      pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
    })

  const handleOnChangeSearchFilter =
    <K extends StatisticDailyBillingTransactionPageSearchFilterKey>(key: K) =>
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
      {billingTransactionList ? (
        <StatisticDailyBillingTransactionView
          onClickExcelDownload={handleOnClickExcelDownload}
          billingTransactionList={billingTransactionList}
          onChangeSearchFilter={handleOnChangeSearchFilter}
          onClickListItemAccidentNumber={handleOnClickListItemAccidentNumber}
          searchFilter={toJS(searchFilterStore.searchFilter)}
          setPageNumber={setPageNumber}
          totalTransactionAmount={totalTransactionAmount}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default StatisticDailyBillingTransactionPage
