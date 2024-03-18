import React, {ReactElement} from 'react'
import BillingStatusChip from '../../../../components/chips/BillingStatusChip'
import CaregivingStatusChip from '../../../../components/chips/CaregivingStatusChip'
import ReceptionStatusChip from '../../../../components/chips/ReceptionStatusChip'
import SettlementStatusChip from '../../../../components/chips/SettlementStatusChip'
import EllipsisText from '../../../../components/list/EllipsisText'
import {EMPTY_VALUE_TEXT, ORGANIZATION_TYPE} from '../../../../constants'
import {DEFAULT_PAGE_SIZE} from '../../../../constants/data'
import getItemOrder from '../../../../utils/get-item-order'
import CaregivingRoundResource from '../../../../models/dto/caregiving-round/Resource'
import {ListItemOrderProps} from '../../../../types'
import ListItem from '../../../../components/list/ListItem'
import useExternalCaregivingOrganization from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import {generatePeriodText} from '../../../../utils/text-transformation'
import useInternalCaregivingManagerDetail from '../../../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import useExternalCaregivingManagerDetail from '../../../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-detail'
import RTooltip from "views/caregiving-rounds/components/SearchResult/RTooltip";

type IProps = {
  data: CaregivingRoundResource
  gridTemplate: string
  onClick: (receptionId: string) => void
} & ListItemOrderProps

const SearchResultListItem = (props: IProps): ReactElement => {
  const {
    gridTemplate,
    totalItemCount,
    currentPageNumber,
    onClick,
    data,
    listItemIndex,
  } = props

  const caregivingManagerInfo = data.receptionInfo.caregivingManagerInfo

  const {data: internalCaregivingManager} = useInternalCaregivingManagerDetail({
    internalCaregivingManagerId:
      caregivingManagerInfo?.organizationType === 'INTERNAL' ||
      caregivingManagerInfo?.organizationType === 'ORGANIZATION'
        ? caregivingManagerInfo?.managingUserId
        : null,
  })
  const externalCaregivingManager = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId:
      caregivingManagerInfo?.organizationType === 'AFFILIATED'
        ? caregivingManagerInfo?.managingUserId
        : null,
  })
  const caregivingManagerOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId: caregivingManagerInfo?.organizationId,
  })

  const caregivingManager =
    internalCaregivingManager || externalCaregivingManager

  return (
    <ListItem
      gridTemplate={gridTemplate}
      highlightHover
      key={`caregiving-round-${data.id}`}
      onClick={(): void => onClick(data.receptionInfo.receptionId)}

  >
      <EllipsisText>
        {getItemOrder(
          totalItemCount,
          currentPageNumber,
          DEFAULT_PAGE_SIZE,
          listItemIndex,
        )}
      </EllipsisText>
      <RTooltip
          className={'tooltip-listItem'}
          message={'환자명 = '+data.receptionInfo.patientName+
              '  |  닉네임 = '+data.receptionInfo.patientNickName+
              '  |  나이 = '+data.receptionInfo.patientAge+
              '  |  성별 = '+data.receptionInfo.patientSex+
              '  |  연락처 = '+data.receptionInfo.patientPrimaryPhoneNumber+
              '  |  병원 = '+data.receptionInfo.hospitalAndRoom+
              '  |  환자상태 = '+data.receptionInfo.patientDescription+
              '  |  접수일 = '+data.receptionInfo.receivedDateTime+
              '  |  담당자정보 = '+(caregivingManager?.name || EMPTY_VALUE_TEXT)+
              '  |  협회명 = '+((caregivingManagerInfo?.organizationType === 'INTERNAL' && ORGANIZATION_TYPE['INTERNAL']) ||
                  caregivingManagerOrganization?.name || EMPTY_VALUE_TEXT)+
              '  |  간병인명 = '+data.caregiverName+
              '  |  간병인연락처 = '+data.caregiverPhoneNumber+
              '  |  간병인성별 = '+data.caregiverSex+
              '  |  간병인나이 = '+data.caregiverBirthDate
          }
      >
      <EllipsisText>{data.receptionInfo.insuranceNumber}</EllipsisText>
      </RTooltip>
      <RTooltip
          className={'tooltip-listItem'}
          message={'환자명='+data.receptionInfo.patientName+
              '  |  닉네임='+data.receptionInfo.patientNickName+
              '  |  나이='+data.receptionInfo.patientAge+
              '  |  성별='+data.receptionInfo.patientSex+
              '  |  연락처='+data.receptionInfo.patientPrimaryPhoneNumber+
              '  |  병원='+data.receptionInfo.hospitalAndRoom+
              '  |  환자상태='+data.receptionInfo.patientDescription+
              '  |  접수일='+data.receptionInfo.receivedDateTime+
              '  |  담당자정보 = '+(caregivingManager?.name || EMPTY_VALUE_TEXT)+
              '  |  협회명 = '+((caregivingManagerInfo?.organizationType === 'INTERNAL' && ORGANIZATION_TYPE['INTERNAL']) ||
              caregivingManagerOrganization?.name || EMPTY_VALUE_TEXT)+
              '  |  간병인명 = '+data.caregiverName+
              '  |  간병인연락처 = '+data.caregiverPhoneNumber+
              '  |  간병인성별 = '+data.caregiverSex+
              '  |  간병인나이 = '+data.caregiverBirthDate
          }
      >
      <EllipsisText>{data.receptionInfo.accidentNumber}</EllipsisText>
      </RTooltip>
      <RTooltip
          className={'tooltip-listItem'}
          message={'환자명='+data.receptionInfo.patientName+
              '  |  닉네임='+data.receptionInfo.patientNickName+
              '  |  나이='+data.receptionInfo.patientAge+
              '  |  성별='+data.receptionInfo.patientSex+
              '  |  연락처='+data.receptionInfo.patientPrimaryPhoneNumber+
              '  |  병원='+data.receptionInfo.hospitalAndRoom+
              '  |  환자상태='+data.receptionInfo.patientDescription+
              '  |  접수일='+data.receptionInfo.receivedDateTime+
              '  |  담당자정보 = '+(caregivingManager?.name || EMPTY_VALUE_TEXT)+
              '  |  협회명 = '+((caregivingManagerInfo?.organizationType === 'INTERNAL' && ORGANIZATION_TYPE['INTERNAL']) ||
                  caregivingManagerOrganization?.name || EMPTY_VALUE_TEXT)+
              '  |  간병인명 = '+data.caregiverName+
              '  |  간병인연락처 = '+data.caregiverPhoneNumber+
              '  |  간병인성별 = '+data.caregiverSex+
              '  |  간병인나이 = '+data.caregiverBirthDate
          }
      >
      <EllipsisText>{data.receptionInfo.patientName}</EllipsisText>
      </RTooltip>
      <ReceptionStatusChip
        status={data.receptionInfo.receptionProgressingStatus}
      />
      <EllipsisText>{data.caregivingRoundNumber}</EllipsisText>
      <EllipsisText>{data.caregiverName}</EllipsisText>
      <EllipsisText>
        {data.expectedCaregivingPeriod &&
          generatePeriodText(data.expectedCaregivingPeriod, true)}
      </EllipsisText>
      <CaregivingStatusChip status={data.caregivingProgressingStatus} />
      <SettlementStatusChip status={data.settlementProgressingStatus} />
      <BillingStatusChip status={data.billingProgressingStatus} />
      <EllipsisText>
        {(caregivingManagerInfo?.organizationType === 'INTERNAL' &&
          ORGANIZATION_TYPE['INTERNAL']) ||
          caregivingManagerOrganization?.name ||
          EMPTY_VALUE_TEXT}
      </EllipsisText>
      <EllipsisText>{caregivingManager?.name || EMPTY_VALUE_TEXT}</EllipsisText>
    </ListItem>
  )
}

export default SearchResultListItem
