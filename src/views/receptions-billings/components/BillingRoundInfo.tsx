import React, {ReactElement} from 'react'
import {Box, Button} from '@caredoc/ui-web'
import {useModalStore} from '@caredoc/utils-web'
import Card from '../../../components/Card'
import ReceptionBillingResource from '../../../models/dto/reception-billing/Resource'
import BillingStatusChip from '../../../components/chips/BillingStatusChip'

import useReceptionDetail from '../../../hooks/api/reception/use-reception-detail'
import useCaregivingRoundInfo from '../../../hooks/api/caregiving-round/use-caregiving-round-info'
import {
  generateHospitalRoomInfoText,
  generatePeriodText,
} from '../../../utils/text-transformation'
import {
  formatPhoneNumberWithHyphen,
  formatStaticNumberWithComma,
} from '../../../utils/formatter'
import {CAREGIVING_PROGRESSING_STATUS} from '../../../constants'
import {formatDateTime} from '../../../utils/date'
import {ReceptionBillingsModalType} from '../../../types'
import BillingTransactionRegistrationModal from '../../../components/billing-transaction/BillingTransactionRegistrationModal'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'
import BillingDepositRegistrationModal from '../../../components/billing-transaction/BillingDepositRegistrationModal'
import BillingTransactionListModal from '../../../components/billing-transaction/BillingTransactionListModal'

interface IProps {
  data: ReceptionBillingResource
  receptionId: string
}

const BillingRoundInfo = (props: IProps): ReactElement => {
  const {data: billingData, receptionId} = props

  const {data: receptionData} = useReceptionDetail({
    receptionId,
    suspense: true,
  })
  const caregivingRoundData = useCaregivingRoundInfo({
    caregivingRoundId: billingData.caregivingRoundId,
  })

  const modalStore = useModalStore<ReceptionBillingsModalType>()

  const isInternalManager = Boolean(getInternalCaregivingManagerIdFromToken())

  const handleOnClickBillingTransactionList = (): void => {
    modalStore.create(
      'BILLING_TRANSACTION_LIST',
      <BillingTransactionListModal
        billingId={billingData.id}
        onClickClose={(): void => modalStore.delete('BILLING_TRANSACTION_LIST')}
      />,
    )
  }

  const handleOnClickBillingTransactionRegistration = (): void => {
    modalStore.create(
      'BILLING_TRANSACTION_REGISTRATION',
      <BillingTransactionRegistrationModal
        billingId={billingData.id}
        onClickClose={(): void =>
          modalStore.delete('BILLING_TRANSACTION_REGISTRATION')
        }
      />,
    )
  }

  const handleOnClickBillingDepositRegistration = (): void => {
    modalStore.create(
      'BILLING_DEPOSIT_REGISTRATION',
      <BillingDepositRegistrationModal
        billingId={billingData.id}
        onClickClose={(): void =>
          modalStore.delete('BILLING_DEPOSIT_REGISTRATION')
        }
      />,
    )
  }

  return (
    <Card>
      <Card.Header
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
        leftSide={
          <BillingStatusChip status={billingData.billingProgressingStatus} />
        }
        title={`${billingData.caregivingRoundNumber}회차`}
      />
      <Card.Body borderBottomLeftRadius="md" borderBottomRightRadius="md">
        <Box flexDirection="row" gap="xxl">
          <Card.RowGroup flex={1}>
            <Card.Row>
              <Card.Item title="병원명">
                {receptionData &&
                  generateHospitalRoomInfoText(
                    receptionData.accidentInfo.hospitalRoomInfo,
                  )}
              </Card.Item>
              <Card.Item title="간병인명">
                {caregivingRoundData?.caregiverInfo.name}
              </Card.Item>
              <Card.Item title="간병인 생년월일">
                {caregivingRoundData?.caregiverInfo.birthDate}
              </Card.Item>
              <Card.Item title="간병인 연락처">
                {caregivingRoundData &&
                  formatPhoneNumberWithHyphen(
                    caregivingRoundData.caregiverInfo.phoneNumber,
                  )}
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Card.Item title="실사용기간">
                {generatePeriodText(billingData.caregivingPeriod)}
              </Card.Item>
              <Card.Item title="기본금액">
                {formatStaticNumberWithComma(billingData.basicAmount)}
              </Card.Item>
              <Card.Item title="추가금액">
                {formatStaticNumberWithComma(billingData.additionalAmount)}
              </Card.Item>
              <Card.Item title="청구금액">
                {formatStaticNumberWithComma(billingData.totalAmount)}
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Card.Item title="사용기간">
                {`${formatDateTime(
                  billingData.startDateTime,
                )} ~ ${formatDateTime(billingData.endDateTime)}`}
              </Card.Item>
              <Box flex={1} flexDirection="row" gap="md">
                <Card.Item title="간병 상태">
                  {caregivingRoundData &&
                    CAREGIVING_PROGRESSING_STATUS[
                      caregivingRoundData.caregivingProgressingStatus
                    ]}
                </Card.Item>
                <Card.Item title="계속 사용 여부">
                  {(caregivingRoundData?.isCaregivingRoundContinue === true &&
                    '사용') ||
                    (caregivingRoundData?.isCaregivingRoundContinue === false &&
                      '사용 안함')}
                </Card.Item>
              </Box>
            </Card.Row>
          </Card.RowGroup>
          <Card.ButtonArea gap="xs">
            {isInternalManager && (
              <>
                {billingData.billingProgressingStatus === 'WAITING_DEPOSIT' && (
                  <Button
                    color="primary"
                    onClick={handleOnClickBillingDepositRegistration}
                  >
                    입금 처리
                  </Button>
                )}
                {billingData.billingProgressingStatus !== 'WAITING_DEPOSIT' && (
                  <>
                    <Button
                      color="primary"
                      onClick={handleOnClickBillingTransactionRegistration}
                    >
                      입출금 내역 추가
                    </Button>
                    <Button
                      color="primary"
                      onClick={handleOnClickBillingTransactionList}
                      variant="tertiary"
                    >
                      입출금 내역
                    </Button>
                  </>
                )}
              </>
            )}
          </Card.ButtonArea>
        </Box>
      </Card.Body>
    </Card>
  )
}

export default BillingRoundInfo
