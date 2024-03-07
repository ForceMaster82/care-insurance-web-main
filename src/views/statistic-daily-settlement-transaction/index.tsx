import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import SearchDatePicker from '../../components/SearchDatePicker'
import SubPageTabBar from '../../components/SubPageTabBar'
import {STATISTIC_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import {SearchFilter} from '../../stores/SearchFilterStore'
import {StatisticDailySettlementTransactionPageSearchFilterKey} from '../../types'
import SearchResult from './components/SearchResult'
import SearchResultCount from '~components/SearchResultCount'
import TransactionDashboard from '~components/TransactionDashboard'
import Pagination from '~components/Pagination'
import DailyCaregivingRoundSettlementTransaction from '~models/dto/daily-caregiving-round-settlement-transaction-statistic/Resource'
import {IPaginationResponse} from '~types/dto'
import DailySettlementTransactionStatisticResource from '~models/dto/daily-settlement-transaction-statistic/Resource'

interface IProps {
  onChangeSearchFilter: <
    K extends StatisticDailySettlementTransactionPageSearchFilterKey,
  >(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickListItemAccidentNumber: (receptionId: string) => void
  searchFilter: Pick<
    SearchFilter,
    StatisticDailySettlementTransactionPageSearchFilterKey
  >
  setPageNumber: (page: number) => void
  settlementTransactionList?: IPaginationResponse<DailyCaregivingRoundSettlementTransaction>
  totalTransactionAmount?: DailySettlementTransactionStatisticResource
}

const StatisticDailySettlementTransactionView = (
  props: IProps,
): ReactElement => {
  const {
    searchFilter,
    onChangeSearchFilter,
    onClickListItemAccidentNumber,
    totalTransactionAmount,
    settlementTransactionList,
    setPageNumber,
  } = props

  return (
    <Box gap="lg" pb="xl" pt="sm" px="sm">
      <SubPageTabBar
        currentPage="DAILY_SETTLEMENT_TRANSACTION"
        tabs={STATISTIC_SUB_PAGE_TABS}
      />
      <SearchDatePicker
        dateString={searchFilter.DATE}
        onChange={onChangeSearchFilter('DATE')}
        required
        title="조회일자"
      />
      {totalTransactionAmount && (
        <TransactionDashboard
          depositAmount={totalTransactionAmount.totalDepositAmount}
          withdrawalAmount={totalTransactionAmount.totalWithdrawalAmount}
        />
      )}

      {settlementTransactionList && (
        <Box gap="xs">
          <SearchResultCount
            searchResultTotalCount={settlementTransactionList.totalItemCount}
          />
          <Box gap="sm">
            <SearchResult
              currentPageNumber={settlementTransactionList.currentPageNumber}
              data={settlementTransactionList.items}
              onClickAccidentNumber={onClickListItemAccidentNumber}
              totalItemCount={settlementTransactionList.totalItemCount}
            />
            {settlementTransactionList &&
              settlementTransactionList.totalItemCount > 0 && (
                <Box alignItems="center">
                  <Pagination
                    currentPageNumber={
                      settlementTransactionList.currentPageNumber
                    }
                    lastPageNumber={settlementTransactionList.lastPageNumber}
                    onClick={setPageNumber}
                  />
                </Box>
              )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default StatisticDailySettlementTransactionView
