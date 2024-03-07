import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import SearchDatePicker from '../../components/SearchDatePicker'
import SubPageTabBar from '../../components/SubPageTabBar'
import {STATISTIC_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import {StatisticDailyBillingTransactionPageSearchFilterKey} from '../../types'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import SearchResultCount from '~components/SearchResultCount'
import TransactionDashboard from '~components/TransactionDashboard'
import Pagination from '~components/Pagination'
import DailyBillingTransactionStatisticResource from '~models/dto/daily-billing-transaction-statistic/Resource'
import DailyCaregivingRoundBillingTransactionStatisticResource from '~models/dto/daily-caregiving-round-billing-transaction-statistic/Resource'
import {IPaginationResponse} from '~types/dto'

interface IProps {
  billingTransactionList?: IPaginationResponse<DailyCaregivingRoundBillingTransactionStatisticResource>
  onChangeSearchFilter: <
    K extends StatisticDailyBillingTransactionPageSearchFilterKey,
  >(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickListItemAccidentNumber: (receptionId: string) => void
  searchFilter: Pick<
    SearchFilter,
    StatisticDailyBillingTransactionPageSearchFilterKey
  >
  setPageNumber: (page: number) => void
  totalTransactionAmount?: DailyBillingTransactionStatisticResource
}

const StatisticDailyBillingTransactionView = (props: IProps): ReactElement => {
  const {
    onClickListItemAccidentNumber,
    totalTransactionAmount,
    billingTransactionList,
    setPageNumber,
    searchFilter,
    onChangeSearchFilter,
  } = props

  return (
    <Box gap="lg" pb="xl" pt="sm" px="sm">
      <SubPageTabBar
        currentPage="DAILY_BILLING_TRANSACTION"
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
      {billingTransactionList && (
        <Box gap="xs">
          <SearchResultCount
            searchResultTotalCount={billingTransactionList.totalItemCount}
          />
          <Box gap="sm">
            <SearchResult
              currentPageNumber={billingTransactionList.currentPageNumber}
              data={billingTransactionList.items}
              onClickAccidentNumber={onClickListItemAccidentNumber}
              totalItemCount={billingTransactionList.totalItemCount}
            />
            {billingTransactionList &&
              billingTransactionList.totalItemCount > 0 && (
                <Box alignItems="center">
                  <Pagination
                    currentPageNumber={billingTransactionList.currentPageNumber}
                    lastPageNumber={billingTransactionList.lastPageNumber}
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

export default StatisticDailyBillingTransactionView
