import {Box, Button} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'

import ReconciliationResource from '../../models/dto/reconciliation/Resource'
import {IPaginationResponse} from '../../types/dto'
import SearchPeriodPicker from '../../components/SearchPeriodPicker'
import SearchBox from '../../components/SearchBox'
import {reconciliationSearchCategories} from '../../constants'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import SearchResultCount from '~components/SearchResultCount'
import {ReconciliationPageSearchFilterKey, SearchCategory} from '~types'
import Pagination from '~components/Pagination'

interface IReconciliationViewProps {
  data: IPaginationResponse<ReconciliationResource>
  onChangePageNumber: (pageNumber: number) => void
  onChangeSearchFilter: <K extends ReconciliationPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickReconciliationClose: () => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  searchFilter: Pick<SearchFilter, ReconciliationPageSearchFilterKey>
  selectedListItemIds: string[]
}

const ReconciliationView = (props: IReconciliationViewProps): ReactElement => {
  const {
    selectedListItemIds,
    onSelectListItem,
    onSelectAllListItem,
    onClickReconciliationClose,
    data,
    onChangePageNumber,
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
    <Box gap="lg" px="sm" py="lg">
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <SearchPeriodPicker
          endDateString={searchFilter.ISSUED_AT_UNTIL}
          onChangeEndDate={onChangeSearchFilter('ISSUED_AT_UNTIL')}
          onChangeStartDate={onChangeSearchFilter('ISSUED_AT_FROM')}
          required
          startDateString={searchFilter.ISSUED_AT_FROM}
          title="기간별 조회"
        />
        <SearchBox
          categoryOptions={reconciliationSearchCategories}
          defaultCategory="accidentNumber"
          onClickSearch={handleOnClickSearch}
        />
      </Box>
      <Box gap="xs">
        <Box
          alignItems="flex-end"
          flexDirection="row"
          justifyContent="space-between"
        >
          <SearchResultCount searchResultTotalCount={data.totalItemCount} />
          <Button
            color="primary"
            disabled={selectedListItemIds.length === 0}
            onClick={onClickReconciliationClose}
            size="sm"
          >
            월 마감 처리
          </Button>
        </Box>
        <Box gap="sm">
          <SearchResult
            data={data.items}
            onSelectAllListItem={onSelectAllListItem}
            onSelectListItem={onSelectListItem}
            selectedListItemIds={selectedListItemIds}
          />
          {data.totalItemCount > 0 && (
            <Box alignItems="center">
              <Pagination
                currentPageNumber={data.currentPageNumber}
                lastPageNumber={data.lastPageNumber}
                onClick={onChangePageNumber}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ReconciliationView
