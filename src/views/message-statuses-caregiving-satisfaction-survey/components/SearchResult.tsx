/* eslint-disable no-magic-numbers */
import React, {ReactElement, useCallback, useMemo} from 'react'
import {ICaregivingSatisfactionSurveyStatus} from '../../../types/dto'
import EmptySearchResult from '../../../components/EmptySearchResult'
import SearchResultListItem from './SearchResultListItem'
import ListContainer from '~components/list/ListContainer'
import ListTitle from '~components/list/ListTitle'

interface ISearchResultProps {
  data: ICaregivingSatisfactionSurveyStatus[]
  onClickListItemAccidentNumber: (receptionId: string) => void
  onSelect: (itemId: string) => void
  onSelectAll: (itemIds: string[]) => void
  selectedItems: string[]
}

const TITLE_LIST = ['사고번호', '고객명', '간병차수', '종료일자', '상태']

export const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(80px, 2fr) minmax(160px, 4fr) minmax(120px, 3fr)minmax(120px, 3fr) minmax(120px, 3fr)   '

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {
    data,
    onSelectAll,
    selectedItems,
    onSelect,
    onClickListItemAccidentNumber,
  } = props

  const allSelected = useMemo(
    () => selectedItems.length > 0 && data.length === selectedItems.length,
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
        titleList={TITLE_LIST}
        useSelection
      />
      {data.map((item) => (
        <SearchResultListItem
          data={item}
          gridTemplate={GRID_TEMPLATE}
          isSelected={selectedItems.includes(item.receptionId)}
          key={`caregiving-satisfaction-survey-reservation-status-${item.receptionId}`}
          onClickAccidentNumber={onClickListItemAccidentNumber}
          onSelect={onSelect}
        />
      ))}
      {data.length === 0 && <EmptySearchResult />}
    </ListContainer>
  )
}

export default SearchResult
