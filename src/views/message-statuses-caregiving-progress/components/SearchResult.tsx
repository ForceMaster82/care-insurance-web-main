/* eslint-disable no-magic-numbers */
import React, {ReactElement, useCallback, useMemo} from 'react'
import {ICaregivingProgressMessageStatus} from '../../../types/dto'
import EmptySearchResult from '../../../components/EmptySearchResult'
import SearchResultListItem from './SearchResultListItem'
import ListTitle from '~components/list/ListTitle'
import ListContainer from '~components/list/ListContainer'

interface ISearchResultProps {
  data: ICaregivingProgressMessageStatus[]
  onClickListItemAccidentNumber: (receptionId: string) => void
  onSelect: (itemId: string) => void
  onSelectAll: (itemIds: string[]) => void
  selectedItems: string[]
}

const TITLE_LIST = [
  '사고번호',
  '고객명',
  '간병차수',
  '시작일자',
  '상태',
  '발송일자',
]

export const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(80px, 2fr) minmax(160px, 4fr) minmax(120px, 3fr)minmax(120px, 3fr) minmax(120px, 3fr) minmax(120px, 3fr)  '

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {
    data,
    onSelectAll,
    selectedItems,
    onSelect,
    onClickListItemAccidentNumber,
  } = props

  const allSelected = useMemo(
    () => selectedItems.length > 0 && selectedItems.length === data.length,
    [data.length, selectedItems.length],
  )

  const handleOnSelectAll = useCallback(() => {
    onSelectAll(
      (allSelected && []) || data.map((item) => item.caregivingRoundId),
    )
  }, [allSelected, data, onSelectAll])

  return (
    <ListContainer>
      <ListTitle
        gridTemplate={GRID_TEMPLATE}
        isSelected={allSelected}
        onSelect={handleOnSelectAll}
        titleList={TITLE_LIST}
        useSelection
      />
      {data.map((item) => (
        <SearchResultListItem
          data={item}
          gridTemplate={GRID_TEMPLATE}
          isSelected={selectedItems.includes(item.caregivingRoundId)}
          key={`caregiving-progress-message-state-${item.caregivingRoundId}`}
          onClickAccidentNumber={onClickListItemAccidentNumber}
          onSelect={onSelect}
        />
      ))}
      {data.length === 0 && <EmptySearchResult />}
    </ListContainer>
  )
}

export default SearchResult
