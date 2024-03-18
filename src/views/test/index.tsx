import React, {ReactElement, useState} from 'react'
import {Box, Button, Checkbox, Chip, Typography} from '@caredoc/ui-web'
import CaregivingRoundResource from '../../models/dto/caregiving-round/Resource'
import {IPaginationResponse} from '../../types/dto'
import SearchDatePicker from '../../components/SearchDatePicker'
import SearchPeriodPicker from '../../components/SearchPeriodPicker'
import {
  billingProgressingStatusFilters,
  caregivingProgressingStatusFilters,
  caregivingSearchCategories,
  receptionProgressingStatusFilters,
  settlementProgressingStatusFilters,
} from '../../constants'
import SearchBox from '../../components/SearchBox'
import {SearchFilter as SearchFilterType} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import SearchFilter from './components/SearchFilter'
import {CaregivingRoundsPageSearchFilterKey, SearchCategory} from '~types'
import SearchResultCount from '~components/SearchResultCount'
import Pagination from '~components/Pagination'

interface IProps {
  data: IPaginationResponse<CaregivingRoundResource>
  onChangePageNumber: (page: number) => void
  onChangeSearchFilter: <K extends CaregivingRoundsPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilterType[K]) => void
  onClickListItem: (receptionId: string) => void
  searchFilter: Pick<SearchFilterType, CaregivingRoundsPageSearchFilterKey>
}

const TestListView = (props: IProps): ReactElement => {
  const {
    data,
    onClickListItem,
    onChangePageNumber,
    searchFilter,
    onChangeSearchFilter,
  } = props

  const [progressingStatusFilterVisible, setProgressingStatusFilterVisible] =
    useState(false)

  const handleOnClickResetExpectedCaregivingStartDate = (): void => {
    onChangeSearchFilter('EXPECTED_CAREGIVING_START_DATE')('')
  }

  const handleOnClickResetFromUntil = (): void => {
    onChangeSearchFilter('FROM')('')
    onChangeSearchFilter('UNTIL')('')
  }

  const handleOnClickSearch = (
    category: SearchCategory,
    keyword: string,
  ): void => {
    onChangeSearchFilter('SEARCH_CATEGORY')(category)
    onChangeSearchFilter('SEARCH_KEYWORD')(keyword)
  }

  const handleOnToggleNotifyFilter = (): void => {
    // if(searchFilter.NOTIFY_CAREGIVING_PROGRESS) {
    //   onChangeSearchFilter('NOTIFY_CAREGIVING_PROGRESS')(true)
    // }else {
    //   onChangeSearchFilter('NOTIFY_CAREGIVING_PROGRESS')(false)
    // }
    onChangeSearchFilter('NOTIFY_CAREGIVING_PROGRESS')(searchFilter.NOTIFY_CAREGIVING_PROGRESS ? true : false )

    onChangeSearchFilter('SEARCH_KEYWORD')('')
    // @ts-ignore
    let closeBox = document.getElementById("searchBoxBoxId").getElementsByTagName("div")[4];
    if (closeBox) closeBox.click();
  }

  return (
    <Box gap="lg" px="sm" py="lg">
      <Box gap="xs">
        <Box alignItems="center" flexDirection="row" gap="xs">
          <SearchDatePicker
            dateString={searchFilter.EXPECTED_CAREGIVING_START_DATE}
            onChange={onChangeSearchFilter('EXPECTED_CAREGIVING_START_DATE')}
            title="간병 예상일자"
          />
          <Chip
            color="fontPrimary"
            onClick={handleOnClickResetExpectedCaregivingStartDate}
            size="sm"
            variant="tertiary"
          >
            초기화
          </Chip>
        </Box>
        <Box flexDirection="row" justifyContent="space-between">
          <Box alignItems="center" flexDirection="row" gap="xs">
            <SearchPeriodPicker
              endDateString={searchFilter.UNTIL}
              onChangeEndDate={onChangeSearchFilter('UNTIL')}
              onChangeStartDate={onChangeSearchFilter('FROM')}
              startDateString={searchFilter.FROM}
              title="간병 시작일자"
            />
            <Chip
              color="fontPrimary"
              onClick={handleOnClickResetFromUntil}
              size="sm"
              variant="tertiary"
            >
              초기화
            </Chip>
          </Box>
          <Box alignItems="rigth" flexDirection="row" gap="sm">
            <Checkbox
                color="primary"
                onClick={handleOnToggleNotifyFilter}
                size="sm"
                value={searchFilter.NOTIFY_CAREGIVING_PROGRESS === false}
            >
              <Typography textColor="fontPrimary" variant="body3">
                미수신 대상 여부
              </Typography>
            </Checkbox>
          </Box>
          <SearchBox
            categoryOptions={caregivingSearchCategories}
            defaultCategory={searchFilter.SEARCH_CATEGORY}
            defaultKeyword={searchFilter.SEARCH_KEYWORD}
            onClickSearch={handleOnClickSearch}
          />
        </Box>
        <Box
          alignSelf="flex-start"
          onClick={(): void =>
            setProgressingStatusFilterVisible((prev) => !prev)
          }
        >
          <Chip
            color="fontPrimary"
            icon={
              (progressingStatusFilterVisible && 'chevron-up') || 'chevron-down'
            }
            size="md"
            variant="secondary"
          >
            상세 검색
          </Chip>
        </Box>
        <Box
          backgroundColor="n200"
          borderRadius="md"
          display={progressingStatusFilterVisible ? 'flex' : 'none'}
          gap="xs"
          p="sm"
        >
          <SearchFilter
            maxCount={3}
            minCount={0}
            onChange={onChangeSearchFilter('RECEPTION_PROGRESSING_STATUS')}
            options={receptionProgressingStatusFilters}
            title="진행 상태"
            values={searchFilter.RECEPTION_PROGRESSING_STATUS}
          />
          <SearchFilter
            maxCount={3}
            minCount={0}
            onChange={onChangeSearchFilter('CAREGIVING_PROGRESSING_STATUS')}
            options={caregivingProgressingStatusFilters}
            title="간병 상태"
            values={searchFilter.CAREGIVING_PROGRESSING_STATUS}
          />
          <SearchFilter
            maxCount={3}
            minCount={0}
            onChange={onChangeSearchFilter('SETTLEMENT_PROGRESSING_STATUS')}
            options={settlementProgressingStatusFilters}
            title="정산 상태"
            values={searchFilter.SETTLEMENT_PROGRESSING_STATUS}
          />
          <SearchFilter
            maxCount={3}
            minCount={0}
            onChange={onChangeSearchFilter('BILLING_PROGRESSING_STATUS')}
            options={billingProgressingStatusFilters}
            title="청구 상태"
            values={searchFilter.BILLING_PROGRESSING_STATUS}
          />
        </Box>
      </Box>
      <Box gap="sm">
        <Box gap="xs">
          <Box
            alignItems="flex-end"
            flexDirection="row"
            justifyContent="space-between"
          >
            <SearchResultCount searchResultTotalCount={data.totalItemCount} />
          </Box>
          <SearchResult data={data} onClickListItem={onClickListItem} />
        </Box>
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
  )
}

export default TestListView
