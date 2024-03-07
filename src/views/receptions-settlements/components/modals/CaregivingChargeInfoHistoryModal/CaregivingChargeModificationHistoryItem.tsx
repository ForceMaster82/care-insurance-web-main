import React, {ReactElement} from 'react'
import TableGrid from '../../../../../components/table/TableGrid'
import Td from '../../../../../components/table/Td'
import {IReceptionCaregivingChargeModificationHistoryItem} from '../../../../../types/dto'
import {ListItemOrderProps} from '../../../../../types'
import {DEFAULT_PAGE_SIZE} from '../../../../../constants/data'
import getItemOrder from '../../../../../utils/get-item-order'
import {
  CAREGIVING_CHARGE_MODIFIED_PROPERTY,
  IS_CANCEL_AFTER_ARRIVED,
} from '../../../../../constants'
import {formatDate, formatDateTime} from '../../../../../utils/date'
import useUserDetail from '../../../../../hooks/api/user/use-user-detail'
import {formatStaticNumberWithComma} from '../../../../../utils/formatter'

type IProps = {
  data: IReceptionCaregivingChargeModificationHistoryItem
  gridTemplate: string
} & ListItemOrderProps

const CaregivingChargeModificationHistoryItem = ({
  totalItemCount,
  currentPageNumber,
  data,
  pageSize = DEFAULT_PAGE_SIZE,
  gridTemplate,
  listItemIndex,
}: IProps): ReactElement => {
  let previous
  let modified

  switch (data.modifiedProperty) {
    case 'EXPECTED_SETTLEMENT_DATE':
      previous =
        (typeof data.previous === 'string' &&
          formatDate(new Date(data.previous))) ||
        null
      modified =
        (typeof data.modified === 'string' &&
          formatDate(new Date(data.modified))) ||
        null
      break
    case 'IS_CANCEL_AFTER_ARRIVED':
      previous =
        (typeof data.previous === 'boolean' &&
          IS_CANCEL_AFTER_ARRIVED[Number(data.previous)]) ||
        null
      modified =
        (typeof data.modified === 'boolean' &&
          IS_CANCEL_AFTER_ARRIVED[Number(data.modified)]) ||
        null
      break
    case 'ADDITIONAL_CHARGE_1':
    case 'ADDITIONAL_CHARGE_2':
    case 'ADDITIONAL_CHARGE_3':
      previous = data.previous
      modified = data.modified
      break
    default:
      previous =
        (typeof data.previous === 'number' &&
          formatStaticNumberWithComma(data.previous)) ||
        null
      modified =
        (typeof data.modified === 'number' &&
          formatStaticNumberWithComma(data.modified)) ||
        null
  }

  const modifier = useUserDetail({
    userId: data.modifierId,
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
      <Td>{data.caregivingRoundNumber}</Td>
      <Td>{CAREGIVING_CHARGE_MODIFIED_PROPERTY[data.modifiedProperty]}</Td>
      <Td>{previous}</Td>
      <Td>{modified}</Td>
      <Td>{modifier?.name}</Td>
      <Td>{formatDateTime(new Date(data.modifiedDateTime))}</Td>
    </TableGrid>
  )
}

export default CaregivingChargeModificationHistoryItem
