import React, {ReactElement} from 'react'
import {Box, Button, InfoBox} from '@caredoc/ui-web'
import {sizes} from '@caredoc/ui-master'
import Card from '../../../../components/Card'
import ReceptionCaregivingRoundResource from '../../../../models/dto/reception-caregiving-round/Resource'
import {
  CAREGIVER_INSURED,
  CAREGIVING_ROUND_CLOSING_REASON_TYPE,
  ORGANIZATION_TYPE,
  SEX,
} from '../../../../constants'
import useExternalCaregivingOrganization from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import {
  formatPhoneNumberWithHyphen,
  formatStaticNumberWithComma,
} from '../../../../utils/formatter'
import {formatDate, formatDateTime} from '../../../../utils/date'
import {generatePeriodText} from '../../../../utils/text-transformation'
import {ReceptionProgressingStatus} from '../../../../types'
import SectionHeader from './SectionHeader'

interface IProps {
  data: ReceptionCaregivingRoundResource
  onClickCancelWhileRematching: () => void
  onClickComplete: () => void
  onClickCompleteAndRestart: () => void
  onClickEstimateCaregivingCharge: () => void
  onClickModify: () => void
  onClickPendingRematching: () => void
  onClickStart: () => void
  receptionProgressingStatus: ReceptionProgressingStatus
}

const CaregivingRoundInfoContent = (props: IProps): ReactElement => {
  const {
    data,
    onClickModify,
    onClickStart,
    onClickComplete,
    onClickCompleteAndRestart,
    onClickPendingRematching,
    onClickCancelWhileRematching,
    onClickEstimateCaregivingCharge,
    receptionProgressingStatus,
  } = props

  const externalCaregivingOrganizationData = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      data.caregiverInfo?.caregiverOrganizationId,
  })

  const isReceptionCanceled =
    receptionProgressingStatus === 'CANCELED' ||
    receptionProgressingStatus === 'CANCELED_BY_MEDICAL_REQUEST' ||
    receptionProgressingStatus === 'CANCELED_BY_PERSONAL_CAREGIVER' ||
    receptionProgressingStatus === 'CANCELED_WHILE_MATCHING'
  const isCaregivingRoundInRematchingProcess =
    data.caregivingProgressingStatus === 'REMATCHING' ||
    data.caregivingProgressingStatus === 'PENDING_REMATCHING'
  const isCaregivingRoundNeedStart =
    data.caregiverInfo &&
    (data.caregivingProgressingStatus === 'NOT_STARTED' ||
      data.caregivingProgressingStatus === 'REMATCHING')
  const isCaregivingRoundNeedComplete =
    data.caregivingProgressingStatus === 'CAREGIVING_IN_PROGRESS' ||
    data.caregivingProgressingStatus === 'COMPLETED_RESTARTING'
  const isCaregivingChargeNeedEstimation =
    (data.caregivingProgressingStatus === 'COMPLETED' ||
      data.caregivingProgressingStatus ===
        'COMPLETED_USING_PERSONAL_CAREGIVER') &&
    data.settlementProgressingStatus === 'NOT_STARTED'
  const isCaregivingRoundCanceled =
    data.caregivingProgressingStatus === 'CANCELED_WHILE_REMATCHING'

  return (
    <Box flexDirection="row" gap="xxl">
      <Box flex={1} gap="lg">
        {data.caregiverInfo && (
          <Box gap="sm">
            <SectionHeader>진행 정보</SectionHeader>
            {((data.startDateTime || isCaregivingRoundCanceled) && (
              <Card.RowGroup flex={1}>
                {isCaregivingRoundCanceled && (
                  <Card.Row>
                    <Box flex={1} flexDirection="row" gap="md">
                      <Card.Item title="취소일시">
                        {data.cancelDateTime &&
                          formatDateTime(data.cancelDateTime)}
                      </Card.Item>
                      <Card.Item title="취소 사유">
                        {data.caregivingRoundClosingReasonType &&
                          CAREGIVING_ROUND_CLOSING_REASON_TYPE[
                            data.caregivingRoundClosingReasonType
                          ]}
                      </Card.Item>
                    </Box>
                    <Card.Item title="사유 상세">
                      {data.caregivingRoundClosingReasonDetail}
                    </Card.Item>
                  </Card.Row>
                )}
                {data.startDateTime && (
                  <Card.Row>
                    <Card.RowGroup flex={1}>
                      <Card.Row>
                        <Card.Item title="시작일시">
                          {formatDateTime(data.startDateTime)}
                        </Card.Item>
                        <Card.Item title="종료일시">
                          {(data.endDateTime &&
                            formatDateTime(data.endDateTime)) || (
                            <InfoBox
                              size="sm"
                              state="warning"
                              style={{height: sizes.sm}}
                            >
                              해당 회차 간병이 종료되지 않았습니다.
                            </InfoBox>
                          )}
                        </Card.Item>
                        <Card.Item title="메모">{data.remarks}</Card.Item>
                      </Card.Row>
                      <Card.Row>
                        <Card.Item title="간병기간">
                          {data.expectedCaregivingPeriod &&
                            generatePeriodText(
                              data.expectedCaregivingPeriod,
                              true,
                            )}
                        </Card.Item>
                        <Card.Item title="실간병기간">
                          {data.caregivingPeriod &&
                            generatePeriodText(data.caregivingPeriod)}
                        </Card.Item>
                        <Card.Item title="정산예정일자">
                          {(data.expectedSettlementDate &&
                              formatDate(data.expectedSettlementDate)) || ("-"
                          )}
                        </Card.Item>
                      </Card.Row>
                    </Card.RowGroup>

                  </Card.Row>
                )}
              </Card.RowGroup>
            )) || (
              <InfoBox size="md" state="warning">
                아직 간병인이 간병을 시작하고 있지 않습니다.
              </InfoBox>
            )}
          </Box>
        )}
        <Box gap="sm">
          <SectionHeader>간병인 정보</SectionHeader>
          {(data.caregiverInfo && (
            <Card.RowGroup>
              <Card.Row>
                <Card.Item title="간병인 소속">
                  {(data.caregiverInfo &&
                    !data.caregiverInfo.caregiverOrganizationId &&
                    ORGANIZATION_TYPE.INTERNAL) ||
                    externalCaregivingOrganizationData?.name}
                </Card.Item>
                <Card.Item title="간병인명">
                  {data.caregiverInfo?.name}
                </Card.Item>
                <Card.Item title="성별">
                  {data.caregiverInfo && SEX[data.caregiverInfo.sex]}
                </Card.Item>
                <Card.Item title="생년월일">
                  {/*{`${data.caregiverInfo?.birthDate} (만 ${data.caregiverInfo?.age}세)`}*/}
                  {`${data.caregiverInfo?.birthDate}`}
                </Card.Item>
              </Card.Row>
              <Card.Row>
                <Card.Item title="연락처">
                  {data.caregiverInfo &&
                    formatPhoneNumberWithHyphen(data.caregiverInfo.phoneNumber)}
                </Card.Item>
                <Card.Item title="간병인 일당 (원)">
                  {data.caregiverInfo &&
                    formatStaticNumberWithComma(
                      data.caregiverInfo.dailyCaregivingCharge,
                    )}
                </Card.Item>
                <Card.Item title="수수료 (원)">
                  {data.caregiverInfo &&
                    formatStaticNumberWithComma(
                      data.caregiverInfo.commissionFee,
                    )}
                </Card.Item>
                <Card.Item title="책임보험 가입여부">
                  {data.caregiverInfo &&
                    CAREGIVER_INSURED[Number(data.caregiverInfo.insured)]}
                </Card.Item>
              </Card.Row>
              <Card.Row>
                <Card.Item title="은행명">
                  {data.caregiverInfo?.accountInfo.bank}
                </Card.Item>
                <Card.Item title="예금주">
                  {data.caregiverInfo?.accountInfo.accountHolder}
                </Card.Item>
                <Card.Item title="계좌번호">
                  {data.caregiverInfo?.accountInfo.accountNumber}
                </Card.Item>
                <Box flex={1} />
              </Card.Row>
            </Card.RowGroup>
          )) || (
            <InfoBox size="md" state="warning">
              간병인 매칭 정보를 등록해 주세요.
            </InfoBox>
          )}
        </Box>
      </Box>
      <Card.ButtonArea justifyContent="space-between">
        {!isCaregivingRoundCanceled && (
          <Button
            color="primary"
            onClick={onClickModify}
            variant={(data.caregiverInfo && 'secondary') || 'primary'}
          >
            {(data.caregiverInfo && '수정') || '등록'}
          </Button>
        )}
        {isCaregivingRoundNeedComplete && (
          <Box gap="xs">
            <Button color="primary" onClick={onClickComplete}>
              간병 종료
            </Button>
            {data.caregivingProgressingStatus === 'CAREGIVING_IN_PROGRESS' && (
              <Button
                color="primary"
                onClick={onClickCompleteAndRestart}
                variant="tertiary"
              >
                중단 (계속)
              </Button>
            )}
          </Box>
        )}
        {(isCaregivingRoundNeedStart ||
          isCaregivingRoundInRematchingProcess) && (
          <Box gap="xs">
            {!isReceptionCanceled && isCaregivingRoundNeedStart && (
              <Button color="primary" onClick={onClickStart}>
                시작일자 등록
              </Button>
            )}
            {isCaregivingRoundInRematchingProcess && (
              <>
                {data.caregivingProgressingStatus !== 'PENDING_REMATCHING' && (
                  <Button
                    color="warning"
                    onClick={onClickPendingRematching}
                    variant="tertiary"
                  >
                    리매칭 보류
                  </Button>
                )}
                <Button
                  color="negative"
                  onClick={onClickCancelWhileRematching}
                  variant="tertiary"
                >
                  리매칭 중 취소
                </Button>
              </>
            )}
          </Box>
        )}
        {isCaregivingChargeNeedEstimation && (
          <Button color="primary" onClick={onClickEstimateCaregivingCharge}>
            간병비 산정
          </Button>
        )}
      </Card.ButtonArea>
    </Box>
  )
}

export default CaregivingRoundInfoContent
