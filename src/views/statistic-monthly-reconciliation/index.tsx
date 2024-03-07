import {Box, Button} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import YearMonthPicker from '../../components/YearMonthPicker'
import ReconciliationResource from '../../models/dto/reconciliation/Resource'
import SubPageTabBar from '../../components/SubPageTabBar'
import {STATISTIC_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import {SearchFilter} from '../../stores/SearchFilterStore'
import {StatisticMonthlyReconciliationPageSearchFilterKey} from '../../types'
import SearchResult from './components/SearchResult'
import ReconciliationDashboard from './components/ReconciliationDashboard'
import SearchResultCount from '~components/SearchResultCount'
import Pagination from '~components/Pagination'
import {IPaginationResponse} from '~types/dto'
import MonthlyReconciliationStatisticResource from '~models/dto/monthly-reconciliation-statistic/Resource'

interface IProps {
  monthlyReconciliationStatisticData?: MonthlyReconciliationStatisticResource
  onChangeSearchFilter: <
    K extends StatisticMonthlyReconciliationPageSearchFilterKey,
  >(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickCsvDownload: () => void
  reconciliationData?: IPaginationResponse<ReconciliationResource>
  searchFilter: Pick<
    SearchFilter,
    StatisticMonthlyReconciliationPageSearchFilterKey
  >
  setPageNumber: (page: number) => void
}

const StatisticMonthlyReconciliationView = (props: IProps): ReactElement => {
  const {
    searchFilter,
    onChangeSearchFilter,
    reconciliationData,
    monthlyReconciliationStatisticData,
    setPageNumber,
    onClickCsvDownload,
  } = props

  return (
    <Box gap="lg" pb="xl" pt="sm" px="sm">
      <SubPageTabBar
        currentPage="MONTHLY_RECONCILIATION"
        tabs={STATISTIC_SUB_PAGE_TABS}
      />
      <YearMonthPicker
        month={searchFilter.RECONCILED_MONTH}
        onSelectMonth={onChangeSearchFilter('RECONCILED_MONTH')}
        onSelectYear={onChangeSearchFilter('RECONCILED_YEAR')}
        title="조회기간"
        year={searchFilter.RECONCILED_YEAR}
      />
      <ReconciliationDashboard
        monthlyReconciliationStatisticData={monthlyReconciliationStatisticData}
      />
      <Box gap="sm">
        <Box gap="xs">
          <Box
            alignItems="flex-end"
            flexDirection="row"
            justifyContent="space-between"
          >
            <SearchResultCount
              searchResultTotalCount={reconciliationData?.totalItemCount}
            />
            <Button color="primary" onClick={onClickCsvDownload}>
              CSV 다운로드
            </Button>
          </Box>
          <SearchResult reconciliationData={reconciliationData} />
        </Box>
        <Box alignSelf="center">
          {reconciliationData && reconciliationData.totalItemCount > 0 && (
            <Pagination
              currentPageNumber={reconciliationData?.currentPageNumber}
              lastPageNumber={reconciliationData?.lastPageNumber}
              onClick={setPageNumber}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default StatisticMonthlyReconciliationView
