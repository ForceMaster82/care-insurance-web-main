import {NextPage} from 'next'
import React, {useCallback, useEffect, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {Loading} from '@caredoc/templates-web'
import {useRouter} from 'next/router'
import {observer} from 'mobx-react-lite'
import {reaction, toJS} from 'mobx'
import {stringify} from 'qs'
import {isServer} from '@caredoc/utils-web'
import {
  CaregivingMessageSendingStatus,
  MessageStatusesCaregivingStartPageSearchFilterKey,
  SearchCategory,
} from '../../types'
import useCaregivingStartMessageStatusList from '../../hooks/api/message/use-caregiving-start-message-status-list'
import usePagination from '../../hooks/use-pagination'
import useCaregivingStartMessageCreate from '../../hooks/api/message/use-caregiving-start-message-create'
import {ICaregivingStartMessageCreate} from '../../types/dto'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {formatDate, getToday} from '../../utils/date'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import useItemSelection from '~hooks/use-item-selection'
import Layout from '~templates/layouts/Layout'
import MessageStatusesCaregivingStartView from '~views/message-statuses-caregiving-start'

const MessageStatusesCaregivingStartPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')
  const searchCategoryQueryValue = pageQuery?.get('search-category') as
    | SearchCategory
    | undefined
  const sendingStatusQueryValue = pageQuery?.get('sending-status') as
    | CaregivingMessageSendingStatus
    | undefined

  const router = useRouter()

  const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<MessageStatusesCaregivingStartPageSearchFilterKey>({
        DATE: pageQuery?.get('date') || formatDate(getToday()),
        SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
        SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
        SENDING_STATUS: sendingStatusQueryValue || 'READY',
      }),
  )

  const {selectedItems, setSelectedItems, selectItem} = useItemSelection()

  const caregivingStartMessageStatusListData =
    useCaregivingStartMessageStatusList({
      date: searchFilterStore.searchFilter.DATE,
      onSuccess: (data) => {
        setSelectedItems(data.items.map((item) => item.receptionId))
      },
      pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
      searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
      sendingStatus: searchFilterStore.searchFilter.SENDING_STATUS,
    })

  const {mutate: sendCaregivingStartMessage} = useCaregivingStartMessageCreate()

  const queryClient = useQueryClient()

  const handleOnClickSendMessage = useCallback(() => {
    // eslint-disable-next-line no-alert
    const sendRequested = confirm(
      `선택한 ${selectedItems.length}건에 대해 알림톡을 발송하시겠습니까?`,
    )
    if (!sendRequested) {
      return
    }

    const requestPayload: ICaregivingStartMessageCreate[] = selectedItems.map(
      (item) => ({
        receptionId: item,
      }),
    )

    sendCaregivingStartMessage(
      {
        payload: requestPayload,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['caregiving-start-message-status', 'list'],
          })
        },
      },
    )
  }, [queryClient, selectedItems, sendCaregivingStartMessage])

  const handleOnClickListItemAccidentNumber = (receptionId: string): void => {
    const query = stringify(
      {
        ...searchFilterStore.toQueryData(),
        'page-number': pageNumber,
      },
      {
        arrayFormat: 'repeat',
      },
    )

    router.replace({query}, undefined, {shallow: true})
    router.push(RECEPTIONS_PATH.DETAIL(receptionId))
  }

  const handleOnChangeSearchFilter =
    <K extends MessageStatusesCaregivingStartPageSearchFilterKey>(key: K) =>
    (value: SearchFilter[K]) => {
      searchFilterStore.set(key, value)
    }

  useEffect(() => {
    const dispose = reaction(
      () => toJS(searchFilterStore.searchFilter),
      () => {
        resetPageNumber()
      },
    )

    return () => {
      dispose()
    }
  }, [resetPageNumber, searchFilterStore.searchFilter])

  return (
    <Layout currentPage="NOTIFICATION">
      {caregivingStartMessageStatusListData ? (
        <MessageStatusesCaregivingStartView
          data={caregivingStartMessageStatusListData}
          onChangeSearchFilter={handleOnChangeSearchFilter}
          onClickListItemAccidentNumber={handleOnClickListItemAccidentNumber}
          onClickPageNumber={setPageNumber}
          onClickSendMessage={handleOnClickSendMessage}
          onSelectAllListItems={setSelectedItems}
          onSelectListItem={selectItem}
          searchFilter={toJS(searchFilterStore.searchFilter)}
          selectedItems={selectedItems}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default MessageStatusesCaregivingStartPage
