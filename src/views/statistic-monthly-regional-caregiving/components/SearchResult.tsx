import React, {ReactElement} from 'react'
import OutlinedTableCell from '../../../components/table/OutlinedTableCell'
import {EMPTY_VALUE_TEXT} from '../../../constants'
import EllipsisText from '~components/list/EllipsisText'
import ListContainer from '~components/list/ListContainer'
import ListItem from '~components/list/ListItem'
import ListTitle from '~components/list/ListTitle'
import MonthlyRegionalCaregivingStatistics from '~models/dto/monthly-regional-caregiving-statistic/Resource'
import EmptySearchResult from '~components/EmptySearchResult'

const titleList = ['시/도', '시/군/구', '돌봄환자 수']

const GRID_TEMPLATE = `repeat(3, 1fr)`

interface ISearchResultProps {
  data: MonthlyRegionalCaregivingStatistics[]
}

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {data} = props
  return (
    <ListContainer backgroundColor="borderSecondary">
      <ListTitle gridTemplate={GRID_TEMPLATE} titleList={titleList} />
      {data.length > 0 ? (
        data.map((item, index) => (
          <ListItem
            gridTemplate={GRID_TEMPLATE}
            key={`${item.city}-${index}`}
            p="none"
          >
            <OutlinedTableCell>
              <EllipsisText>{item.state}</EllipsisText>
            </OutlinedTableCell>
            <OutlinedTableCell>
              <EllipsisText>{item.city || EMPTY_VALUE_TEXT}</EllipsisText>
            </OutlinedTableCell>
            <OutlinedTableCell>
              <EllipsisText>{item.receptionCount}</EllipsisText>
            </OutlinedTableCell>
          </ListItem>
        ))
      ) : (
        <EmptySearchResult />
      )}
    </ListContainer>
  )
}

export default SearchResult
