/* eslint-disable no-magic-numbers */
import {Button, Link} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import EllipsisText from '../../../components/list/EllipsisText'
import ListContainer from '../../../components/list/ListContainer'
import ListItem from '../../../components/list/ListItem'
import ListTitle from '../../../components/list/ListTitle'
import SettlementTransactionListModal from '../../../components/settlement-transaction/SettlementTransactionListModal'
import {formatStaticNumberWithComma} from '../../../utils/formatter'
import SettlementTransactionRegistrationModal from '../../../components/settlement-transaction/SettlementTransactionRegistrationModal'
import getItemOrder from '~utils/get-item-order'
import {IPaginationResponse} from '~types/dto'
import SettlementResource from '~models/dto/settlement/Resource'
import EmptySearchResult from '~components/EmptySearchResult'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import {formatDate} from '~utils/date'
import {SettlementTransactionModalType} from '~types'

interface ISettlementTransactionSearchResultProps {
  data: IPaginationResponse<SettlementResource>
  onClickAccidentNumber: (receptionId: string) => void
}

export const GRID_TEMPLATE =
  '80px minmax(160px, 1fr) minmax(120px, 1fr) 80px repeat(5, minmax(120px, 1fr))'

const TITLE_LIST = [
  '번호',
  '사고번호',
  '고객명',
  '간병차수',
  '입출금구분',
  '입출금액',
  '입출금일자',
]

const SearchResult = (
  props: ISettlementTransactionSearchResultProps,
): ReactElement => {
  const {data, onClickAccidentNumber} = props

  return (
    <ListContainer>
      <ListTitle gridTemplate={GRID_TEMPLATE} titleList={TITLE_LIST} />
      {data && data.items.length > 0 ? (
        data.items.map((item, index) => (
          <ListItem
            gridTemplate={GRID_TEMPLATE}
            key={`settlement-waiting-item-${item.id}`}
          >
            <EllipsisText>
              {getItemOrder(
                data.totalItemCount,
                data.currentPageNumber,
                DEFAULT_PAGE_SIZE,
                index,
              )}
            </EllipsisText>
            <Link
              color="information"
              onClick={(): void => onClickAccidentNumber(item.receptionId)}
            >
              {item.accidentNumber}
            </Link>
            <EllipsisText>{item.patientName}</EllipsisText>
            <EllipsisText>{item.caregivingRoundNumber}</EllipsisText>
            <EllipsisText>{item.transactionType}</EllipsisText>
            <EllipsisText>
              {formatStaticNumberWithComma(item.basicAmount)}
            </EllipsisText>
            <EllipsisText>
              {item.lastTransactionDateTime && formatDate(item.lastTransactionDateTime)}
            </EllipsisText>
          </ListItem>
        ))
      ) : (
        <EmptySearchResult />
      )}
    </ListContainer>
  )
}

export default SearchResult
