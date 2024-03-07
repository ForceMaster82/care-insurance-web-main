/* eslint-disable no-magic-numbers */
import React, {ReactElement, useCallback, useMemo} from 'react'
import {ICaregivingStartMessageStatus} from '../../../types/dto'
import EmptySearchResult from '../../../components/EmptySearchResult'
import ListItem from './SearchResultListItem'
import ListContainer from '~components/list/ListContainer'
import ListTitle from '~components/list/ListTitle'

interface ISearchResultProps {
  data: ICaregivingStartMessageStatus[]
  onClickListItemAccidentNumber: (receptionId: string) => void
  onSelect: (receptionId: string) => void
  onSelectAll: (ids: string[]) => void
  selectedItems: string[]
}

export const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(80px, 2fr) minmax(160px, 4fr) minmax(120px, 3fr)minmax(120px, 3fr) minmax(120px, 3fr) minmax(120px, 3fr)  '

const TABLE_TITLE = [
  '사고번호',
  '고객명',
  '접수일자',
  '시작일자',
  '상태',
  '발송일자',
]

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {
    data,
    onSelectAll,
    selectedItems,
    onSelect,
    onClickListItemAccidentNumber,
  } = props

  const allSelected = useMemo(
    () => data.length > 0 && data.length === selectedItems.length,
    [data.length, selectedItems.length],
  )

  const handleOnSelectAll = useCallback(() => {
    onSelectAll((allSelected && []) || data.map((item) => item.receptionId))
  }, [allSelected, data, onSelectAll])

  return (
    <ListContainer>
      <ListTitle
        gridTemplate={GRID_TEMPLATE}
        isSelected={allSelected}
        onSelect={handleOnSelectAll}
        titleList={TABLE_TITLE}
        useSelection
      />
      {data.map((item) => (
        <ListItem
          data={item}
          gridTemplate={GRID_TEMPLATE}
          isSelected={selectedItems.includes(item.receptionId)}
          key={`caregiving-start-message-status-${item.receptionId}`}
          onClickAccidentNumber={onClickListItemAccidentNumber}
          onSelect={onSelect}
        />
      ))}
      {data.length === 0 && <EmptySearchResult />}
    </ListContainer>
  )
}

export default SearchResult
