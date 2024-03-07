import {NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import {format} from 'date-fns'
import {Loading} from '@caredoc/templates-web'
import {action, reaction, toJS} from 'mobx'
import {observer} from 'mobx-react-lite'
import {stringify} from 'qs'
import useMonthlyRegionalCaregivingStatistics from '../../hooks/api/regional-caregiving-statistic/use-monthly-regional-caregiving-statistic-list'
import {fetcher} from '../../utils/fetcher'
import {BOM_UTF_8} from '../../constants'
import {downloadFile} from '../../utils/download-file'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {StatisticMonthlyRegionalCaregivingPageSearchFilterKey} from '../../types'
import {getThisMonth, getThisYear} from '../../utils/date'
import Layout from '~templates/layouts/Layout'
import StatisticMonthlyRegionalCaregivingView from '~views/statistic-monthly-regional-caregiving'
import usePagination from '~hooks/use-pagination'
import {DEFAULT_PAGE_SIZE} from '~constants/data'

const StatisticMonthlyRegionalCaregivingPage: NextPage = observer(() => {
  const {setPageNumber, pageNumber, resetPageNumber} = usePagination()

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<StatisticMonthlyRegionalCaregivingPageSearchFilterKey>(
        {
          CITY: null,
          MONTH: getThisMonth() + 1,
          STATE: null,
          YEAR: getThisYear(),
        },
      ),
  )

  const monthlyRegionalCaregivingStatisticsData =
    useMonthlyRegionalCaregivingStatistics({
      city: searchFilterStore.searchFilter.CITY,
      month: searchFilterStore.searchFilter.MONTH,
      pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      state: searchFilterStore.searchFilter.STATE,
      year: searchFilterStore.searchFilter.YEAR,
    })

  const handleOnClickCsvDownload = action(async () => {
    try {
      const searchFilter = toJS(searchFilterStore.searchFilter)
      const query = stringify(searchFilterStore.toQueryData())

      const data = await fetcher<string>(
        `/api/v1/monthly-regional-caregiving-statistics?${query}`,
        {
          headers: {
            Accept: 'text/csv',
          },
        },
      )

      const regionInfo = [searchFilter.STATE, searchFilter.CITY]
        .filter((item) => Boolean(item))
        .join('_')
      const fileName = `지역별간병현황_${
        (Boolean(regionInfo) && regionInfo + '_') || ''
      }${format(Date.now(), 'yyyyMMdd')}.csv`
      const file = new File([BOM_UTF_8 + data.body], fileName)

      downloadFile(file)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error
      // eslint-disable-next-line no-alert
      alert(errorMessage)
    }
  })

  const handleOnChangeSearchFilter =
    <K extends StatisticMonthlyRegionalCaregivingPageSearchFilterKey>(key: K) =>
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
      {monthlyRegionalCaregivingStatisticsData ? (
        <StatisticMonthlyRegionalCaregivingView
          monthlyRegionalCaregivingData={
            monthlyRegionalCaregivingStatisticsData
          }
          onChangeSearchFilter={handleOnChangeSearchFilter}
          onClickCsvDownload={handleOnClickCsvDownload}
          searchFilter={toJS(searchFilterStore.searchFilter)}
          setPageNumber={setPageNumber}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default StatisticMonthlyRegionalCaregivingPage
