import React, {ReactElement} from 'react'
import ListContainer from '../../../../components/list/ListContainer'
import TableTitle from './TableTitle'
import TableRow from './TableRow'
import DailyReceptionStatisticResource from '~models/dto/daily-reception-statistic/Resource'
import EmptySearchResult from '~components/EmptySearchResult'

const GRID_TEMPLATE =
  'minmax(120px, 3fr) minmax(64px, 2fr) minmax(80px, 2fr) minmax(80px, 2fr) minmax(80px, 2fr) minmax(80px, 2fr) minmax(80px, 2fr) minmax(480px, 12fr) minmax(240px, 6fr) minmax(80px, 2fr) minmax(240px, 6fr) minmax(240px, 6fr)'

interface ISearchResultProps {
  dailyReceptionStatisticData: DailyReceptionStatisticResource[]
}
const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {dailyReceptionStatisticData} = props

  return (
    <ListContainer backgroundColor="borderSecondary">
      <TableTitle gridTemplate={GRID_TEMPLATE} />
      {dailyReceptionStatisticData.length > 0 ? (
        dailyReceptionStatisticData.map((item) => (
          <TableRow
            data={item}
            gridTemplate={GRID_TEMPLATE}
            key={`monthly-reception-item-${item.receivedDate}`}
          />
        ))
      ) : (
        <EmptySearchResult />
      )}
    </ListContainer>
  )
}
export default SearchResult
