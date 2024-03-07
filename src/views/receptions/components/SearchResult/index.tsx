/* eslint-disable no-magic-numbers */
import React, {ReactElement} from 'react'
import {IPaginationResponse} from '../../../../types/dto'
import ReceptionListResource from '../../../../models/dto/reception/ListResource'
import EmptySearchResult from '../../../../components/EmptySearchResult'
import SearchResultListItem from './ListItem'
import ListContainer from '~components/list/ListContainer'
import ListTitle from '~components/list/ListTitle'

interface IProps {
  data: IPaginationResponse<ReceptionListResource>
  onClickListItem: (receptionId: string) => void
}

const GRID_TEMPLATE =
  'minmax(80px, 2fr) minmax(160px, 4fr) minmax(160px, 4fr) minmax(160px, 4fr) minmax(80px, 2fr) minmax(80px, 2fr) minmax(80px, 2fr) minmax(160px, 4fr) minmax(120px, 3fr) minmax(160px, 4fr) minmax(120px, 3fr) minmax(160px, 4fr) minmax(80px, 2fr) minmax(80px, 2fr)'

const TABLE_TITLE = [
  '번호',
  '증권번호',
  '사고번호',
  '진행 상태',
  '고객명',
  '성별',
  '나이',
  '병원명',
  '희망기간',
  '서비스 희망일자',
  '보호자',
  '연락처 I',
  '담당자 소속',
  '담당자',
]

const SearchResult = (props: IProps): ReactElement => {
  const {
    data: {items, totalItemCount, currentPageNumber},
    onClickListItem,
  } = props

  return (
    <ListContainer>
      <ListTitle gridTemplate={GRID_TEMPLATE} px="sm" titleList={TABLE_TITLE} />
      {items.length === 0 && <EmptySearchResult />}
      {items.map((item, index) => (
        <SearchResultListItem
          currentPageNumber={currentPageNumber}
          data={item}
          gridTemplate={GRID_TEMPLATE}
          key={`reception-${item.id}`}
          listItemIndex={index}
          onClick={onClickListItem}
          totalItemCount={totalItemCount}
        />
      ))}
    </ListContainer>
  )
}

export default SearchResult
