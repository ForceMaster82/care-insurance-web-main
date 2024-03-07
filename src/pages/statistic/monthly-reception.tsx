import {NextPage} from 'next'
import React, {useCallback} from 'react'
import {format} from 'date-fns'
import {Loading} from '@caredoc/templates-web'
import useYearMonth from '../../hooks/search/use-year-month'
import {fetcher} from '../../utils/fetcher'
import {downloadFile} from '../../utils/download-file'
import {BOM_UTF_8} from '../../constants'
import Layout from '~templates/layouts/Layout'
import StatisticMonthlyReceptionView from '~views/statistic-monthly-reception'
import {formatDate, getFirstDateOfMonth, getLastDateOfMonth} from '~utils/date'
import useDailyReceptionStatisticList from '~hooks/api/reception/use-daily-reception-statistic-list'

const StatisticMonthlyReceptionPage: NextPage = () => {
  const {year, month, setYear, setMonth} = useYearMonth({})

  const from = formatDate(getFirstDateOfMonth(year, month - 1))
  const until = formatDate(getLastDateOfMonth(year, month - 1))

  const dailyReceptionStatisticData = useDailyReceptionStatisticList({
    from,
    until,
  })

  const handleOnClickCsvDownload = useCallback(async () => {
    try {
      const data = await fetcher<string>(
        `/api/v1/daily-reception-statistics?from=${from}&until=${until}`,
        {
          headers: {
            Accept: 'text/csv',
          },
        },
      )

      const fileName = `케어닥_일일업무보고_${format(
        Date.now(),
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
  }, [from, until])

  return (
    <Layout currentPage="CARE_STATUS">
      {dailyReceptionStatisticData ? (
        <StatisticMonthlyReceptionView
          dailyReceptionStatisticData={dailyReceptionStatisticData}
          onChangeSearchMonth={setMonth}
          onChangeSearchYear={setYear}
          onClickCsvDownload={handleOnClickCsvDownload}
          searchMonth={month}
          searchYear={year}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
}

export default StatisticMonthlyReceptionPage
