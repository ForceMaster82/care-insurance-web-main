import {Box, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {EllipsisTypography} from '@caredoc/templates-web'
import ReceptionStatusChip from '../../../../components/chips/ReceptionStatusChip'
import EllipsisText from '../../../../components/list/EllipsisText'
import ListItem from '../../../../components/list/ListItem'
import {EMPTY_VALUE_TEXT, ORGANIZATION_TYPE, SEX} from '../../../../constants'
import {DEFAULT_PAGE_SIZE} from '../../../../constants/data'
import {formatDate} from '../../../../utils/date'
import getItemOrder from '../../../../utils/get-item-order'
import ReceptionListResource from '../../../../models/dto/reception/ListResource'
import {ListItemOrderProps} from '../../../../types'
import useExternalCaregivingOrganization from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import useInternalCaregivingManagerDetail from '../../../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import useExternalCaregivingManagerDetail from '../../../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-detail'
import {formatMaskedPhoneNumberWithHyphen} from '../../../../utils/formatter'
import UrgencyChip from '../../../../components/chips/UrgencyChip'
import PeriodTypeChip from '../../../../components/chips/PeriodTypeChip'

type IProps = {
  data: ReceptionListResource
  gridTemplate: string
  onClick: (receptionId: string) => void
} & ListItemOrderProps

const SearchResultListItem = (props: IProps): ReactElement => {
  const {
    gridTemplate,
    onClick,
    data,
    totalItemCount,
    currentPageNumber,
    listItemIndex,
  } = props

  const {data: internalCaregivingManager} = useInternalCaregivingManagerDetail({
    internalCaregivingManagerId:
      ((data.caregivingManagerInfo?.organizationType === 'INTERNAL' ||
        data.caregivingManagerInfo?.organizationType === 'ORGANIZATION') &&
        data.caregivingManagerInfo.managingUserId) ||
      null,
  })
  const externalCaregivingManager = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId:
      data.caregivingManagerInfo?.organizationType === 'AFFILIATED'
        ? data.caregivingManagerInfo.managingUserId
        : null,
  })
  const caregivingManagerOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      data.caregivingManagerInfo?.organizationId,
  })

  const caregivingManager =
    internalCaregivingManager || externalCaregivingManager

  const hospitalRoomInfoStateCityText = [
    data.accidentInfo.hospitalRoomInfo.state,
    data.accidentInfo.hospitalRoomInfo.city,
  ]
    .filter((item) => Boolean(item))
    .join(' ')

  return (
    <ListItem
      gridTemplate={gridTemplate}
      highlightHover
      onClick={(): void => onClick(data.id)}
      px="sm"
    >
      <EllipsisText>
        {getItemOrder(
          totalItemCount,
          currentPageNumber,
          DEFAULT_PAGE_SIZE,
          listItemIndex,
        )}
      </EllipsisText>
      <EllipsisText>{data.insuranceInfo.insuranceNumber}</EllipsisText>
      <EllipsisText>{data.accidentInfo.accidentNumber}</EllipsisText>
      <ReceptionStatusChip status={data.progressingStatus} />
      <EllipsisText>{data.patientInfo.name}</EllipsisText>
      <EllipsisText>{SEX[data.patientInfo.sex]}</EllipsisText>
      <EllipsisText>{data.patientInfo.age}</EllipsisText>
      <Box alignItems="center" maxWidth="fill-available">
        <EllipsisTypography
          line={hospitalRoomInfoStateCityText ? 1 : 2}
          variant="body4"
        >
          {data.accidentInfo.hospitalRoomInfo.hospitalAndRoom}
        </EllipsisTypography>
        {Boolean(hospitalRoomInfoStateCityText) && (
          <Typography variant="caption2">
            ({hospitalRoomInfoStateCityText})
          </Typography>
        )}
      </Box>
      <Box
        alignItems="center"
        flexDirection="row"
        gap="xs"
        p="none"
        textAlign="center"
      >
        <Box>
          <EllipsisText>
            {(typeof data.desiredCaregivingPeriod === 'number' &&
              `${data.desiredCaregivingPeriod}일`) ||
              '미정'}
          </EllipsisText>
        </Box>
        <Box gap="xxs">
          <UrgencyChip renderOnly={['URGENT']} value={data.urgency} />
          <PeriodTypeChip renderOnly={['SHORT']} value={data.periodType} />
        </Box>
      </Box>
      <EllipsisText>{formatDate(data.desiredCaregivingStartDate)}</EllipsisText>
      <EllipsisText>
        {data.patientInfo.primaryContact.relationshipWithPatient}
      </EllipsisText>
      <EllipsisText>
        {formatMaskedPhoneNumberWithHyphen(
          data.patientInfo.primaryContact.phoneNumber,
        )}
      </EllipsisText>
      <EllipsisText>
        {(data.caregivingManagerInfo?.organizationType === 'INTERNAL' &&
          ORGANIZATION_TYPE[data.caregivingManagerInfo.organizationType]) ||
          caregivingManagerOrganization?.name ||
          '미배정'}
      </EllipsisText>
      <EllipsisText>{caregivingManager?.name || EMPTY_VALUE_TEXT}</EllipsisText>
    </ListItem>
  )
}

export default SearchResultListItem
