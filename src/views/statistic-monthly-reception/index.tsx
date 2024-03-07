import {Box, Button} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import YearMonthPicker from '../../components/YearMonthPicker'
import SubPageTabBar from '../../components/SubPageTabBar'
import {STATISTIC_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import SearchResult from './components/SearchResult'
import DailyReceptionStatisticResource from '~models/dto/daily-reception-statistic/Resource'

interface IProps {
  dailyReceptionStatisticData: DailyReceptionStatisticResource[]
  onChangeSearchMonth: (value: number) => void
  onChangeSearchYear: (value: number) => void
  onClickCsvDownload: () => void
  searchMonth: number
  searchYear: number
}

const StatisticMonthlyReceptionView = (props: IProps): ReactElement => {
  const {
    searchYear,
    searchMonth,
    onChangeSearchMonth,
    onChangeSearchYear,
    dailyReceptionStatisticData,
    onClickCsvDownload,
  } = props

  return (
    <Box gap="lg" pb="xl" pt="sm" px="sm">
      <SubPageTabBar
        currentPage="MONTHLY_RECEPTION"
        tabs={STATISTIC_SUB_PAGE_TABS}
      />
      <YearMonthPicker
        month={searchMonth}
        onSelectMonth={onChangeSearchMonth}
        onSelectYear={onChangeSearchYear}
        title="조회기간"
        year={searchYear}
      />
      <Box gap="xs">
        <Box alignItems="end">
          <Button color="primary" onClick={onClickCsvDownload} size="sm">
            CSV 다운로드
          </Button>
        </Box>
        <SearchResult
          dailyReceptionStatisticData={dailyReceptionStatisticData}
        />
      </Box>
    </Box>
  )
}

export default StatisticMonthlyReceptionView
