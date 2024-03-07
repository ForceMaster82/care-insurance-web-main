import {NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import {format} from 'date-fns'
import {Loading} from '@caredoc/templates-web'
import {observer} from 'mobx-react-lite'
import {action, reaction, toJS} from 'mobx'
import {DEFAULT_PAGE_SIZE} from '../../constants/data'
import {fetcher} from '../../utils/fetcher'
import {getURLSearchParams} from '../../utils/url'
import {BOM_UTF_8} from '../../constants'
import {downloadFile} from '../../utils/download-file'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {StatisticMonthlyReconciliationPageSearchFilterKey} from '../../types'
import {getThisMonth, getThisYear} from '../../utils/date'
import Layout from '~templates/layouts/Layout'
import StatisticMonthlyReconciliationView from '~views/statistic-monthly-reconciliation'
import useReconciliationList from '~hooks/api/reconciliation/use-reconciliation-list'
import usePagination from '~hooks/use-pagination'
import useMonthlyReconciliationStatistic from '~hooks/api/reconciliation/use-monthly-reconciliation-statistic'

const StatisticMonthlyReconciliationPage: NextPage = observer(() => {
  const {pageNumber, setPageNumber, resetPageNumber} = usePagination()

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<StatisticMonthlyReconciliationPageSearchFilterKey>({
        RECONCILED_MONTH: getThisMonth() + 1,
        RECONCILED_YEAR: getThisYear(),
      }),
  )

  const monthlyReconciliationStatisticData = useMonthlyReconciliationStatistic({
    month: searchFilterStore.searchFilter.RECONCILED_MONTH,
    year: searchFilterStore.searchFilter.RECONCILED_YEAR,
  })
  const caregivingReconciliationData = useReconciliationList({
    closingStatus: 'CLOSED',
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    reconciledMonth: searchFilterStore.searchFilter.RECONCILED_MONTH,
    reconciledYear: searchFilterStore.searchFilter.RECONCILED_YEAR,
  })

  const handleOnClickCsvDownload = action(async (): Promise<void> => {
    try {
      const query = getURLSearchParams({
        closingStatus: 'CLOSED',
        reconciledMonth: searchFilterStore.searchFilter.RECONCILED_MONTH,
        reconciledYear: searchFilterStore.searchFilter.RECONCILED_YEAR,
      })

      const data = await fetcher<string>(
        `/api/v1/reconciliations?${query.toString()}`,
        {
          headers: {
            Accept: 'text/csv',
          },
        },
      )
      const fileName = `정산대사현황_${format(Date.now(), 'yyyyMMdd')}.csv`
      const file = new File([BOM_UTF_8 + data.body], fileName)

      downloadFile(file)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error

      // eslint-disable-next-line no-alert
      alert(errorMessage)
    }
  })

  const handleOnChangeSearchFilter =
    <K extends StatisticMonthlyReconciliationPageSearchFilterKey>(key: K) =>
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
      {caregivingReconciliationData ? (
        <StatisticMonthlyReconciliationView
          monthlyReconciliationStatisticData={
            monthlyReconciliationStatisticData
          }
          onChangeSearchFilter={handleOnChangeSearchFilter}
          onClickCsvDownload={handleOnClickCsvDownload}
          reconciliationData={caregivingReconciliationData}
          searchFilter={toJS(searchFilterStore.searchFilter)}
          setPageNumber={setPageNumber}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default StatisticMonthlyReconciliationPage
