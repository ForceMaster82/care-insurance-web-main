/* eslint-disable no-alert */
import React, {useCallback, useEffect, useState} from 'react'
import {NextPage} from 'next'
import {subMonths} from 'date-fns'
import {useQueryClient} from '@tanstack/react-query'
import {Loading} from '@caredoc/templates-web'
import {observer} from 'mobx-react-lite'
import {reaction, toJS} from 'mobx'
import Layout from '../../templates/layouts/Layout'
import useItemSelection from '../../hooks/use-item-selection'

import {DEFAULT_PAGE_SIZE} from '../../constants/data'
import useReconciliationList from '../../hooks/api/reconciliation/use-reconciliation-list'
import usePagination from '../../hooks/use-pagination'
import useReconciliationUpdate from '../../hooks/api/reconciliation/use-reconciliation-update'
import {IReconciliationUpdate} from '../../types/dto'
import {ReconciliationPageSearchFilterKey, SearchCategory} from '../../types'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {formatDate} from '../../utils/date'
import ReconciliationView from '~views/reconciliation'
import {isServer} from "libs/utils-web";

const ReconciliationPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const searchCategoryQueryValue = pageQuery?.get('search-category') as
      | SearchCategory
      | undefined
  const {
    selectedItems: selectedReconciliationIds,
    selectItem: selectReconciliation,
    setSelectedItems: setSelectedReconciliations,
  } = useItemSelection()

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<ReconciliationPageSearchFilterKey>({
        ISSUED_AT_FROM: formatDate(subMonths(new Date(), 1)),
        ISSUED_AT_UNTIL: formatDate(new Date()),
        SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
        SEARCH_KEYWORD: '',
      }),
  )

  const {pageNumber, setPageNumber, resetPageNumber} = usePagination()

  const queryClient = useQueryClient()

  const reconciliationListData = useReconciliationList({
    closingStatus: 'OPEN',
    issuedAtFrom: searchFilterStore.searchFilter.ISSUED_AT_FROM,
    issuedAtUntil: searchFilterStore.searchFilter.ISSUED_AT_UNTIL,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
    searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
  })
  const {mutate: udpateReconciliations} = useReconciliationUpdate()

  const handleOnClickReconciliationClose = useCallback(() => {
    const closeRequired = confirm('선택 건들의 마감 처리를 하시겠습니까?')

    if (!closeRequired) {
      return
    }

    const newReconciliations: IReconciliationUpdate[] =
      selectedReconciliationIds.map((item) => ({
        closingStatus: 'CLOSED',
        id: item,
      }))

    udpateReconciliations(
      {
        payload: newReconciliations,
      },
      {
        onSuccess: () => {
          alert(
            `총 ${selectedReconciliationIds.length}건이 마감 처리되었습니다.`,
          )

          queryClient.invalidateQueries({
            queryKey: ['reconciliation', 'list'],
          })
          setSelectedReconciliations([])
        },
      },
    )
  }, [
    queryClient,
    selectedReconciliationIds,
    setSelectedReconciliations,
    udpateReconciliations,
  ])

  const handleOnChangeSearchFilter =
    <K extends ReconciliationPageSearchFilterKey>(key: K) =>
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
    <Layout currentPage="RECONCILIATION">
      {reconciliationListData ? (
        <ReconciliationView
          data={reconciliationListData}
          onChangePageNumber={setPageNumber}
          onChangeSearchFilter={handleOnChangeSearchFilter}
          onClickReconciliationClose={handleOnClickReconciliationClose}
          onSelectAllListItem={setSelectedReconciliations}
          onSelectListItem={selectReconciliation}
          searchFilter={toJS(searchFilterStore.searchFilter)}
          selectedListItemIds={selectedReconciliationIds}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default ReconciliationPage
