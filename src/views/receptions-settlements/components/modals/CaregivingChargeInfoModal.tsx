/* eslint-disable unicorn/filename-case */
import {Box, Divider, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import Modal from '../../../../components/Modal'
import useCaregivingChargeDetail from '../../../../hooks/api/caregiving-round/use-caregiving-charge-detail'
import {formatStaticNumberWithComma} from '../../../../utils/formatter'
import Card from '../../../../components/Card'
import {IS_CANCEL_AFTER_ARRIVED} from '../../../../constants'
import {generatePeriodText} from '../../../../utils/text-transformation'

interface IProps {
  caregivingRoundId: string
  onClickCloseButton: () => void
}

const AmountTextBox = ({
  title,
  amount,
}: {
  amount: number
  title: string
}): ReactElement => (
  <Box alignItems="flex-end" backgroundColor="bgSecondary">
    <Box alignItems="center" flexDirection="row" gap="sm">
      <Typography variant="body3">{title}</Typography>
      <Typography variant="subtitle1">
        {formatStaticNumberWithComma(amount)} 원
      </Typography>
    </Box>
  </Box>
)

const CaregivingChargeInfoModal = (props: IProps): ReactElement | null => {
  const {caregivingRoundId, onClickCloseButton} = props

  const {data: caregivingCharge} = useCaregivingChargeDetail({
    caregivingRoundId,
  })

  if (!caregivingCharge) {
    return null
  }

  const firstAdditionalCharge = caregivingCharge.additionalCharges.at(0)
  const secondAdditionalCharge = caregivingCharge.additionalCharges.at(1)
  const thirdAdditionalCharge = caregivingCharge.additionalCharges.at(2)

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="md"
      onClose={onClickCloseButton}
      title={`${caregivingCharge.caregivingRoundInfo.caregivingRoundNumber}회차 간병비 산정`}
    >
      <Box gap="lg" mb="lg">
        {/** title */}
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
        />
        <Box gap="sm">
          {/** data 1 */}
          <Box
            backgroundColor="bgPrimary"
            borderRadius="sm"
            elevation="elevation-1"
            gap="sm"
            pb="lg"
            pt="md"
            px="sm"
            variant="shadow"
          >
            <Box gap="xs">
              <Box flexDirection="row" gap="xs">
                <Card.Item title="일당">
                  {formatStaticNumberWithComma(
                    caregivingCharge?.caregivingRoundInfo.dailyCaregivingCharge,
                  )}
                </Card.Item>
                <Card.Item title="실간병기간">
                  {generatePeriodText(
                    caregivingCharge.caregivingRoundInfo.caregivingPeriod,
                  )}
                </Card.Item>
              </Box>
              <AmountTextBox
                amount={caregivingCharge.basicAmount}
                title="기본 금액 합계"
              />
            </Box>
            <Box gap="xs">
              <Box flexDirection="row" gap="xs">
                <Card.Item title="추가시간">
                  {formatStaticNumberWithComma(
                    caregivingCharge.additionalHoursCharge,
                  )}
                </Card.Item>
                <Card.Item title="식대">
                  {formatStaticNumberWithComma(caregivingCharge.mealCost)}
                </Card.Item>
              </Box>
              <Box flexDirection="row" gap="xs">
                <Card.Item title="교통비">
                  {formatStaticNumberWithComma(
                    caregivingCharge.transportationFee,
                  )}
                </Card.Item>
                <Card.Item title="명절 근무">
                  {formatStaticNumberWithComma(caregivingCharge.holidayCharge)}
                </Card.Item>
              </Box>
              <Box flexDirection="row" gap="xs">
                <Card.Item title="코로나 검사비">
                  {formatStaticNumberWithComma(
                    caregivingCharge.covid19TestingCost,
                  )}
                </Card.Item>
                <Card.Item title="환자상태">
                  {formatStaticNumberWithComma(
                    caregivingCharge.patientConditionCharge,
                  )}
                </Card.Item>
              </Box>
              <Box flexDirection="row" gap="xs">
                <Card.Item title="배상책임보험">
                  {formatStaticNumberWithComma(
                    caregivingCharge.caregiverInsuranceFee,
                  )}
                </Card.Item>
                <Card.Item title="간병인 미지급">
                  {formatStaticNumberWithComma(
                    caregivingCharge.outstandingAmount,
                  )}
                </Card.Item>
              </Box>
              <Box flexDirection="row" gap="xs">
                <Card.Item title="유급휴가">
                  {formatStaticNumberWithComma(caregivingCharge.vacationCharge)}
                </Card.Item>
                <Box flex={1} />
              </Box>
              <Box flexDirection="row" gap="xs">
                <Card.Item title="기타 비용 1">
                  {(firstAdditionalCharge &&
                    `(${
                      firstAdditionalCharge.name
                    }) ${formatStaticNumberWithComma(
                      firstAdditionalCharge.amount,
                    )}`) ||
                    '0'}
                </Card.Item>
                <Card.Item title="기타 비용 2">
                  {(secondAdditionalCharge &&
                    `(${
                      secondAdditionalCharge.name
                    }) ${formatStaticNumberWithComma(
                      secondAdditionalCharge.amount,
                    )}`) ||
                    '0'}
                </Card.Item>
              </Box>
              <Box flexDirection="row" gap="xs">
                <Card.Item title="기타 비용 3">
                  {(thirdAdditionalCharge &&
                    `(${
                      thirdAdditionalCharge.name
                    }) ${formatStaticNumberWithComma(
                      thirdAdditionalCharge.amount,
                    )}`) ||
                    '0'}
                </Card.Item>
                <Card.Item title="수수료">
                  {`${
                    caregivingCharge.commissionFee > 0 ? '-' : ''
                  }${formatStaticNumberWithComma(
                    caregivingCharge.commissionFee,
                  )}`}
                </Card.Item>
              </Box>
              <AmountTextBox
                amount={caregivingCharge.additionalAmount}
                title="추가 금액 합계"
              />
            </Box>
            <Divider color="borderSecondary" />
            <Box
              alignItems="center"
              alignSelf="flex-end"
              flexDirection="row"
              gap="sm"
            >
              <Typography variant="body3">산정 금액 합계</Typography>
              <Typography variant="heading6">
                {formatStaticNumberWithComma(caregivingCharge.totalAmount)} 원
              </Typography>
            </Box>
          </Box>
          {/** data 2 */}
          <Box
            backgroundColor="bgPrimary"
            borderRadius="sm"
            elevation="elevation-1"
            gap="xxs"
            pb="lg"
            pt="md"
            px="sm"
            variant="shadow"
          >
            <Card.Item title="도착 후 취소 여부">
              {
                IS_CANCEL_AFTER_ARRIVED[
                  Number(caregivingCharge.isCancelAfterArrived)
                ]
              }
            </Card.Item>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default CaregivingChargeInfoModal
