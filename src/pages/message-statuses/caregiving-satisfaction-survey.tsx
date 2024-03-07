import {NextPage} from 'next'
import React, {useCallback, useEffect, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {Loading} from '@caredoc/templates-web'
import {useRouter} from 'next/router'
import {observer} from 'mobx-react-lite'
import {reaction, toJS} from 'mobx'
import {stringify} from 'qs'
import {isServer} from '@caredoc/utils-web'
import useCaregivingSatisfactionSurveyStatusList from '../../hooks/api/message/use-caregiving-satisfaction-survey-status-list'
import usePagination from '../../hooks/use-pagination'
import useCaregivingSatisfactionSurveyCreate from '../../hooks/api/message/use-caregiving-satisfaction-survey-create'
import {ICaregivingSatisfactionSurveyCreate} from '../../types/dto'
import {
  MessageStatusesCaregivingSatisfactionSurveyPageSearchFilterKey,
  SearchCategory,
} from '../../types'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {formatDate, getToday} from '../../utils/date'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import useItemSelection from '~hooks/use-item-selection'
import Layout from '~templates/layouts/Layout'
import MessageStatusesCaregivingSatisfactionSurveyView from '~views/message-statuses-caregiving-satisfaction-survey'

const MessageStatusesCaregivingSatisfactionSurveyPage: NextPage = observer(
  () => {
    const pageQuery = isServer() ? null : new URL(document.URL).searchParams
    const pageNumberQueryValue = pageQuery?.get('page-number')
    const searchCategoryQueryValue = pageQuery?.get('search-category') as
      | SearchCategory
      | undefined

    const router = useRouter()

    const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
      pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
    )

    const [searchFilterStore] = useState(
      () =>
        new SearchFilterStore<MessageStatusesCaregivingSatisfactionSurveyPageSearchFilterKey>(
          {
            DATE: pageQuery?.get('date') || formatDate(getToday()),
            SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
            SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
          },
        ),
    )

    const {selectedItems, setSelectedItems, selectItem} = useItemSelection()

    const caregivingSatisfactionSurveyStatusListData =
      useCaregivingSatisfactionSurveyStatusList({
        date: searchFilterStore.searchFilter.DATE,
        onSuccess: (data) => {
          setSelectedItems(data.items.map((item) => item.receptionId))
        },
        pageNumber,
        pageSize: DEFAULT_PAGE_SIZE,
        searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
        searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
      })
    const {mutate: createCaregivingSatisfactionSurvey} =
      useCaregivingSatisfactionSurveyCreate()

    const queryClient = useQueryClient()

    const handleOnClickReserveSurvey = useCallback(() => {
      // eslint-disable-next-line no-alert
      const isReservationRequested = confirm(
        `선택한 ${selectedItems.length}건에 대해 비즈콜을 예약하시겠습니까?`,
      )

      if (!isReservationRequested) {
        return
      }

      const requestPayload: ICaregivingSatisfactionSurveyCreate[] =
        selectedItems.map((item) => ({receptionId: item}))

      createCaregivingSatisfactionSurvey(
        {
          payload: requestPayload,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['caregiving-satisfaction-survey-status', 'list'],
            })
          },
        },
      )
    }, [createCaregivingSatisfactionSurvey, queryClient, selectedItems])

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
      <
        K extends MessageStatusesCaregivingSatisfactionSurveyPageSearchFilterKey,
      >(
        key: K,
      ) =>
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
        {caregivingSatisfactionSurveyStatusListData ? (
          <MessageStatusesCaregivingSatisfactionSurveyView
            data={caregivingSatisfactionSurveyStatusListData}
            onChangePageNumber={setPageNumber}
            onChangeSearchFilter={handleOnChangeSearchFilter}
            onClickListItemAccidentNumber={handleOnClickListItemAccidentNumber}
            onClickReserveSurvey={handleOnClickReserveSurvey}
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
  },
)

export default MessageStatusesCaregivingSatisfactionSurveyPage
