import {Box, Button, Chip} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import StateCityPicker, {State} from '../../components/StateCityPicker'
import YearMonthPicker from '../../components/YearMonthPicker'
import SubPageTabBar from '../../components/SubPageTabBar'
import {STATISTIC_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import SearchResultCount from '../../components/SearchResultCount'
import {SearchFilter} from '../../stores/SearchFilterStore'
import {StatisticMonthlyRegionalCaregivingPageSearchFilterKey} from '../../types'
import SearchResult from './components/SearchResult'
import Pagination from '~components/Pagination'
import MonthlyRegionalCaregivingStatisticResource from '~models/dto/monthly-regional-caregiving-statistic/Resource'
import {IPaginationResponse} from '~types/dto'

interface IProps {
  monthlyRegionalCaregivingData: IPaginationResponse<MonthlyRegionalCaregivingStatisticResource>
  onChangeSearchFilter: <
    K extends StatisticMonthlyRegionalCaregivingPageSearchFilterKey,
  >(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickCsvDownload: () => void
  searchFilter: Pick<
    SearchFilter,
    StatisticMonthlyRegionalCaregivingPageSearchFilterKey
  >
  setPageNumber: (page: number) => void
}

const StatisticMonthlyRegionalCaregivingView = (
  props: IProps,
): ReactElement => {
  const {
    searchFilter,
    onChangeSearchFilter,
    setPageNumber,
    monthlyRegionalCaregivingData,
    onClickCsvDownload,
  } = props

  const handleOnChangeState = (value: State): void => {
    onChangeSearchFilter('STATE')(value)
    onChangeSearchFilter('CITY')(null)
  }

  const handleOnClickResetStateCity = (): void => {
    onChangeSearchFilter('STATE')(null)
    onChangeSearchFilter('CITY')(null)
  }

  return (
    <Box gap="lg" p="sm">
      <SubPageTabBar
        currentPage="MONTHLY_REGIONAL_CAREGIVING"
        tabs={STATISTIC_SUB_PAGE_TABS}
      />
      <Box flexDirection="row" gap="lg">
        <YearMonthPicker
          month={searchFilter.MONTH}
          onSelectMonth={onChangeSearchFilter('MONTH')}
          onSelectYear={onChangeSearchFilter('YEAR')}
          title="조회기간"
          year={searchFilter.YEAR}
        />
        <Box alignItems="center" flexDirection="row" gap="xs">
          <StateCityPicker
            city={searchFilter.CITY}
            onSelectCity={onChangeSearchFilter('CITY')}
            onSelectState={handleOnChangeState}
            state={searchFilter.STATE}
            title="지역"
          />
          <Chip
            color="fontPrimary"
            onClick={handleOnClickResetStateCity}
            size="sm"
            variant="tertiary"
          >
            지역 초기화
          </Chip>
        </Box>
      </Box>
      <Box gap="sm">
        <Box gap="xs">
          <Box
            alignItems="flex-end"
            flexDirection="row"
            justifyContent="space-between"
          >
            <SearchResultCount
              searchResultTotalCount={
                monthlyRegionalCaregivingData.totalItemCount
              }
            />
            <Button color="primary" onClick={onClickCsvDownload}>
              CSV 다운로드
            </Button>
          </Box>
          <SearchResult data={monthlyRegionalCaregivingData.items} />
        </Box>
        {monthlyRegionalCaregivingData.totalItemCount > 0 && (
          <Box alignSelf="center">
            <Pagination
              currentPageNumber={
                monthlyRegionalCaregivingData.currentPageNumber
              }
              lastPageNumber={monthlyRegionalCaregivingData.lastPageNumber}
              onClick={setPageNumber}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default StatisticMonthlyRegionalCaregivingView
