import {Box, Button} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import SubPageTabBar from '../../components/SubPageTabBar'
import {BILLINGS_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import SearchPeriodPicker from '../../components/SearchPeriodPicker'
import SearchBox from '../../components/SearchBox'
import {billingWaitingDepositSearchCategories} from '../../constants'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import SearchResultCount from '~components/SearchResultCount'
import {BillingWaitingDepositPageSearchFilterKey, SearchCategory} from '~types'
import Pagination from '~components/Pagination'
import BillingResource from '~models/dto/billing/Resource'
import {IPaginationResponse} from '~types/dto'

interface IProps {
  billingListData?: IPaginationResponse<BillingResource>
  onChangeSearchFilter: <K extends BillingWaitingDepositPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickDownloadCertificate: () => void
  onClickListItemAccidentNumber: (receptionId: string) => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  searchFilter: Pick<SearchFilter, BillingWaitingDepositPageSearchFilterKey>
  selectedListItemIds: string[]
  setPageNumber: (page: number) => void
}

const BillingsWaitingDepositView = (props: IProps): ReactElement => {
  const {
    searchFilter,
    onChangeSearchFilter,
    onClickListItemAccidentNumber,
    selectedListItemIds,
    onSelectAllListItem,
    onSelectListItem,
    onClickDownloadCertificate,
    billingListData,
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
    <Box gap="lg" p="sm">
      <SubPageTabBar
        currentPage="WAITING_DEPOSIT"
        tabs={BILLINGS_SUB_PAGE_TABS}
      />
      <Box flexDirection="row" justifyContent="space-between">
        <SearchPeriodPicker
          endDateString={searchFilter.BILLING_DATE_UNTIL}
          onChangeEndDate={onChangeSearchFilter('BILLING_DATE_UNTIL')}
          onChangeStartDate={onChangeSearchFilter('BILLING_DATE_FROM')}
          required
          startDateString={searchFilter.BILLING_DATE_FROM}
          title="청구일자"
        />
        <SearchBox
          categoryOptions={billingWaitingDepositSearchCategories}
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
            disabled={selectedListItemIds.length <= 0}
            onClick={onClickDownloadCertificate}
            size="sm"
          >
            사용확인서 다운로드
          </Button>
        </Box>
        <SearchResult
          data={billingListData}
          onClickListItemAccidentNumber={onClickListItemAccidentNumber}
          onSelectAllListItem={onSelectAllListItem}
          onSelectListItem={onSelectListItem}
          selectedListItemIds={selectedListItemIds}
        />
      </Box>
      {billingListData && billingListData.totalItemCount > 0 && (
        <Box alignItems="center">
          <Pagination
            currentPageNumber={billingListData?.currentPageNumber}
            lastPageNumber={billingListData?.lastPageNumber}
            onClick={setPageNumber}
          />
        </Box>
      )}
    </Box>
  )
}

export default BillingsWaitingDepositView
