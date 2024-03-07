/* eslint-disable unicorn/numeric-separators-style */
import {Box, Button} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import SearchBox from '../../components/SearchBox'
import SearchDatePicker from '../../components/SearchDatePicker'
import {
  caregivingMessageSendingStatus,
  notificationSearchCategories,
} from '../../constants'
import SubPageTabBar from '../../components/SubPageTabBar'
import {MESSAGE_STATUSES_PAGE_TABS} from '../../constants/sub-page-tabs'
import SearchFilterDropdown from '../../components/SearchFilterDropdown'
import {
  ICaregivingProgressMessageStatus,
  IPaginationResponse,
} from '../../types/dto'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchResult from './components/SearchResult'
import SearchResultCount from '~components/SearchResultCount'
import {
  MessageStatusesCaregivingProgressPageSearchFilterKey,
  SearchCategory,
} from '~types'
import Pagination from '~components/Pagination'

interface IProps {
  data: IPaginationResponse<ICaregivingProgressMessageStatus>
  onChangePageNumber: (value: number) => void
  onChangeSearchFilter: <
    K extends MessageStatusesCaregivingProgressPageSearchFilterKey,
  >(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickListItemAccidentNumber: (receptionId: string) => void
  onClickSendMessage: () => void
  onSelectAllListItems: (itemIds: string[]) => void
  onSelectListItem: (itemId: string) => void
  searchFilter: Pick<
    SearchFilter,
    MessageStatusesCaregivingProgressPageSearchFilterKey
  >
  selectedListItems: string[]
}

const MessageStatusesCaregivingProgressView = (props: IProps): ReactElement => {
  const {
    selectedListItems,
    onSelectAllListItems,
    onSelectListItem,
    onClickSendMessage,
    data,
    onChangePageNumber,
    onClickListItemAccidentNumber,
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
    <Box gap="lg" p="sm">
      <SubPageTabBar
        currentPage="CAREGIVING_PROGRESS"
        tabs={MESSAGE_STATUSES_PAGE_TABS}
      />
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box flexDirection="row" gap="lg">
          <SearchDatePicker
            dateString={searchFilter.DATE}
            onChange={onChangeSearchFilter('DATE')}
            required
            title="기준일자"
          />
          <SearchFilterDropdown
            items={caregivingMessageSendingStatus}
            onSelect={onChangeSearchFilter('SENDING_STATUS')}
            title="발송 상태"
            value={searchFilter.SENDING_STATUS}
          />
        </Box>
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
              disabled={selectedListItems.length <= 0}
              onClick={onClickSendMessage}
            >
              알림톡 발송
            </Button>
          </Box>
          <SearchResult
            data={data.items}
            onClickListItemAccidentNumber={onClickListItemAccidentNumber}
            onSelect={onSelectListItem}
            onSelectAll={onSelectAllListItems}
            selectedItems={selectedListItems}
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

export default MessageStatusesCaregivingProgressView
