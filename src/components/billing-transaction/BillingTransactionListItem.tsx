import React, {ReactElement} from 'react'
import {ListItemOrderProps} from '../../types'
import BillingTransactionResource from '../../models/dto/billing-transaction/Resource'
import {DEFAULT_PAGE_SIZE} from '../../constants/data'
import getItemOrder from '../../utils/get-item-order'
import {TRANSACTION_TYPE_MESSAGE} from '../../constants'
import {formatDate, formatDateTime} from '../../utils/date'
import useInternalCaregivingManagerDetail from '../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import {formatStaticNumberWithComma} from '../../utils/formatter'
import TableGrid from '../table/TableGrid'
import Td from '../table/Td'

type IProps = {
  data: BillingTransactionResource
  gridTemplate: string
} & ListItemOrderProps

const BillingTransactionListItem = (props: IProps): ReactElement => {
  const {
    data,
    listItemIndex,
    totalItemCount,
    currentPageNumber,
    pageSize = DEFAULT_PAGE_SIZE,
    gridTemplate,
  } = props

  const {data: internalCaregivingMangaer} = useInternalCaregivingManagerDetail({
    internalCaregivingManagerId: data.transactionSubjectId,
  })

  return (
    <TableGrid gap="xxs" gridTemplate={gridTemplate} placeItems="stretch">
      <Td>
        {getItemOrder(
          totalItemCount,
          currentPageNumber,
          pageSize,
          listItemIndex,
        )}
      </Td>
      <Td>{TRANSACTION_TYPE_MESSAGE[data.transactionType]}</Td>
      <Td>{formatStaticNumberWithComma(data.depositAmount)}</Td>
      <Td>{formatStaticNumberWithComma(data.withdrawalAmount)}</Td>
      <Td>{formatDate(data.transactionDate)}</Td>
      <Td>{formatDateTime(data.enteredDateTime)}</Td>
      <Td>{internalCaregivingMangaer?.name}</Td>
    </TableGrid>
  )
}

export default BillingTransactionListItem
