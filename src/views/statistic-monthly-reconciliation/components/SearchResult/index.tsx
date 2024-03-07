import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import ListContainer from '../../../../components/list/ListContainer'
import ReconciliationResource from '../../../../models/dto/reconciliation/Resource'
import TableTitle from './TableTitle'
import TableRow from './TableRow'
import {IPaginationResponse} from '~types/dto'
import EmptySearchResult from '~components/EmptySearchResult'

export const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(160px, 4fr) minmax(120px, 3fr) minmax(80px, 2fr) minmax(120px, 3fr) minmax(480px, 12fr) minmax(480px, 12fr) '

interface ISearchResultProps {
  reconciliationData?: IPaginationResponse<ReconciliationResource>
}

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {reconciliationData} = props

  return (
    <ListContainer backgroundColor="borderSecondary">
      <TableTitle />
      <Box backgroundColor="borderSecondary" gap={1}>
        {reconciliationData && reconciliationData.items.length > 0 ? (
          reconciliationData.items.map((item, index) => (
            <TableRow
              currentPageNumber={reconciliationData.currentPageNumber}
              key={`reconciliation-${item.id}`}
              listItemIndex={index}
              reconciliationData={item}
              totalItemCount={reconciliationData.totalItemCount}
            />
          ))
        ) : (
          <EmptySearchResult />
        )}
      </Box>
    </ListContainer>
  )
}

export default SearchResult
