import React, {ReactElement} from 'react'
import {Box, Button} from '@caredoc/ui-web'
import SearchResultCount from '../../components/SearchResultCount'
import {SearchCategory, SettlementWaitingPageSearchFilterKey} from '../../types'
import SubPageTabBar from '../../components/SubPageTabBar'
import {SETTLEMENTS_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import SearchPeriodPicker from '../../components/SearchPeriodPicker'
import SearchBox from '../../components/SearchBox'
import {settlementWaitingSearchCategories} from '../../constants'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import Pagination from '~components/Pagination'
import {IPaginationResponse} from '~types/dto'
import SettlementResource from '~models/dto/settlement/Resource'

interface IProps {
  onChangeSearchFilter: <K extends SettlementWaitingPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickCsvDownload: () => Promise<void>
  onClickListItemAccidentNumber: (receptionId: string) => void
  onClickSettlementComplete: () => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  searchFilter: Pick<SearchFilter, SettlementWaitingPageSearchFilterKey>
  selectedListItemIds: string[]
  setPageNumber: (page: number) => void
  settlementListData?: IPaginationResponse<SettlementResource>
}

const SettlementsWaitingView = (props: IProps): ReactElement => {
  const {
    searchFilter,
    onChangeSearchFilter,
    onSelectAllListItem,
    onSelectListItem,
    selectedListItemIds,
    onClickListItemAccidentNumber,
    setPageNumber,
    settlementListData,
    onClickSettlementComplete,
    onClickCsvDownload,
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
      <SubPageTabBar currentPage="WAITING" tabs={SETTLEMENTS_SUB_PAGE_TABS} />
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <SearchPeriodPicker
          endDateString={searchFilter.UNTIL}
          onChangeEndDate={onChangeSearchFilter('UNTIL')}
          onChangeStartDate={onChangeSearchFilter('FROM')}
          required
          startDateString={searchFilter.FROM}
          title="정산 예정일자 조회"
        />
        <SearchBox
          categoryOptions={settlementWaitingSearchCategories}
          defaultCategory={searchFilter.SEARCH_CATEGORY}
          defaultKeyword={searchFilter.SEARCH_KEYWORD}
          onClickSearch={handleOnClickSearch}
        />
      </Box>
      <Box gap="sm">
        <Box gap="xs">
          <Box
            alignItems="flex-end"
            flexDirection="row"
            justifyContent="space-between"
          >
            <SearchResultCount
              searchResultTotalCount={settlementListData?.totalItemCount}
            />
            <Box flexDirection="row" gap="xs">
              <Button
                color="primary"
                onClick={onClickCsvDownload}
                variant="secondary"
              >
                대량이체 다운로드
              </Button>
              <Button
                color="primary"
                //disabled={selectedListItemIds.length === 0}
                onClick={onClickSettlementComplete}
              >
                정산 처리
              </Button>
            </Box>
          </Box>
          <SearchResult
            data={settlementListData}
            onClickAccidentNumber={onClickListItemAccidentNumber}
            onSelectAllListItem={onSelectAllListItem}
            onSelectListItem={onSelectListItem}
            selectedListItemIds={selectedListItemIds}
          />
        </Box>
        {settlementListData && settlementListData.totalItemCount > 0 && (
          <Box alignSelf="center">
            <Pagination
              currentPageNumber={settlementListData?.currentPageNumber}
              lastPageNumber={settlementListData?.lastPageNumber}
              onClick={setPageNumber}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default SettlementsWaitingView
