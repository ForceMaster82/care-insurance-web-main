/* eslint-disable unicorn/filename-case */
import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import Modal from '../../../components/Modal'
import useBillingDetail from '../../../hooks/api/billing/use-billing-detail'
import Td from '../../../components/table/Td'
import {formatDate, formatDateTime} from '../../../utils/date'
import Th from '../../../components/table/Th'
import useReceptionDetail from '../../../hooks/api/reception/use-reception-detail'
import useCoverageDetail from '../../../hooks/api/coverage/use-coverage-detail'
import {formatStaticNumberWithComma} from '../../../utils/formatter'
import EmptySearchResult from '../../../components/EmptySearchResult'

interface IProps {
  billingId: string
  onClickClose: () => void
  receptionId: string
}

const BillingAmountDetailModal = (props: IProps): ReactElement | null => {
  const {onClickClose, billingId, receptionId} = props

  const {data: billingData} = useBillingDetail({billingId})
  const {data: receptionData} = useReceptionDetail({receptionId})
  const coverageData = useCoverageDetail({
    coverageId: receptionData?.insuranceInfo.coverageId,
  })

  if (!billingData) {
    return null
  }

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="xl"
      onClose={onClickClose}
      title="청구 금액 상세"
    >
      <Box gap="md">
        {/** table 1 */}
        <Box gap="xxs">
          <Box flexDirection="row" gap="xxs">
            <Th flex={2}>사고번호</Th>
            <Th flex={2}>가입담보</Th>
            <Th flex={1}>청약일자</Th>
            <Th flex={1}>청구차수</Th>
            <Th flex={3}>사용기간</Th>
            <Th flex={1}>실사용기간</Th>
          </Box>
          <Box flexDirection="row" gap="xxs">
            <Td flex={2}>{billingData.accidentNumber}</Td>
            <Td flex={2}>{coverageData?.name}</Td>
            <Td flex={1}>
              {receptionData &&
                formatDate(receptionData.insuranceInfo.subscriptionDate)}
            </Td>
            <Td flex={1}>{billingData.roundNumber}</Td>
            <Td flex={3}>
              {formatDateTime(billingData.startDateTime) +
                ' ~ ' +
                formatDateTime(billingData.endDateTime)}
            </Td>
            <Td
              flex={1}
            >{`${billingData.actualUsagePeriod.days}일 ${billingData.actualUsagePeriod.hours}시간`}</Td>
          </Box>
        </Box>
        {/** table 2 */}
        <Box gap="xxs">
          <Box flexDirection="row" gap="xxs">
            <Th flex={1}>적용연도</Th>
            <Th flex={1}>일일 간병비</Th>
            <Th flex={1}>적용일수</Th>
            <Th flex={1}>청구 금액</Th>
          </Box>
          {billingData.basicAmounts.length > 0 ? (
            billingData.basicAmounts.map((item, idx) => (
              <Box
                flexDirection="row"
                gap="xxs"
                key={'billing-detail-basic-amount' + idx}
              >
                <Td flex={1}>{item.targetAccidentYear}</Td>
                <Td flex={1}>
                  {formatStaticNumberWithComma(item.dailyCaregivingCharge)}
                </Td>
                <Td flex={1}>{item.caregivingDays + '일'}</Td>
                <Td flex={1}>
                  {formatStaticNumberWithComma(item.totalAmount)}
                </Td>
              </Box>
            ))
          ) : (
            <EmptySearchResult bottomDividerVisible />
          )}
        </Box>
        {/** table 3 */}
        <Box gap="xxs">
          <Box flexDirection="row" gap="xxs">
            <Th flex={1}>추가 시간</Th>
            <Th flex={1}>추가 금액</Th>
          </Box>
          <Box flexDirection="row" gap="xxs">
            <Td flex={1}>{billingData.additionalHours}시간</Td>
            <Td flex={1}>
              {formatStaticNumberWithComma(billingData.additionalAmount)}
            </Td>
          </Box>
        </Box>
        {/** table 4 */}
        <Box flexDirection="row" gap="xxs">
          <Th flex={1}>청구 금액 합계</Th>
          <Td flex={1}>
            {formatStaticNumberWithComma(billingData.totalAmount)}
          </Td>
        </Box>
      </Box>
    </Modal>
  )
}

export default BillingAmountDetailModal
