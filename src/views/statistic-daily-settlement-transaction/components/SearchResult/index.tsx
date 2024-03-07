/* eslint-disable no-magic-numbers */
/* eslint-disable unicorn/filename-case */
import {Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import TableGrid from '../../../../components/table/TableGrid'
import SearchResultListItem from './ListItem'
import OutlinedTableCell from '~components/table/OutlinedTableCell'
import ListContainer from '~components/list/ListContainer'
import DailyCaregivingRoundSettlementTransactionResource from '~models/dto/daily-caregiving-round-settlement-transaction-statistic/Resource'
import EmptySearchResult from '~components/EmptySearchResult'

interface ISearchResultProps {
  currentPageNumber: number
  data: DailyCaregivingRoundSettlementTransactionResource[]
  onClickAccidentNumber: (receptionId: string) => void
  totalItemCount: number
}

const GRID_TEMPLATE =
  'minmax(160px , 2fr) minmax(320px , 4fr) minmax(160px , 2fr) minmax(160px , 2fr) minmax(320px , 4fr) minmax(320px , 4fr) '

const titleList = ['번호', '사고번호', '고객명', '간병차수', '입금', '출금']

const SearchResult = (props: ISearchResultProps): ReactElement => {
  const {data, onClickAccidentNumber, totalItemCount, currentPageNumber} = props

  return (
    <ListContainer backgroundColor="borderSecondary">
      <TableGrid gap={1} gridTemplate={GRID_TEMPLATE}>
        {titleList.map((title, index) => (
          <OutlinedTableCell key={`${title}-${index}`}>
            <Typography variant="body3">{title}</Typography>
          </OutlinedTableCell>
        ))}
      </TableGrid>
      {data.length > 0 ? (
        data.map((item, index) => (
          <SearchResultListItem
            currentPageNumber={currentPageNumber}
            index={index}
            item={item}
            key={`caregiving-status-settlement-transaction-${item.caregivingRoundId}`}
            onClickAccidentNumber={onClickAccidentNumber}
            totalItemCount={totalItemCount}
          />
        ))
      ) : (
        <EmptySearchResult />
      )}
    </ListContainer>
  )
}

export default SearchResult
