import {Box, Button} from '@caredoc/ui-web'
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
import {dailySettleTranSearchCategories} from '../../constants'
import SearchBox from '../../components/SearchBox'
import {SearchCategory} from '~types'
import SearchPeriodPicker from "components/SearchPeriodPicker";

interface IProps {
  onChangeSearchFilter: <K extends StatisticDailySettlementTransactionPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickExcelDownload: (
    expectedCaregivingStartDate: string,
    expectedCaregivingEndDate: string,
  ) => () => Promise<void>
  onClickListItemAccidentNumber: (receptionId: string) => void
  setPageNumber: (page: number) => void
  settlementTransactionList?: IPaginationResponse<DailyCaregivingRoundSettlementTransaction>
  totalTransactionAmount?: DailySettlementTransactionStatisticResource
  searchFilter: Pick<SearchFilter, StatisticDailySettlementTransactionPageSearchFilterKey>
}

const StatisticDailySettlementTransactionView = (
  props: IProps,
): ReactElement => {
  const {
    searchFilter,
    onChangeSearchFilter,
    onClickExcelDownload,
    onClickListItemAccidentNumber,
    totalTransactionAmount,
    settlementTransactionList,
    setPageNumber,
  } = props


  const handleOnClickSearch = (
    category: SearchCategory,
    keyword: string,
  ): void => {
    onChangeSearchFilter('SEARCH_CATEGORY')(category)
    onChangeSearchFilter('SEARCH_KEYWORD')(keyword)
  }

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

      <SearchBox
          categoryOptions={dailySettleTranSearchCategories}
          defaultCategory={searchFilter.SEARCH_CATEGORY}
          defaultKeyword={searchFilter.SEARCH_KEYWORD}
          onClickSearch={handleOnClickSearch}
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
