/* eslint-disable no-alert */
import {Box, Input, Radio, Typography} from '@caredoc/ui-web'
import React, {useMemo, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {sizes} from '@caredoc/ui-master'
import {useQueryClient} from '@tanstack/react-query'
import BillingTransactionInput from '../../models/dto/billing-transaction/Input'
import useBillingDetail from '../../hooks/api/billing/use-billing-detail'
import useReceptionDetail from '../../hooks/api/reception/use-reception-detail'
import useBillingTransactionCreate from '../../hooks/api/billing/use-billing-transaction-create'
import {BillingProgressingStatus, TransactionType} from '../../types'
import {BILLING_PROGRESSING_STATUS} from '../../constants'
import {getInternalCaregivingManagerIdFromToken} from '../../utils/manage-token'
import {formatStaticNumberWithComma} from '../../utils/formatter'
import TableInformationCell from '../table/TableInformationCell'
import Modal from '../Modal'
import Card from '../Card'
import AmountInput from '../inputs/AmountInput'

interface IProps {
  billingId: string
  fixedTransactionType?: TransactionType
  onClickClose: () => void
}

const BillingTransactionRegistrationModal = observer((props: IProps) => {
  const {billingId, onClickClose, fixedTransactionType} = props

  const [billingTransactionInput] = useState(
    () => new BillingTransactionInput({transactionType: fixedTransactionType}),
  )
  const {data: billingResource} = useBillingDetail({billingId})
  const {data: receptionResource} = useReceptionDetail({
    receptionId: billingResource?.receptionId,
  })
  const {mutate: createBillingTransaction} = useBillingTransactionCreate()

  const queryClient = useQueryClient()

  const nextTotalTransactionAmount = useMemo(() => {
    if (!billingResource) {
      return null
    }
    const minorOrPlus =
      (billingTransactionInput.transactionType === 'DEPOSIT' && 1) || -1

    return (
      billingResource.totalDepositWithdrawalAmount +
      minorOrPlus * billingTransactionInput.amountInNumber
    )
  }, [
    billingResource,
    billingTransactionInput.amountInNumber,
    billingTransactionInput.transactionType,
  ])

  const nextBillingProgressingStatus =
    useMemo<BillingProgressingStatus | null>(() => {
      if (!nextTotalTransactionAmount || !billingResource) {
        return null
      }
      if (nextTotalTransactionAmount === billingResource.totalAmount) {
        return 'COMPLETED_DEPOSIT'
      }
      if (nextTotalTransactionAmount < billingResource.totalAmount) {
        return 'UNDER_DEPOSIT'
      }
      return 'OVER_DEPOSIT'
    }, [billingResource, nextTotalTransactionAmount])

  const handleOnSubmit = (): void => {
    const createRequested =
      nextBillingProgressingStatus === 'OVER_DEPOSIT' ||
      nextBillingProgressingStatus === 'UNDER_DEPOSIT'
        ? confirm(
            `해당 청구 건이 ${BILLING_PROGRESSING_STATUS[nextBillingProgressingStatus]} 처리됩니다.\n 계속하시겠습니까?`,
          )
        : true
    const internalCaregivingManagerId =
      getInternalCaregivingManagerIdFromToken()

    if (!createRequested || !internalCaregivingManagerId) {
      return
    }

    billingTransactionInput.set(
      'transactionSubjectId',
      internalCaregivingManagerId,
    )

    createBillingTransaction(
      {
        pathParams: {billingId},
        payload: billingTransactionInput.input,
      },
      {
        onSuccess: () => {
          nextBillingProgressingStatus === 'COMPLETED_DEPOSIT' &&
            alert(
              `${BILLING_PROGRESSING_STATUS[nextBillingProgressingStatus]} 처리되었습니다.`,
            )
          queryClient.invalidateQueries({
            queryKey: ['billing', 'list'],
          })
          queryClient.invalidateQueries({
            queryKey: ['billing-transaction', 'list', {billingId}],
          })
          queryClient.invalidateQueries({
            queryKey: [
              'reception-billing',
              'list',
              {receptionId: receptionResource?.id},
            ],
          })

          onClickClose()
        },
      },
    )
  }

  return (
    <Modal
      closeIndicationType="button"
      disabled={
        billingTransactionInput.amountInNumber <= 0 ||
        !billingTransactionInput.transactionDate
      }
      modalWidth="sm"
      onClose={onClickClose}
      onSubmit={handleOnSubmit}
      title="입출금 내역 추가"
    >
      <Box gap="md">
        <Box flexDirection="row" gap="xxs">
          <TableInformationCell
            contents={billingResource?.accidentNumber}
            flex={1}
            title="사고번호"
          />
          <TableInformationCell
            contents={receptionResource?.patientInfo.name}
            flex={1}
            title="고객명"
          />
          <TableInformationCell
            contents={billingResource?.roundNumber}
            flex={1}
            title="청구차수"
          />
        </Box>
        <Box gap="xxs">
          <TableInformationCell
            contents={
              billingResource &&
              formatStaticNumberWithComma(billingResource.totalAmount)
            }
            flex={1}
            flexDirection="row"
            gap="xxs"
            title="청구 금액"
          />
          <TableInformationCell
            contents={
              billingResource &&
              formatStaticNumberWithComma(
                billingResource.totalDepositWithdrawalAmount,
              )
            }
            flex={1}
            flexDirection="row"
            gap="xxs"
            title="입출금총액"
          />
        </Box>
        <Card.Item title="입출금 구분">
          <Box
            alignItems="center"
            flexDirection="row"
            gap="xs"
            height={sizes.sm}
          >
            <Radio
              color="primary"
              disabled={fixedTransactionType === 'WITHDRAWAL'}
              onClick={
                fixedTransactionType === 'WITHDRAWAL'
                  ? undefined
                  : (): void =>
                      billingTransactionInput.set('transactionType', 'DEPOSIT')
              }
              value={billingTransactionInput.transactionType === 'DEPOSIT'}
            >
              <Typography
                textColor={
                  (fixedTransactionType === 'WITHDRAWAL' && 'fontTertiary') ||
                  'fontPrimary'
                }
                variant="body3"
              >
                입금
              </Typography>
            </Radio>
            <Radio
              color="primary"
              disabled={fixedTransactionType === 'DEPOSIT'}
              onClick={
                fixedTransactionType === 'WITHDRAWAL'
                  ? undefined
                  : (): void =>
                      billingTransactionInput.set(
                        'transactionType',
                        'WITHDRAWAL',
                      )
              }
              value={billingTransactionInput.transactionType === 'WITHDRAWAL'}
            >
              <Typography
                textColor={
                  (fixedTransactionType === 'DEPOSIT' && 'fontTertiary') ||
                  'fontPrimary'
                }
                variant="body3"
              >
                출금
              </Typography>
            </Radio>
          </Box>
        </Card.Item>
        <Card.Item title="금액">
          <AmountInput
            onChange={(value): void =>
              billingTransactionInput.set('amount', value)
            }
            value={billingTransactionInput.amount}
          />
        </Card.Item>
        <Card.Item title="입출금일자">
          <Input
            onTextChange={(value): void =>
              billingTransactionInput.set('transactionDate', value)
            }
            size="sm"
            type="date"
            value={billingTransactionInput.transactionDate}
          />
        </Card.Item>
      </Box>
    </Modal>
  )
})

export default BillingTransactionRegistrationModal
