/* eslint-disable unicorn/filename-case */
import {Box, Input, Radio, Typography} from '@caredoc/ui-web'
import React, {ReactElement, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {observer} from 'mobx-react-lite'
import Modal from '../Modal'
import ReceptionSettlementResource from '../../models/dto/reception-settlement/Resource'
import {formatStaticNumberWithComma} from '../../utils/formatter'
import Card from '../Card'
import AmountInput from '../inputs/AmountInput'
import TableInformationCell from '../table/TableInformationCell'
import SettlementTransactionCreateInput from '~models/dto/settlement-transaction/CreateInput'
import SettlementResource from '~models/dto/settlement/Resource'
import {
  getExternalCaregivingManagerIdFromToken,
  getInternalCaregivingManagerIdFromToken,
} from '~utils/manage-token'
import useSettlementTransactionCreate from '~hooks/api/settlement/use-settlement-transaction-create'

interface ISettlementTransactionRegistrationModalProps {
  onClickCloseButton: () => void
  settlementData: SettlementResource | ReceptionSettlementResource
}

const SettlementTransactionRegistrationModal = observer(
  (props: ISettlementTransactionRegistrationModalProps): ReactElement => {
    const {onClickCloseButton, settlementData} = props

    const [input] = useState(() => new SettlementTransactionCreateInput())

    const {mutate: registerSettlementTransaction} =
      useSettlementTransactionCreate({
        settlementId: settlementData.id,
      })

    const queryClient = useQueryClient()

    const handleOnSubmit = (): void => {
      const managerId =
        getInternalCaregivingManagerIdFromToken() ||
        getExternalCaregivingManagerIdFromToken()

      if (!managerId) {
        return
      }

      input.set('transactionSubjectId', managerId)

      registerSettlementTransaction(
        {
          payload: input.input,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['reception-settlement', 'list'],
            })
            queryClient.invalidateQueries({
              queryKey: [
                'settlement',
                'list',
                {progressingStatus: 'COMPLETED'},
              ],
            })
            queryClient.invalidateQueries({
              queryKey: [
                'settlement-transaction',
                'list',
                {settlementId: settlementData.id},
              ],
            })

            onClickCloseButton()
          },
        },
      )
    }

    return (
      <Modal
        closeIndicationType="button"
        disabled={Number(input.amount) <= 0 || !input.transactionDate}
        modalWidth="sm"
        onClose={onClickCloseButton}
        onSubmit={handleOnSubmit}
        title="입출금 내역 추가"
      >
        <Box gap="md">
          {/** table 1 */}
          <Box flexDirection="row" gap="xxs">
            <TableInformationCell
              contents={settlementData.accidentNumber}
              flex={1}
              title="사고번호"
            />
            <TableInformationCell
              contents={settlementData.patientName}
              flex={1}
              title="고객명"
            />
            <TableInformationCell
              contents={settlementData.caregivingRoundNumber}
              flex={1}
              title="간병차수"
            />
          </Box>
          {/** table 2 */}
          <TableInformationCell
            contents={formatStaticNumberWithComma(settlementData.totalAmount)}
            flexDirection="row"
            title="정산 금액"
          />
          {/** input */}
          <Card.Item title="입출금 구분">
            <Box alignItems="center" flexDirection="row" gap="xs">
              <Radio
                color="primary"
                onClick={(): void => input.set('transactionType', 'DEPOSIT')}
                value={input.transactionType === 'DEPOSIT'}
              >
                <Typography variant="body3">입금</Typography>
              </Radio>
              <Radio
                color="primary"
                onClick={(): void => input.set('transactionType', 'WITHDRAWAL')}
                value={input.transactionType === 'WITHDRAWAL'}
              >
                <Typography variant="body3">출금</Typography>
              </Radio>
            </Box>
          </Card.Item>
          <Card.Item title="금액">
            <AmountInput
              onChange={(value): void => input.set('amount', value)}
              value={input.amount}
            />
          </Card.Item>
          <Card.Item title="입출금일자">
            <Input
              onTextChange={(value): void =>
                input.set('transactionDate', value)
              }
              type="date"
              value={input.transactionDate}
            />
          </Card.Item>
        </Box>
      </Modal>
    )
  },
)

export default SettlementTransactionRegistrationModal
