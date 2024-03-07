/* eslint-disable no-magic-numbers */
/* eslint-disable unicorn/filename-case */
import React, {PropsWithChildren, ReactElement} from 'react'
import CaregivingRoundResource from '../../../../models/dto/caregiving-round/Resource'
import {IPaginationResponse} from '../../../../types/dto'
import EmptySearchResult from '../../../../components/EmptySearchResult'
import SearchResultListItem from './ListItem'
import ListContainer from '~components/list/ListContainer'
import ListTitle from '~components/list/ListTitle'

interface IProps {
  data: IPaginationResponse<CaregivingRoundResource>
  onClickListItem: (receptionId: string) => void
}

export const GRID_TEMPLATE =
  'minmax(80px, 2fr) repeat(2, minmax(160px, 4fr)) minmax(80px, 2fr) minmax(120px, 3fr) repeat(2, minmax(80px, 2fr)) repeat(5, minmax(120px, 3fr))'

const TABLE_TITLE = [
  '번호',
  '증권번호',
  '사고번호',
  '고객명',
  '진행 상태',
  '간병차수',
  '간병기간',
  '간병상태',
  '정산상태',
  '청구상태',
  '담당자 소속',
  '배정 담당자',
]

const SearchResult = (props: PropsWithChildren<IProps>): ReactElement => {
  const {
    data: {items, totalItemCount, currentPageNumber},
    onClickListItem,
  } = props

  return (
    <ListContainer>
      <ListTitle gridTemplate={GRID_TEMPLATE} titleList={TABLE_TITLE} />
      {totalItemCount === 0 && <EmptySearchResult />}
      {items.map((item, index) => (
        <SearchResultListItem
          currentPageNumber={currentPageNumber}
          data={item}
          gridTemplate={GRID_TEMPLATE}
          key={`caregiving-round-${item.id}`}
          listItemIndex={index}
          onClick={onClickListItem}
          totalItemCount={totalItemCount}
        />
      ))}
    </ListContainer>
  )
}

export default SearchResult
