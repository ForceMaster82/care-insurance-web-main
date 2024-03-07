/* eslint-disable unicorn/numeric-separators-style */
import {Box, Button} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {differenceInSeconds} from 'date-fns'
import SearchDatePicker from '../../components/SearchDatePicker'
import SearchBox from '../../components/SearchBox'
import {notificationSearchCategories} from '../../constants'
import SubPageTabBar from '../../components/SubPageTabBar'
import {MESSAGE_STATUSES_PAGE_TABS} from '../../constants/sub-page-tabs'
import {
  ICaregivingSatisfactionSurveyStatus,
  IPaginationResponse,
} from '../../types/dto'
import useCurrentTime from '../../hooks/use-current-time'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import SearchResultCount from '~components/SearchResultCount'
import {
  MessageStatusesCaregivingSatisfactionSurveyPageSearchFilterKey,
  SearchCategory,
} from '~types'
import Pagination from '~components/Pagination'

interface IProps {
  data: IPaginationResponse<ICaregivingSatisfactionSurveyStatus>
  onChangePageNumber: (value: number) => void
  onChangeSearchFilter: <
    K extends MessageStatusesCaregivingSatisfactionSurveyPageSearchFilterKey,
  >(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickListItemAccidentNumber: (receptionId: string) => void
  onClickReserveSurvey: () => void
  onSelectAllListItems: (itemIds: string[]) => void
  onSelectListItem: (itemId: string) => void
  searchFilter: Pick<
    SearchFilter,
    MessageStatusesCaregivingSatisfactionSurveyPageSearchFilterKey
  >
  selectedItems: string[]
}

const TODAY = new Date()
const RESERVATION_ENABLE_HOUR_FROM = 8
const RESERVATION_ENABLE_HOUR_UNTIL = 15
const RESERVATION_ENABLE_FROM = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate(),
  RESERVATION_ENABLE_HOUR_FROM,
)
const RESERVATION_ENABLE_UNTIL = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate(),
  RESERVATION_ENABLE_HOUR_UNTIL,
)

const MessageStatusesCaregivingSatisfactionSurveyView = (
  props: IProps,
): ReactElement => {
  const {
    selectedItems,
    onSelectAllListItems,
    onSelectListItem,
    data,
    onClickReserveSurvey,
    onChangePageNumber,
    onClickListItemAccidentNumber,
    searchFilter,
    onChangeSearchFilter,
  } = props

  const {currentTime} = useCurrentTime()

  const isRevervationTime = (): boolean => {
    const BUFFER_SECONDS = 3

    const isAfterEndableFrom =
      differenceInSeconds(currentTime, RESERVATION_ENABLE_FROM) >=
      BUFFER_SECONDS
    const isBeforeEnableUntil =
      differenceInSeconds(RESERVATION_ENABLE_UNTIL, currentTime) >=
      BUFFER_SECONDS

    return isAfterEndableFrom && isBeforeEnableUntil
  }

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
        currentPage="CAREGIVING_SATISFACTION_SURVEY"
        tabs={MESSAGE_STATUSES_PAGE_TABS}
      />
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <SearchDatePicker
          dateString={searchFilter.DATE}
          onChange={onChangeSearchFilter('DATE')}
          required
          title="기준일자"
        />
        <SearchBox
          categoryOptions={notificationSearchCategories}
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
            <SearchResultCount searchResultTotalCount={data.totalItemCount} />
            <Button
              color="primary"
              disabled={selectedItems.length <= 0 || !isRevervationTime()}
              onClick={onClickReserveSurvey}
            >
              비즈콜 예약
            </Button>
          </Box>
          <SearchResult
            data={data.items}
            onClickListItemAccidentNumber={onClickListItemAccidentNumber}
            onSelect={onSelectListItem}
            onSelectAll={onSelectAllListItems}
            selectedItems={selectedItems}
          />
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

export default MessageStatusesCaregivingSatisfactionSurveyView
