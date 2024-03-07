import {Box, Button, Checkbox, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import SubPageTabBar from '../../components/SubPageTabBar'
import {BILLINGS_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import {
  BILLING_PROGRESSING_STATUS,
  billingTransactionSearchCategories,
} from '../../constants'
import SearchPeriodPicker from '../../components/SearchPeriodPicker'
import SearchBox from '../../components/SearchBox'
import SearchFilterTitleWrapper from '../../components/SearchFilterTitleWrapper'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import SearchResultCount from '~components/SearchResultCount'
import {
  BillingInTransactionPageSearchFilterKey,
  BillingProgressingStatus,
  SearchCategory,
} from '~types'
import Pagination from '~components/Pagination'
import BillingResource from '~models/dto/billing/Resource'
import {IPaginationResponse} from '~types/dto'

interface IProps {
  billingListData?: IPaginationResponse<BillingResource>
  onChangeSearchFilter: <K extends BillingInTransactionPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickDownloadCertificate: () => void
  onClickListItemAccidentNumber: (id: string) => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  searchFilter: Pick<SearchFilter, BillingInTransactionPageSearchFilterKey>
  selectedListItemIds: string[]
  setPageNumber: (page: number) => void
}

const BillingsInTransactionView = (props: IProps): ReactElement => {
  const {
    selectedListItemIds,
    onSelectAllListItem,
    onSelectListItem,
    onClickListItemAccidentNumber,
    onClickDownloadCertificate,
    billingListData,
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

  const handleOnClickBillingProgressingStatusFilter =
    (selectedStatus: BillingProgressingStatus) => () => {
      const alreadyIncluded =
        searchFilter.BILLING_PROGRESSING_STATUS.includes(selectedStatus)

      const newBillingProgressingStatusFilter = alreadyIncluded
        ? searchFilter.BILLING_PROGRESSING_STATUS.filter(
            (status) => status !== selectedStatus,
          )
        : [...searchFilter.BILLING_PROGRESSING_STATUS, selectedStatus]

      if (newBillingProgressingStatusFilter.length > 0) {
        onChangeSearchFilter('BILLING_PROGRESSING_STATUS')(
          newBillingProgressingStatusFilter,
        )
      }
    }

  return (
    <Box gap="lg" p="sm">
      <SubPageTabBar
        currentPage="IN_TRANSACTION"
        tabs={BILLINGS_SUB_PAGE_TABS}
      />
      <Box gap="md">
        <Box
          alignItems="center"
          flexDirection="row"
          gap="xs"
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
            categoryOptions={billingTransactionSearchCategories}
            defaultCategory={searchFilter.SEARCH_CATEGORY}
            defaultKeyword={searchFilter.SEARCH_KEYWORD}
            onClickSearch={handleOnClickSearch}
          />
        </Box>
        <SearchFilterTitleWrapper title="청구 상태">
          <Box alignItems="center" flexDirection="row" gap="sm">
            <Checkbox
              color="primary"
              onClick={handleOnClickBillingProgressingStatusFilter(
                'UNDER_DEPOSIT',
              )}
              value={searchFilter.BILLING_PROGRESSING_STATUS.includes(
                'UNDER_DEPOSIT',
              )}
            >
              <Typography variant="body3">
                {BILLING_PROGRESSING_STATUS['UNDER_DEPOSIT']}
              </Typography>
            </Checkbox>
            <Checkbox
              color="primary"
              onClick={handleOnClickBillingProgressingStatusFilter(
                'OVER_DEPOSIT',
              )}
              value={searchFilter.BILLING_PROGRESSING_STATUS.includes(
                'OVER_DEPOSIT',
              )}
            >
              <Typography variant="body3">
                {BILLING_PROGRESSING_STATUS['OVER_DEPOSIT']}
              </Typography>
            </Checkbox>
            <Checkbox
              color="primary"
              onClick={handleOnClickBillingProgressingStatusFilter(
                'COMPLETED_DEPOSIT',
              )}
              value={searchFilter.BILLING_PROGRESSING_STATUS.includes(
                'COMPLETED_DEPOSIT',
              )}
            >
              <Typography variant="body3">
                {BILLING_PROGRESSING_STATUS['COMPLETED_DEPOSIT']}
              </Typography>
            </Checkbox>
          </Box>
        </SearchFilterTitleWrapper>
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
        <Box gap="sm">
          <SearchResult
            data={billingListData}
            onClickListItemAccidentNumber={onClickListItemAccidentNumber}
            onSelectAllListItem={onSelectAllListItem}
            onSelectListItem={onSelectListItem}
            selectedListItemIds={selectedListItemIds}
          />
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
      </Box>
    </Box>
  )
}

export default BillingsInTransactionView
