import React, {ReactElement} from 'react'
import TableGrid from '../../../../../components/table/TableGrid'
import Td from '../../../../../components/table/Td'
import getItemOrder from '../../../../../utils/get-item-order'
import {
  CLAIM_TYPE,
  NOTIFY_CAREGIVING_PROGRESS,
  ORGANIZATION_TYPE,
  RECEPTION_MODIFIED_PROPERTY,
  SEX,
} from '../../../../../constants/texts'
import {formatDate, formatDateTime} from '../../../../../utils/date'
import {IReceptionModificationHistoryItem} from '../../../../../types/dto'
import {
  ClaimType,
  ListItemOrderProps,
  OrganizationType,
  Sex,
} from '../../../../../types'
import {DEFAULT_PAGE_SIZE} from '../../../../../constants/data'
import useCoverageDetail from '../../../../../hooks/api/coverage/use-coverage-detail'
import useExternalCaregivingOrganization from '../../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import useInternalCaregivingManagerDetail from '../../../../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import useExternalCaregivingManagerDetail from '../../../../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-detail'
import useUserDetail from '../../../../../hooks/api/user/use-user-detail'
import {formatMaskedPhoneNumberWithHyphen} from '../../../../../utils/formatter'

type IProps = {
  data: IReceptionModificationHistoryItem
  gridTemplate: string
} & ListItemOrderProps

const ReceptionModificationHistoryItem = ({
  totalItemCount,
  currentPageNumber,
  data,
  pageSize = DEFAULT_PAGE_SIZE,
  gridTemplate,
  listItemIndex,
}: IProps): ReactElement => {
  let previous
  let modified

  const previousCoverage = useCoverageDetail({
    coverageId:
      (data.modifiedProperty === 'COVERAGE_ID' &&
        (data.previous as string | null)) ||
      null,
  })
  const modifiedCoverage = useCoverageDetail({
    coverageId:
      (data.modifiedProperty === 'COVERAGE_ID' &&
        (data.modified as string | null)) ||
      null,
  })

  const previousExternalCaregivingOrganization =
    useExternalCaregivingOrganization({
      externalCaregivingOrganizationId:
        (data.modifiedProperty === 'CAREGIVING_ORGANIZATION_ID' &&
          (data.previous as string | null)) ||
        null,
    })
  const modifiedExternalCaregivingOrganization =
    useExternalCaregivingOrganization({
      externalCaregivingOrganizationId:
        (data.modifiedProperty === 'CAREGIVING_ORGANIZATION_ID' &&
          (data.modified as string | null)) ||
        null,
    })

  const {data: previousInternalCaregivingManager} =
    useInternalCaregivingManagerDetail({
      internalCaregivingManagerId:
        (data.modifiedProperty === 'CAREGIVING_MANAGING_USER_ID' &&
          (data.previous as string | null)) ||
        null,
    })
  const {data: modifiedInternalCaregivingManager} =
    useInternalCaregivingManagerDetail({
      internalCaregivingManagerId:
        (data.modifiedProperty === 'CAREGIVING_MANAGING_USER_ID' &&
          (data.modified as string | null)) ||
        null,
    })

  const previousExternalCaregivingManager = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId:
      (data.modifiedProperty === 'CAREGIVING_MANAGING_USER_ID' &&
        (data.previous as string | null)) ||
      null,
  })
  const modifiedExternalCaregivingManager = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId:
      (data.modifiedProperty === 'CAREGIVING_MANAGING_USER_ID' &&
        (data.modified as string | null)) ||
      null,
  })

  switch (data.modifiedProperty) {
    case 'COVERAGE_ID':
      previous = previousCoverage?.name
      modified = modifiedCoverage?.name
      break
    case 'CAREGIVING_ORGANIZATION_ID':
      previous = previousExternalCaregivingOrganization?.name
      modified = modifiedExternalCaregivingOrganization?.name
      break
    case 'CAREGIVING_MANAGING_USER_ID':
      previous = (
        previousInternalCaregivingManager || previousExternalCaregivingManager
      )?.name
      modified = (
        modifiedInternalCaregivingManager || modifiedExternalCaregivingManager
      )?.name
      break
    case 'ACCIDENT_DATE_TIME':
    case 'ADMISSION_DATE_TIME':
      previous =
        (typeof data.previous === 'string' &&
          formatDateTime(new Date(data.previous))) ||
        null
      modified =
        (typeof data.modified === 'string' &&
          formatDateTime(new Date(data.modified))) ||
        null
      break
    case 'CLAIM_TYPE':
      previous = CLAIM_TYPE[data.previous as ClaimType]
      modified = CLAIM_TYPE[data.modified as ClaimType]
      break
    case 'CAREGIVING_ORGANIZATION_TYPE':
      previous = ORGANIZATION_TYPE[data.previous as OrganizationType]
      modified = ORGANIZATION_TYPE[data.modified as OrganizationType]
      break
    case 'PATIENT_PRIMARY_PHONE_NUMBER':
    case 'PATIENT_SECONDARY_PHONE_NUMBER':
      previous =
        (typeof data.previous === 'string' &&
          formatMaskedPhoneNumberWithHyphen(data.previous)) ||
        null
      modified =
        (typeof data.modified === 'string' &&
          formatMaskedPhoneNumberWithHyphen(data.modified)) ||
        null
      break
    case 'PATIENT_SEX':
      previous =
        (typeof data.previous === 'string' && SEX[data.previous as Sex]) || null
      modified =
        (typeof data.modified === 'string' && SEX[data.modified as Sex]) || null
      break
    case 'SUBSCRIPTION_DATE':
    case 'DESIRED_CAREGIVING_START_DATE':
    case 'EXPECTED_CAREGIVING_START_DATE':
    case 'EXPECTED_CAREGIVING_LIMIT_DATE':
      previous =
        (typeof data.previous === 'string' &&
          formatDate(new Date(data.previous))) ||
        null
      modified =
        (typeof data.modified === 'string' &&
          formatDate(new Date(data.modified))) ||
        null
      break
    case 'NOTIFY_CAREGIVING_PROGRESS':
      previous =
        (typeof data.previous === 'boolean' &&
          NOTIFY_CAREGIVING_PROGRESS[Number(data.previous)]) ||
        null
      modified =
        (typeof data.modified === 'boolean' &&
          NOTIFY_CAREGIVING_PROGRESS[Number(data.modified)]) ||
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
      <Td>{RECEPTION_MODIFIED_PROPERTY[data.modifiedProperty]}</Td>
      <Td>{previous}</Td>
      <Td>{modified}</Td>
      <Td>{modifier?.name}</Td>
      <Td>{formatDateTime(new Date(data.modifiedDateTime))}</Td>
    </TableGrid>
  )
}

export default ReceptionModificationHistoryItem
