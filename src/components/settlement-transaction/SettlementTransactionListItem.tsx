import React, {ReactElement} from 'react'
import {formatStaticNumberWithComma} from '../../utils/formatter'
import useExternalCaregivingManagerDetail from '../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-detail'
import {isUnauthorized} from '../../utils/fetcher'
import TableGrid from '../table/TableGrid'
import Td from '../table/Td'
import {
  EMPTY_VALUE_TEXT,
  NOT_EXPOSED_TEXT,
  TRANSACTION_TYPE_MESSAGE,
} from '~constants'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import useInternalCaregivingManagerDetail from '~hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import SettlementTransactionResource from '~models/dto/settlement-transaction/Resource'
import {ListItemOrderProps} from '~types'
import {formatDate, formatDateTime} from '~utils/date'
import getItemOrder from '~utils/get-item-order'

type IProps = {
  data: SettlementTransactionResource
  gridTemplate: string
} & ListItemOrderProps

const SettlementTransactionListItem = (props: IProps): ReactElement => {
  const {data, gridTemplate, currentPageNumber, totalItemCount, listItemIndex} =
    props

  const {data: internalManager, error: internalManagerError} =
    useInternalCaregivingManagerDetail({
      internalCaregivingManagerId: data?.transactionSubjectId,
    })
  const externalManager = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId: data.transactionSubjectId,
  })

  const settlementTransactionManager = internalManager || externalManager

  return (
    <TableGrid gap="xxs" gridTemplate={gridTemplate} placeItems="stretch">
      <Td>
        {getItemOrder(
          totalItemCount,
          currentPageNumber,
          DEFAULT_PAGE_SIZE,
          listItemIndex,
        )}
      </Td>
      <Td>{TRANSACTION_TYPE_MESSAGE[data.transactionType]}</Td>
      <Td>
        {data.transactionType === 'DEPOSIT'
          ? formatStaticNumberWithComma(data.amount)
          : 0}
      </Td>
      <Td>
        {data.transactionType === 'WITHDRAWAL'
          ? formatStaticNumberWithComma(data.amount)
          : 0}
      </Td>
      <Td>{formatDate(data.transactionDate)}</Td>
      <Td>{formatDateTime(data.enteredDateTime)}</Td>
      <Td>
        {isUnauthorized(internalManagerError)
          ? NOT_EXPOSED_TEXT
          : settlementTransactionManager?.name || EMPTY_VALUE_TEXT}
      </Td>
    </TableGrid>
  )
}

export default SettlementTransactionListItem
