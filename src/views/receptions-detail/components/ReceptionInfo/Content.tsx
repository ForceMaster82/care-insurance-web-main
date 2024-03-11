/* eslint-disable no-console */
import {Box, Button, InfoBox} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import {isAfter} from 'date-fns'
import {QueryObserverResult} from '@tanstack/react-query'
import {sizes} from '@caredoc/ui-master'
import ReceptionResource from '../../../../models/dto/reception/Resource'
import Card from '../../../../components/Card'
import {
  CLAIM_TYPE,
  INSURANCE_COMPANY,
  NOT_EXPOSED_TEXT,
  NOTIFY_CAREGIVING_PROGRESS,
  RECEPTION_CANCELLATION_REASON,
  SEX,
} from '../../../../constants'
import {formatDate, formatDateTime} from '../../../../utils/date'
import useInternalCaregivingManagerDetail from '../../../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import {formatPatientContactInfo} from '../../../../utils/formatter'
import useCoverageDetail from '../../../../hooks/api/coverage/use-coverage-detail'
import {
  generateCaregivingManagerInfoText,
  generateHospitalRoomInfoText,
} from '../../../../utils/text-transformation'
import useExternalCaregivingManagerDetail from '../../../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-detail'
import useExternalCaregivingOrganization from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import {ReceptionDetailModalType} from '../../../../types'
import InsuranceManagerInfoModal from '../modals/InsuranceManagerInfoModal'
import SmsScriptForCaregiverModal from '../modals/SmsScriptForCaregiverModal'
import SmsScriptForPersonalCaregiverBillingModal from '../modals/SmsScriptForPersonalCaregiverBillingModal'
import SmsScriptForPersonalCaregiverApprovalModal from '../modals/SmsScriptForPersonalCaregiverApprovalModal'
import CoverageDetailModal from '../../../../components/CoverageDetailModal'
import {getExpiredAt} from '../../../../utils/s3-presigned-url'
import {IReceptionApplication} from '../../../../types/dto'
import {isUnauthorized} from '../../../../utils/fetcher'

interface IProps {
  applicationFile?: IReceptionApplication | null
  data: ReceptionResource
  onClickCancel: () => void
  onClickCancelWhileMatching: () => void
  onClickCaregivingManagerAssign: () => void
  onClickModify: () => void
  onClickPending: () => void
  onClickPendingMatcing: () => void
  refetchApplicationFile: () => Promise<
    QueryObserverResult<IReceptionApplication>
  >
}

const ReceptionInfoContent = (props: IProps): ReactElement => {
  const {
    data,
    onClickModify,
    onClickPending,
    onClickPendingMatcing,
    onClickCancel,
    onClickCancelWhileMatching,
    onClickCaregivingManagerAssign,
    applicationFile,
    refetchApplicationFile,
  } = props

  const modalStore = useModalStore<ReceptionDetailModalType>()

  const {data: registerManagerData, error: registerManagerError} =
    useInternalCaregivingManagerDetail({
      internalCaregivingManagerId: data.registerManagerInfo.managingUserId,
    })
  const coverageData = useCoverageDetail({
    coverageId: data.insuranceInfo.coverageId,
  })
  const {data: internalCaregivingManagerData} =
    useInternalCaregivingManagerDetail({
      internalCaregivingManagerId: data.caregivingManagerInfo?.managingUserId,
    })
  const externalCaregivingManagerData = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId: data.caregivingManagerInfo?.managingUserId,
  })
  const externalCaregivingOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      data.caregivingManagerInfo?.organizationType !== 'INTERNAL'
        ? data.caregivingManagerInfo?.organizationId
        : null,
  })
  const caregivingManagerData =
    internalCaregivingManagerData || externalCaregivingManagerData

  const isReceptionCanceled =
    data.progressingStatus === 'CANCELED' ||
    data.progressingStatus === 'CANCELED_BY_MEDICAL_REQUEST' ||
    data.progressingStatus === 'CANCELED_BY_PERSONAL_CAREGIVER' ||
    data.progressingStatus === 'CANCELED_WHILE_MATCHING'
  const isReceptionInReceivedProcess =
    data.progressingStatus === 'RECEIVED' ||
    data.progressingStatus === 'PENDING'
  const isReceptionInMatchingProcess =
    data.progressingStatus === 'MATCHING' ||
    data.progressingStatus === 'PENDING_MATCHING'

  const handleOnClickInsuranceCompanyDetail = (): void => {
    modalStore.create(
      'INSURANCE_MANAGER_INFO',
      <InsuranceManagerInfoModal
        onClickClose={(): void => modalStore.delete('INSURANCE_MANAGER_INFO')}
        receptionResource={data}
      />,
    )
  }

  const handleOnClickSmsScript = (): void => {
    modalStore.create(
      'SMS_SCRIPT_FOR_CAREGIVER',
      <SmsScriptForCaregiverModal
        onClickClose={(): void => modalStore.delete('SMS_SCRIPT_FOR_CAREGIVER')}
        receptionId={data.id}
      />,
    )
  }

  const handleOnClickSmsScriptForPersonalCaregiverBilling = (): void => {
    modalStore.create(
      'SMS_SCRIPT_FOR_PERSONAL_CAREGIVER_BILLING',
      <SmsScriptForPersonalCaregiverBillingModal
        onClickClose={(): void =>
          modalStore.delete('SMS_SCRIPT_FOR_PERSONAL_CAREGIVER_BILLING')
        }
        receptionId={data.id}
      />,
    )
  }

  const handleOnClickSmsScriptForPersonalCaregiverApproval = (): void => {
    modalStore.create(
      'SMS_SCRIPT_FOR_PERSONAL_CAREGIVER_APPROVAL',
      <SmsScriptForPersonalCaregiverApprovalModal
        onClickClose={(): void =>
          modalStore.delete('SMS_SCRIPT_FOR_PERSONAL_CAREGIVER_APPROVAL')
        }
        receptionId={data.id}
      />,
    )
  }

  const handleOnClickCoverageDetail = (): void => {
    modalStore.create(
      'COVERAGE_DETAIL',
      <CoverageDetailModal
        coverageId={data.insuranceInfo.coverageId}
        onClickClose={(): void => modalStore.delete('COVERAGE_DETAIL')}
      />,
    )
  }

  const handleOnClickApplicationDownload = async (): Promise<void> => {
    if (!applicationFile) {
      return
    }

    let applicationFileUrl = applicationFile.url
    const applicationFileUrlExpiredAt = getExpiredAt(
      new URL(applicationFileUrl),
    )

    if (
      applicationFileUrlExpiredAt &&
      isAfter(Date.now(), applicationFileUrlExpiredAt)
    ) {
      const {data: updatedApplicationFile} = await refetchApplicationFile()
      updatedApplicationFile &&
        (applicationFileUrl = updatedApplicationFile.url)
    }

    const link = document.createElement('a')
    link.href = applicationFileUrl
    link.click()
  }

  return (
    <Box flexDirection="row" gap="xxl">
      <Card.RowGroup flex={1}>
        {isReceptionCanceled && (
          <>
            <Card.Row>
              <Box flex={1} flexDirection="row" gap="md">
                <Card.Item title="취소일시">
                  {data.canceledDateTime &&
                    formatDateTime(data.canceledDateTime)}
                </Card.Item>
                <Card.Item title="취소 사유">
                  {RECEPTION_CANCELLATION_REASON[data.progressingStatus]}
                </Card.Item>
              </Box>
              <Card.Item flex={1} title="사유 상세">
                {data.reasonForCancellation}
              </Card.Item>
            </Card.Row>
            <Card.Divider />
          </>
        )}

        <Card.RowGroup>
          <Card.Row>
            <Card.Item
              subButton={{
                onClick: handleOnClickInsuranceCompanyDetail,
                text: '상세',
              }}
              title="보험사명"
            >
              {INSURANCE_COMPANY}
            </Card.Item>
            <Card.Item title="사고일시">
              {formatDateTime(data.accidentInfo.accidentDateTime)}
            </Card.Item>
            <Card.Item title="접수 등록일자">
              {formatDate(data.receivedDateTime)}
            </Card.Item>
            <Card.Item title="등록 담당자">
              {isUnauthorized(registerManagerError)
                ? NOT_EXPOSED_TEXT
                : registerManagerData?.name}
            </Card.Item>
          </Card.Row>
          <Card.Row>
            <Card.Item title="사고번호">
              {data.accidentInfo.accidentNumber}
            </Card.Item>
            <Card.Item title="증권번호">
              {data.insuranceInfo.insuranceNumber}
            </Card.Item>
            <Card.Item title="고객명">{data.patientInfo.name}</Card.Item>
            <Card.Item title="닉네임">{data.patientInfo.nickname}</Card.Item>
          </Card.Row>
          <Card.Row>
            <Card.Item title="만 나이 (세)">{data.patientInfo.age}</Card.Item>
            <Card.Item title="성별">{SEX[data.patientInfo.sex]}</Card.Item>
            <Card.Item title="연락처 I">
              {formatPatientContactInfo(data.patientInfo.primaryContact)}
            </Card.Item>
            <Card.Item title="연락처 II">
              {data.patientInfo.secondaryContact &&
                formatPatientContactInfo(data.patientInfo.secondaryContact)}
            </Card.Item>
          </Card.Row>
          <Card.Row>
            <Card.Item title="청구유형">
              {CLAIM_TYPE[data.accidentInfo.claimType]}
            </Card.Item>
            <Card.Item title="청약일자">
              {formatDate(data.insuranceInfo.subscriptionDate)}
            </Card.Item>
            <Card.Item
              subButton={{
                onClick: handleOnClickCoverageDetail,
                text: '상세',
              }}
              title="가입담보"
            >
              {coverageData?.name}
            </Card.Item>
            <Card.Item title="한도일">
              {data.insuranceInfo.caregivingLimitPeriod}
            </Card.Item>
          </Card.Row>
          <Card.Row>
            <Box flex={1} flexDirection="row" gap="md">
              <Card.Item title="예상 한도일자">
                {formatDate(data.expectedCaregivingLimitDate)}
              </Card.Item>
              <Card.Item title="알림톡/비즈콜 수신">
                {
                  NOTIFY_CAREGIVING_PROGRESS[
                    Number(data.notifyCaregivingProgress)
                  ]
                }
              </Card.Item>
            </Box>
            <Card.Item
              flex={1}
              subButton={
                (applicationFile && {
                  onClick: handleOnClickApplicationDownload,
                  text: '다운로드',
                }) ||
                undefined
              }
              title="간병인 신청서"
            >
              {applicationFile?.fileName}
            </Card.Item>
          </Card.Row>
        </Card.RowGroup>
        <Card.Divider />

        <Card.RowGroup>
          <Card.Row>
            <Card.Item title="입원일시">
              {formatDateTime(data.accidentInfo.admissionDateTime)}
            </Card.Item>
            <Card.Item title="병실정보">
              {generateHospitalRoomInfoText(data.accidentInfo.hospitalRoomInfo)}
            </Card.Item>
            <Card.Item title="희망일자">
              {formatDate(data.desiredCaregivingStartDate)}
            </Card.Item>
            <Card.Item title="희망기간 (일)">
              {(typeof data.desiredCaregivingPeriod === 'string' &&
                data.desiredCaregivingPeriod) ||
                '미정'}
            </Card.Item>
          </Card.Row>
          <Card.Row>
            <Card.Item title="환자상태">
              {data.accidentInfo.patientDescription}
            </Card.Item>
            <Card.Item fixedHeight={false} title="요청사항">
              {data.additionalRequest}
            </Card.Item>
          </Card.Row>
        </Card.RowGroup>
        <Card.Divider />

        <Card.Row>
          <Box flex={1} flexDirection="row" gap="md">
            <Card.Item title="키 (cm)">{data.patientInfo.height}</Card.Item>
            <Card.Item title="몸무게 (kg)">{data.patientInfo.weight}</Card.Item>
          </Box>
          <Card.Item flex={1} title="배정 담당자">
            {(data.caregivingManagerInfo &&
              caregivingManagerData &&
              generateCaregivingManagerInfoText(
                data.caregivingManagerInfo.organizationType,
                caregivingManagerData,
                externalCaregivingOrganization,
              )) || (
              <InfoBox size="sm" state="warning" style={{height: sizes.sm}}>
                담당자 배정을 진행해 주세요.
              </InfoBox>
            )}
          </Card.Item>
        </Card.Row>
      </Card.RowGroup>
      <Card.ButtonArea justifyContent="space-between">
        <Box>
          {!isReceptionCanceled && (
            <Button color="primary" onClick={onClickModify} variant="secondary">
              수정
            </Button>
          )}
        </Box>
        <Box gap="xs">
          {data.caregivingManagerInfo && (
            <Button
              color="primary"
              onClick={handleOnClickSmsScript}
              variant="tertiary"
            >
              SMS 스크립트
            </Button>
          )}
          {(data.progressingStatus === 'CANCELED_BY_MEDICAL_REQUEST' ||
            data.progressingStatus === 'CANCELED_BY_PERSONAL_CAREGIVER') && (
            <>
              <Button
                color="primary"
                onClick={handleOnClickSmsScriptForPersonalCaregiverBilling}
                variant="tertiary"
              >
                {'고객 발송\n스크립트'}
              </Button>
              <Button
                color="primary"
                onClick={handleOnClickSmsScriptForPersonalCaregiverApproval}
                variant="tertiary"
              >
                {'보험사 발송\n스크립트'}
              </Button>
            </>
          )}
          {isReceptionInMatchingProcess && (
            <>
              {data.progressingStatus !== 'PENDING_MATCHING' && (
                <Button
                  color="warning"
                  onClick={onClickPendingMatcing}
                  variant="tertiary"
                >
                  매칭 보류
                </Button>
              )}
              <Button
                color="negative"
                onClick={onClickCancelWhileMatching}
                variant="tertiary"
              >
                매칭 중 취소
              </Button>
            </>
          )}
          {isReceptionInReceivedProcess && (
            <>
              {!data.caregivingManagerInfo && (
                <Button
                  color="primary"
                  onClick={onClickCaregivingManagerAssign}
                >
                  담당자 배정
                </Button>
              )}
              {data.progressingStatus !== 'PENDING' && (
                <Button
                  color="warning"
                  onClick={onClickPending}
                  variant="tertiary"
                >
                  접수 보류
                </Button>
              )}
              <Button
                color="negative"
                onClick={onClickCancel}
                variant="tertiary"
              >
                접수 취소
              </Button>
            </>
          )}
        </Box>
      </Card.ButtonArea>
    </Box>
  )
}

export default ReceptionInfoContent
