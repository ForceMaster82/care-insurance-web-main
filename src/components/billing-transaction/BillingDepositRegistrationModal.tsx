/* eslint-disable no-alert */
import {Box, Input} from '@caredoc/ui-web'
import React, {useMemo, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useQueryClient} from '@tanstack/react-query'
import BillingTransactionInput from '../../models/dto/billing-transaction/Input'
import useBillingDetail from '../../hooks/api/billing/use-billing-detail'
import useReceptionDetail from '../../hooks/api/reception/use-reception-detail'
import useBillingTransactionCreate from '../../hooks/api/billing/use-billing-transaction-create'
import {BillingProgressingStatus} from '../../types'
import {BILLING_PROGRESSING_STATUS} from '../../constants'
import {getInternalCaregivingManagerIdFromToken} from '../../utils/manage-token'
import {formatStaticNumberWithComma} from '../../utils/formatter'
import TableInformationCell from '../table/TableInformationCell'
import Modal from '../Modal'
import Card from '../Card'
import AmountInput from '../inputs/AmountInput'

interface IProps {
  billingId: string
  onClickClose: () => void
}

const BillingDepositRegistrationModal = observer((props: IProps) => {
  const {billingId, onClickClose} = props

  const [billingTransactionInput] = useState(
    () =>
      new BillingTransactionInput({
        transactionType: 'DEPOSIT',
      }),
  )

  const {data: billingResource} = useBillingDetail({
    billingId,
    onSuccess: (data) => {
      billingTransactionInput.set(
        'amount',
        formatStaticNumberWithComma(data.totalAmount),
      )
    },
  })
  const {data: receptionResource} = useReceptionDetail({
    receptionId: billingResource?.receptionId,
  })
  const {mutate: createBillingTransaction} = useBillingTransactionCreate()

  const queryClient = useQueryClient()

  const nextTotalTransactionAmount = useMemo(() => {
    if (!billingResource) {
      return null
    }

    return (
      billingResource.totalDepositWithdrawalAmount +
      billingTransactionInput.amountInNumber
    )
  }, [billingResource, billingTransactionInput.amountInNumber])

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
    if (!nextBillingProgressingStatus) {
      return
    }

    const createRequested = confirm(
      `${BILLING_PROGRESSING_STATUS[nextBillingProgressingStatus]} 처리하시겠습니까?`,
    )
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
          alert('완료되었습니다.')

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
      title="입금 등록"
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
        <TableInformationCell
          contents={
            billingResource &&
            formatStaticNumberWithComma(billingResource.totalAmount)
          }
          flexDirection="row"
          gap="xxs"
          title="청구 금액"
        />
        <Card.Item title="입금액">
          <AmountInput
            onChange={(value): void =>
              billingTransactionInput.set('amount', value)
            }
            value={billingTransactionInput.amount}
          />
        </Card.Item>
        <Card.Item title="입금일자">
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

export default BillingDepositRegistrationModal
