import React, {ReactElement} from 'react'
import {Box, Button} from '@caredoc/ui-web'
import {useModalStore} from '@caredoc/utils-web'
import Card from '../../../components/Card'
import ReceptionSettlementResource from '../../../models/dto/reception-settlement/Resource'
import SettlementStatusChip from '../../../components/chips/SettlementStatusChip'
import {formatStaticNumberWithComma} from '../../../utils/formatter'
import {ReceptionSettlementsModalType} from '../../../types'
import {formatDate, formatDateTime} from '../../../utils/date'
import useInternalCaregivingManagerDetail from '../../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import useExternalCaregivingManagerDetail from '../../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-detail'
import SettlementTransactionListModal from '../../../components/settlement-transaction/SettlementTransactionListModal'
import SettlementTransactionRegistrationModal from '../../../components/settlement-transaction/SettlementTransactionRegistrationModal'
import CaregivingChargeEstimateModal from '../../../components/CaregivingChargeEstimateModal'
import {isUnauthorized} from '../../../utils/fetcher'
import {NOT_EXPOSED_TEXT} from '../../../constants'
import CaregivingChargeInfoModal from './modals/CaregivingChargeInfoModal'
import CaregivingChargeConfirmButton from './CaregivingChargeConfirmButton'

interface IProps {
  data: ReceptionSettlementResource
}

const SettlementRoundInfo = (props: IProps): ReactElement => {
  const {data} = props

  const modalStore = useModalStore<ReceptionSettlementsModalType>()

  const {
    data: internalSettlementManager,
    error: internalSettlementManagerError,
  } = useInternalCaregivingManagerDetail({
    internalCaregivingManagerId: data.settlementManagerId,
  })
  const externalSettlementManager = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId: data.settlementManagerId,
  })

  const settlementManager =
    internalSettlementManager || externalSettlementManager

  const handleOnClickCaregivingChargeEstimate = (): void => {
    modalStore.create(
      'CAREGIVING_CHARGE_ESTIMATE',
      <CaregivingChargeEstimateModal
        caregivingRoundId={data.caregivingRoundId}
        onClickClose={(): void =>
          modalStore.delete('CAREGIVING_CHARGE_ESTIMATE')
        }
      />,
    )
  }

  const handleOnClickCaregivingChargeDetail = (): void => {
    modalStore.create(
      'CAREGIVING_CHARGE_INFO',
      <CaregivingChargeInfoModal
        caregivingRoundId={data.caregivingRoundId}
        onClickCloseButton={(): void =>
          modalStore.delete('CAREGIVING_CHARGE_INFO')
        }
      />,
    )
  }

  const handleOnClickSettlementTransactionList = (): void => {
    modalStore.create(
      'SETTLEMENT_TRANSACTION_LIST',
      <SettlementTransactionListModal
        onClickCloseButton={(): void =>
          modalStore.delete('SETTLEMENT_TRANSACTION_LIST')
        }
        settlementData={data}
      />,
    )
  }

  const handleOnClickSettlementTransactionCreate = (): void => {
    modalStore.create(
      'SETTLEMENT_TRANSACTION_REGISTRATION',
      <SettlementTransactionRegistrationModal
        onClickCloseButton={(): void =>
          modalStore.delete('SETTLEMENT_TRANSACTION_REGISTRATION')
        }
        settlementData={data}
      />,
    )
  }

  return (
    <Card>
      <Card.Header
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
        leftSide={<SettlementStatusChip status={data.progressingStatus} />}
        rightSide={
          <Button
            color="primary"
            disabled={data.progressingStatus !== 'CONFIRMED'}
            onClick={handleOnClickCaregivingChargeEstimate}
            size="xs"
            variant="secondary"
          >
            간병비 산정금액 수정
          </Button>
        }
        title={`${data.caregivingRoundNumber}회차`}
      />
      <Card.Body borderBottomLeftRadius="md" borderBottomRightRadius="md">
        <Box flexDirection="row" gap="xxl">
          <Card.RowGroup flex={1}>
            <Card.Row>
              <Card.Item title="간병인 일당">
                {formatStaticNumberWithComma(data.dailyCaregivingCharge)}
              </Card.Item>
              <Card.Item title="기본 간병비">
                {formatStaticNumberWithComma(data.basicAmount)}
              </Card.Item>
              <Card.Item title="추가금액">
                {formatStaticNumberWithComma(data.additionalAmount)}
              </Card.Item>
              <Card.Item
                subButton={{
                  onClick: handleOnClickCaregivingChargeDetail,
                  text: '상세',
                }}
                title="산정금액"
              >
                {formatStaticNumberWithComma(data.totalAmount)}
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Card.Item title="간병비 산정일자">
                {formatDate(data.lastCalculationDateTime)}
              </Card.Item>
              <Card.Item title="정산 예정일자">
                {formatDate(data.expectedSettlementDate)}
              </Card.Item>
              <Card.Item title="정산 완료일시">
                {data.settlementCompletionDateTime &&
                  formatDateTime(data.settlementCompletionDateTime)}
              </Card.Item>
              <Card.Item title="정산 담당자">
                {isUnauthorized(internalSettlementManagerError)
                  ? NOT_EXPOSED_TEXT
                  : settlementManager?.name}
              </Card.Item>
            </Card.Row>
          </Card.RowGroup>
          <Card.ButtonArea gap="xs">
            {data.progressingStatus === 'CONFIRMED' && (
              <CaregivingChargeConfirmButton
                caregivingRoundId={data.caregivingRoundId}
              />
            )}
            {data.progressingStatus === 'COMPLETED' && (
              <>
                <Button
                  color="primary"
                  onClick={handleOnClickSettlementTransactionCreate}
                >
                  입출금 내역 추가
                </Button>
                <Button
                  color="primary"
                  onClick={handleOnClickSettlementTransactionList}
                  variant="tertiary"
                >
                  입출금 내역
                </Button>
              </>
            )}
          </Card.ButtonArea>
        </Box>
      </Card.Body>
    </Card>
  )
}

export default SettlementRoundInfo
