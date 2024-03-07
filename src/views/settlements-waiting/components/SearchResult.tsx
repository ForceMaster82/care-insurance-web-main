/* eslint-disable no-magic-numbers */
import React, {ReactElement, useCallback, useMemo} from 'react'
import ListContainer from '../../../components/list/ListContainer'
import ListTitle from '../../../components/list/ListTitle'
import SearchResultListItem from './SearchResultListItem'
import SettlementResource from '~models/dto/settlement/Resource'
import EmptySearchResult from '~components/EmptySearchResult'
import {IPaginationResponse} from '~types/dto'

interface ISettlementWaitingSearchResultProps {
  data?: IPaginationResponse<SettlementResource>
  onClickAccidentNumber: (receptionId: string) => void
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  selectedListItemIds: string[]
}

export const GRID_TEMPLATE =
  'repeat(2, 80px) minmax(160px, 1fr) repeat(2, minmax(120px, 1fr)) 80px repeat(3, minmax(120px, 1fr))'

const TITLE_LIST = [
  '번호',
  '사고번호',
  '고객명',
  '간병인 소속',
  '간병차수',
  '산정금액',
  '정산 예정일자',
  '최근 산정일자',
]

const SearchResult = (
  props: ISettlementWaitingSearchResultProps,
): ReactElement => {
  const {
    data,
    selectedListItemIds,
    onSelectAllListItem,
    onSelectListItem,
    onClickAccidentNumber,
  } = props

  const allSelected = useMemo<boolean>(
    () =>
      data && data.items.length > 0
        ? data.items.length === selectedListItemIds.length
        : false,
    [data, selectedListItemIds],
  )

  const handleOnSelectAll = useCallback(() => {
    onSelectAllListItem(
      data ? (allSelected && []) || data.items.map(({id}) => id) : [],
    )
  }, [allSelected, data, onSelectAllListItem])

  return (
    <ListContainer>
      <ListTitle
        gridTemplate={GRID_TEMPLATE}
        isSelected={allSelected}
        onSelect={handleOnSelectAll}
        titleList={TITLE_LIST}
        useSelection
      />
      {data && data.items.length > 0 ? (
        data.items.map((item, index) => (
          <SearchResultListItem
            currentPageNumber={data.currentPageNumber}
            data={item}
            gridTemplate={GRID_TEMPLATE}
            isSelected={selectedListItemIds.includes(item.id)}
            key={`settlement-waiting-item-${item.id}`}
            listItemIndex={index}
            onClickAccidentNumber={onClickAccidentNumber}
            onSelect={(): void => onSelectListItem(item.id)}
            totalItemCount={data.totalItemCount}
          />
        ))
      ) : (
        <EmptySearchResult />
      )}
    </ListContainer>
  )
}

export default SearchResult
