/* eslint-disable no-alert */
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import React, {useCallback, useEffect, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {Loading} from '@caredoc/templates-web'
import {format} from 'date-fns'
import {reaction, toJS} from 'mobx'
import {observer} from 'mobx-react-lite'
import {stringify} from 'qs'
import {isServer} from '@caredoc/utils-web'
import useItemSelection from '../../hooks/use-item-selection'
import Layout from '../../templates/layouts/Layout'
import {formatDate, getToday} from '../../utils/date'
import SettlementsWaitingView from '../../views/settlements-waiting'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import useSettlementUpdate from '../../hooks/api/settlement/use-settlement-update'
import {ISettlementUpdate} from '../../types/dto'
import {getInternalCaregivingManagerIdFromToken} from '../../utils/manage-token'
import {SearchCategory, SettlementWaitingPageSearchFilterkey} from '../../types'
import {fetcher, isLocalServerErrorType} from '../../utils/fetcher'
import {SERVER_ERROR_MESSAGE} from '../../constants/server-error'
import {getFilenameFromHttpHeaders} from '../../utils/get-filename-from-http-headers'
import {BOM_UTF_8} from '../../constants'
import {downloadFile} from '../../utils/download-file'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import useSettlementList from '~hooks/api/settlement/use-settlement-list'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import usePagination from '~hooks/use-pagination'

const SettlementsWaitingPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')
  const searchCategoryQueryValue = pageQuery?.get('search-category') as
    | SearchCategory
    | undefined

  const router = useRouter()

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<SettlementWaitingPageSearchFilterkey>({
        FROM: pageQuery?.get('from') || formatDate(getToday()),
        SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
        SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
        UNTIL: pageQuery?.get('until') || formatDate(getToday()),
      }),
  )

  const {selectItem, selectedItems, setSelectedItems} = useItemSelection()
  const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const queryClient = useQueryClient()

  const {data: settlementListData} = useSettlementList({
    from: searchFilterStore.searchFilter.FROM,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    progressingStatus: 'WAITING',
    searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
    searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
    sort: 'EXPECTED_SETTLEMENT_DATE_DESC_ACCIDENT_NUMBER_DESC',
    until: searchFilterStore.searchFilter.UNTIL,
  })
  const {mutate: updateSettlements} = useSettlementUpdate()

  const handleOnClickListItemAccidentNumber = (receptionId: string): void => {
    const query = stringify({
      ...searchFilterStore.toQueryData(),
      'page-number': pageNumber,
    })

    router.replace({query}, undefined, {shallow: true})
    router.push(RECEPTIONS_PATH.SETTLEMENTS(receptionId))
  }

  const handleOnClickSettlementComplete = useCallback(() => {
    const updateRequested = confirm('정산 처리하시겠습니까?')
    const internalCaregivingManagerId =
      getInternalCaregivingManagerIdFromToken()

    if (!updateRequested || !internalCaregivingManagerId) {
      return
    }

    const newSettlements: ISettlementUpdate[] = selectedItems.map((id) => ({
      id,
      progressingStatus: 'COMPLETED',
      settlementManagerId: internalCaregivingManagerId,
    }))

    updateSettlements(
      {payload: newSettlements},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['settlement', 'list'],
          })

          setSelectedItems([])
        },
      },
    )
  }, [queryClient, selectedItems, setSelectedItems, updateSettlements])

  const handleOnClickCsvDownload = async (): Promise<void> => {
    try {
      const data = await fetcher<string>(
        `/api/v1/settlements?progressing-status=WAITING&from=${searchFilterStore.searchFilter.FROM}&until=${searchFilterStore.searchFilter.UNTIL}`,
        {
          headers: {
            accept: 'text/csv',
          },
        },
      )

      const fileName = getFilenameFromHttpHeaders(data.headers)
      const file = new File(
        [BOM_UTF_8 + data.body],
        fileName || `[정산관리]${format(Date.now(), 'yyyyMMdd')}.csv`,
        {
          type: 'text/csv',
        },
      )

      downloadFile(file)
    } catch (error) {
      if (error instanceof Error) {
        const errorType = isLocalServerErrorType(error)
        errorType && alert(SERVER_ERROR_MESSAGE[errorType] || error.message)
      }
    }
  }

  const handleOnChangeSearchFilter =
    <K extends SettlementWaitingPageSearchFilterkey>(key: K) =>
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
    <Layout currentPage="SETTLEMENT">
      {settlementListData ? (
        <SettlementsWaitingView
          onChangeSearchFilter={handleOnChangeSearchFilter}
          onClickCsvDownload={handleOnClickCsvDownload}
          onClickListItemAccidentNumber={handleOnClickListItemAccidentNumber}
          onClickSettlementComplete={handleOnClickSettlementComplete}
          onSelectAllListItem={setSelectedItems}
          onSelectListItem={selectItem}
          searchFilter={toJS(searchFilterStore.searchFilter)}
          selectedListItemIds={selectedItems}
          setPageNumber={setPageNumber}
          settlementListData={settlementListData}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default SettlementsWaitingPage
