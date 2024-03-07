import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import SearchResultCount from '../../components/SearchResultCount'
import {settlementTransactionSearchCategories} from '../../constants'
import {
  SearchCategory,
  SettlementInTransactionPageSearchFilterKey,
} from '../../types'
import SubPageTabBar from '../../components/SubPageTabBar'
import {SETTLEMENTS_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import SearchPeriodPicker from '../../components/SearchPeriodPicker'
import SearchBox from '../../components/SearchBox'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import Pagination from '~components/Pagination'
import {IPaginationResponse} from '~types/dto'
import SettlementResource from '~models/dto/settlement/Resource'

interface IProps {
  onChangeSearchFilter: <K extends SettlementInTransactionPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickAccidentNumber: (receptionId: string) => void
  searchFilter: Pick<SearchFilter, SettlementInTransactionPageSearchFilterKey>
  setPageNumber: (page: number) => void
  settlementListData?: IPaginationResponse<SettlementResource>
}

const SettlementsInTransactionView = (props: IProps): ReactElement => {
  const {
    onClickAccidentNumber,
    settlementListData,
    setPageNumber,
    searchFilter,
    onChangeSearchFilter,
  } = props

  const handleOnClickSearch = (
    category: SearchCategory,
    keyword: string,
  ): void => {
    onChangeSearchFilter('SEARCH_CATEGORY')(category)
    onChangeSearchFilter('SEARCH_KEYWORD')(keyword)
  }

  return (
    <Box backgroundColor="bgSecondary" gap="lg" pb="xl" pt="sm" px="sm">
      <SubPageTabBar
        currentPage="IN_TRANSACTION"
        tabs={SETTLEMENTS_SUB_PAGE_TABS}
      />
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <SearchPeriodPicker
          endDateString={searchFilter.TRANSACTION_DATE_UNTIL}
          onChangeEndDate={onChangeSearchFilter('TRANSACTION_DATE_UNTIL')}
          onChangeStartDate={onChangeSearchFilter('TRANSACTION_DATE_FROM')}
          required
          startDateString={searchFilter.TRANSACTION_DATE_FROM}
          title="입출금일자"
        />
        <SearchBox
          categoryOptions={settlementTransactionSearchCategories}
          defaultCategory={searchFilter.SEARCH_CATEGORY}
          defaultKeyword={searchFilter.SEARCH_KEYWORD}
          onClickSearch={handleOnClickSearch}
          searchButtonVariant="primary"
        />
      </Box>
      <Box gap="sm">
        <Box gap="xs">
          <SearchResultCount
            searchResultTotalCount={settlementListData?.totalItemCount}
          />
          {settlementListData && (
            <SearchResult
              data={settlementListData}
              onClickAccidentNumber={onClickAccidentNumber}
            />
          )}
        </Box>
        {settlementListData && settlementListData.totalItemCount > 0 && (
          <Box alignSelf="center">
            <Pagination
              currentPageNumber={settlementListData.currentPageNumber}
              lastPageNumber={settlementListData.lastPageNumber}
              onClick={setPageNumber}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SettlementsInTransactionView
