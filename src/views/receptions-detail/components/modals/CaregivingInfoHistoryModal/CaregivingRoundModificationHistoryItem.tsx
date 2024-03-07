import React, {ReactElement} from 'react'
import TableGrid from '../../../../../components/table/TableGrid'
import Td from '../../../../../components/table/Td'
import {ListItemOrderProps, Sex} from '../../../../../types'
import {IReceptionCaregivingRoundModificationHistoryItem} from '../../../../../types/dto'
import {DEFAULT_PAGE_SIZE} from '../../../../../constants/data'
import getItemOrder from '../../../../../utils/get-item-order'
import useUserDetail from '../../../../../hooks/api/user/use-user-detail'
import useExternalCaregivingOrganization from '../../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import {
  CAREGIVER_INSURED,
  CAREGIVING_ROUND_MODIFIED_PROPERTY,
  SEX,
} from '../../../../../constants'
import {formatDate, formatDateTime} from '../../../../../utils/date'
import {
  formatPhoneNumberWithHyphen,
  formatStaticNumberWithComma,
} from '../../../../../utils/formatter'

type IProps = {
  data: IReceptionCaregivingRoundModificationHistoryItem
  gridTemplate: string
} & ListItemOrderProps

const CaregivingRoundModificationHistoryItem = ({
  data,
  gridTemplate,
  totalItemCount,
  currentPageNumber,
  pageSize = DEFAULT_PAGE_SIZE,
  listItemIndex,
}: IProps): ReactElement => {
  let previous
  let modified

  const previousCaregiverOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      (data.modifiedProperty === 'CAREGIVER_ORGANIZATION_ID' &&
        (data.previous as string | null)) ||
      null,
  })
  const modifiedCaregiverOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      (data.modifiedProperty === 'CAREGIVER_ORGANIZATION_ID' &&
        (data.modified as string | null)) ||
      null,
  })

  switch (data.modifiedProperty) {
    case 'CAREGIVER_ORGANIZATION_ID':
      previous = previousCaregiverOrganization?.name
      modified = modifiedCaregiverOrganization?.name
      break
    case 'CAREGIVER_SEX':
      previous =
        (typeof data.previous === 'string' && SEX[data.previous as Sex]) || null
      modified =
        (typeof data.modified === 'string' && SEX[data.modified as Sex]) || null
      break
    case 'CAREGIVER_BIRTH_DATE':
      previous =
        (typeof data.previous === 'string' &&
          formatDate(new Date(data.previous))) ||
        null
      modified =
        (typeof data.modified === 'string' &&
          formatDate(new Date(data.modified))) ||
        null
      break
    case 'CAREGIVER_PHONE_NUMBER':
      previous =
        (typeof data.previous === 'string' &&
          formatPhoneNumberWithHyphen(data.previous)) ||
        null
      modified =
        (typeof data.modified === 'string' &&
          formatPhoneNumberWithHyphen(data.modified)) ||
        null
      break
    case 'DAILY_CAREGIVING_CHARGE':
    case 'COMMISSION_FEE':
      previous =
        (typeof data.previous === 'number' &&
          formatStaticNumberWithComma(data.previous)) ||
        null
      modified =
        (typeof data.modified === 'number' &&
          formatStaticNumberWithComma(data.modified)) ||
        null
      break
    case 'CAREGIVER_INSURED':
      previous =
        (typeof data.previous === 'boolean' &&
          CAREGIVER_INSURED[Number(data.previous)]) ||
        null
      modified =
        (typeof data.modified === 'boolean' &&
          CAREGIVER_INSURED[Number(data.modified)]) ||
        null
      break
    case 'START_DATE_TIME':
    case 'END_DATE_TIME':
      previous =
        (typeof data.previous === 'string' &&
          formatDateTime(new Date(data.previous))) ||
        null
      modified =
        (typeof data.modified === 'string' &&
          formatDateTime(new Date(data.modified))) ||
        null
      break
    default:
      previous = data.previous
      modified = data.modified
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
      <Td>{CAREGIVING_ROUND_MODIFIED_PROPERTY[data.modifiedProperty]}</Td>
      <Td>{previous}</Td>
      <Td>{modified}</Td>
      <Td>{modifier?.name}</Td>
      <Td>{formatDateTime(new Date(data.modifiedDateTime))}</Td>
    </TableGrid>
  )
}

export default CaregivingRoundModificationHistoryItem
