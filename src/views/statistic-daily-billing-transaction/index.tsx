import {Box, Button} from '@caredoc/ui-web'
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
import SearchPeriodPicker from "components/SearchPeriodPicker";

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
  onClickExcelDownload: (
      expectedCaregivingStartDate: string,
      expectedCaregivingEndDate: string,
  ) => () => Promise<void>
}

const StatisticDailyBillingTransactionView = (props: IProps): ReactElement => {
  const {
    onClickListItemAccidentNumber,
    totalTransactionAmount,
    billingTransactionList,
    setPageNumber,
    searchFilter,
    onChangeSearchFilter,
    onClickExcelDownload,
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

      <Box flexDirection="row" gap="xs">
        <SearchPeriodPicker
            endDateString={searchFilter.UNTIL}
            onChangeEndDate={onChangeSearchFilter('UNTIL')}
            onChangeStartDate={onChangeSearchFilter('FROM')}
            startDateString={searchFilter.FROM}
            title="정산 예정일자"
        />

        <Button
            color="primary"
            disabled={!searchFilter.FROM}
            onClick={onClickExcelDownload(
                searchFilter.FROM, searchFilter.UNTIL
            )}
            size="sm"
            variant="primary"
        >
          엑셀 다운로드
        </Button>
      </Box>

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
