import React, {ReactElement, useCallback, useMemo} from 'react'
import {Box} from '@caredoc/ui-web'
import ListContainer from '../../../../components/list/ListContainer'
import ReconciliationResource from '../../../../models/dto/reconciliation/Resource'
import EmptySearchResult from '../../../../components/EmptySearchResult'
import TableTitle from './TableTitle'
import TableRow from './TableRow'

export const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(160px, 4fr) minmax(120px, 3fr) minmax(80px, 2fr) minmax(120px, 3fr) minmax(480px, 12fr) minmax(480px, 12fr) '

interface ISearchResultProps {
  data: ReconciliationResource[]
  onSelectAllListItem: (ids: string[]) => void
  onSelectListItem: (id: string) => void
  selectedListItemIds: string[]
}

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {selectedListItemIds, onSelectAllListItem, onSelectListItem, data} =
    props

  const allSelected = useMemo(
    () => data.length > 0 && data.length === selectedListItemIds.length,
    [data.length, selectedListItemIds.length],
  )

  const handleOnSelectAll = useCallback(() => {
    onSelectAllListItem((allSelected && []) || data.map((item) => item.id))
  }, [allSelected, data, onSelectAllListItem])

  return (
    <ListContainer backgroundColor="borderSecondary">
      <TableTitle isSelected={allSelected} onSelect={handleOnSelectAll} />
      {data.length === 0 && <EmptySearchResult />}
      <Box backgroundColor="borderSecondary" gap={1}>
        {data.map((item) => (
          <TableRow
            data={item}
            isSelected={selectedListItemIds.includes(item.id)}
            key={`reconciliation-item-${item.id}`}
            onSelect={(): void => onSelectListItem(item.id)}
          />
        ))}
      </Box>
    </ListContainer>
  )
}

export default SearchResult
