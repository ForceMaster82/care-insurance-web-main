/* eslint-disable unicorn/numeric-separators-style */
import {Box, Button} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {BillingWaitingPageSearchFilterKey, SearchCategory} from '../../types'
import SubPageTabBar from '../../components/SubPageTabBar'
import {BILLINGS_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import SearchPeriodPicker from '../../components/SearchPeriodPicker'
import {billingWaitingSearchCategories} from '../../constants'
import SearchBox from '../../components/SearchBox'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import SearchResultCount from '~components/SearchResultCount'
import Pagination from '~components/Pagination'
import BillingResource from '~models/dto/billing/Resource'
import {IPaginationResponse} from '~types/dto'

interface IProps {
  billingListData?: IPaginationResponse<BillingResource>
  onChangeSearchFilter: <K extends BillingWaitingPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickDownloadCertificate: () => void
  onClickListItemAccidentNumber: (receptionId: string) => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  searchFilter: Pick<SearchFilter, BillingWaitingPageSearchFilterKey>
  selectedListItemIds: string[]
  setPageNumber: (page: number) => void
}

const BillingsWaitingView = (props: IProps): ReactElement => {
  const {
    searchFilter,
    onChangeSearchFilter,
    selectedListItemIds,
    onSelectAllListItem,
    onSelectListItem,
    onClickListItemAccidentNumber,
    billingListData,
    setPageNumber,
    onClickDownloadCertificate,
  } = props

  const handleOnClickSearch = (
    category: SearchCategory,
    keyword: string,
  ): void => {
    onChangeSearchFilter('SEARCH_CATEGORY')(category)
    onChangeSearchFilter('SEARCH_KEYWORD')(keyword)
  }

  return (
    <Box gap="lg" p="sm">
      <SubPageTabBar currentPage="WAITING" tabs={BILLINGS_SUB_PAGE_TABS} />
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <SearchPeriodPicker
          endDateString={searchFilter.USED_PERIOD_UNTIL}
          onChangeEndDate={onChangeSearchFilter('USED_PERIOD_UNTIL')}
          onChangeStartDate={onChangeSearchFilter('USED_PERIOD_FROM')}
          required
          startDateString={searchFilter.USED_PERIOD_FROM}
          title="사용기간"
        />
        <SearchBox
          categoryOptions={billingWaitingSearchCategories}
          defaultCategory={searchFilter.SEARCH_CATEGORY}
          defaultKeyword={searchFilter.SEARCH_KEYWORD}
          onClickSearch={handleOnClickSearch}
        />
      </Box>
      <Box gap="xs">
        <Box
          alignItems="flex-end"
          flexDirection="row"
          justifyContent="space-between"
        >
          <SearchResultCount
            searchResultTotalCount={billingListData?.totalItemCount}
          />
          <Button
            color="primary"
            disabled={selectedListItemIds.length === 0}
            onClick={onClickDownloadCertificate}
          >
            사용확인서 다운로드
          </Button>
        </Box>
        <SearchResult
          data={billingListData}
          onClickAccidentNumber={onClickListItemAccidentNumber}
          onSelectAllListItem={onSelectAllListItem}
          onSelectListItem={onSelectListItem}
          selectedListItemIds={selectedListItemIds}
        />
      </Box>
      {billingListData && billingListData.totalItemCount > 0 && (
        <Box alignItems="center">
          <Pagination
            currentPageNumber={billingListData.currentPageNumber}
            lastPageNumber={billingListData.lastPageNumber}
            onClick={setPageNumber}
          />
        </Box>
      )}
    </Box>
  )
}

export default BillingsWaitingView
