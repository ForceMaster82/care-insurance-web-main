/* eslint-disable no-alert */
import {sizes} from '@caredoc/ui-master'
import {
  Box,
  ComboBox,
  Divider,
  IComboBoxItemData,
  Input,
  Radio,
  Typography,
} from '@caredoc/ui-web'
import React, {ReactElement, useCallback, useMemo, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {useQueryClient} from '@tanstack/react-query'
import CaregivingChargeInput from '../models/dto/caregiving-charge/Input'
import CaregivingChargeAdditionalChargeInput from '../models/dto/caregiving-charge-additional-charge/Input'
import {getDateDistance} from '../utils/date'
import useCaregivingChargeDetail from '../hooks/api/caregiving-round/use-caregiving-charge-detail'
import useCaregivingChargeUpdate from '../hooks/api/caregiving-round/use-caregiving-charge-update'
import useCaregivingRoundInfo from '../hooks/api/caregiving-round/use-caregiving-round-info'
import {formatStaticNumberWithComma} from '../utils/formatter'
import {MAX_DATE_VALUE} from '../constraints/input'
import {NumberSign} from '../types'
import Modal from './Modal'
import AmountInput from './inputs/AmountInput'
import Card from './Card'

const MAX_ADDITIONAL_HOURS = 10
const ADDITIONAL_HOURS_UNIT_CHARGE = 10_000

interface IEstimateCaregivingChargeModal {
  caregivingRoundId: string
  onClickClose: () => void
}

const CAREGIVING_PERIOD_ADD_DAY_THRESHOLD_HOURS = 10
const NUMBER_SIGN_OPTIONS: IComboBoxItemData<NumberSign>[] = [
  {data: 'POSITIVE', label: '+'},
  {data: 'NEGATIVE', label: '-'},
]
const NUMBER_SIGN_DROPDOWN_WIDTH = 86

const CaregivingChargeEstimateModal = observer(
  (props: IEstimateCaregivingChargeModal): ReactElement => {
    const {caregivingRoundId, onClickClose} = props

    const [caregivingChargeInput, setCaregivingChargeInput] = useState(
      () => new CaregivingChargeInput(),
    )

    const caregivingRoundResource = useCaregivingRoundInfo({
      caregivingRoundId,
      onSuccess: (data) => {
        const additionalHours = data.caregivingPeriod?.hours

        if (
          data.settlementProgressingStatus === 'NOT_STARTED' &&
          typeof additionalHours === 'number' &&
          additionalHours <= MAX_ADDITIONAL_HOURS
        ) {
          caregivingChargeInput.set(
            'additionalHoursCharge',
            (additionalHours * ADDITIONAL_HOURS_UNIT_CHARGE).toString(),
          )
        }
      },
    })

    const {data: caregivingChargeResource} = useCaregivingChargeDetail({
      caregivingRoundId,
      onSuccess: (resource) =>
        setCaregivingChargeInput(new CaregivingChargeInput(resource)),
    })

    const {mutate: updateCaregivingCharge} = useCaregivingChargeUpdate()

    const queryClient = useQueryClient()

    const caregivingRoundNumber =
      caregivingChargeResource?.caregivingRoundInfo.caregivingRoundNumber ||
      caregivingRoundResource?.caregivingRoundNumber

    const dailyCaregivingCharge =
      caregivingChargeResource?.caregivingRoundInfo.dailyCaregivingCharge ||
      caregivingRoundResource?.caregiverInfo.dailyCaregivingCharge

    const caregivingPeriod = useMemo(() => {
      const startDateTime =
        caregivingChargeResource?.caregivingRoundInfo.startDateTime ||
        caregivingRoundResource?.startDateTime
      const endDateTime =
        caregivingChargeResource?.caregivingRoundInfo.endDateTime ||
        caregivingRoundResource?.endDateTime

      if (!startDateTime || !endDateTime || !dailyCaregivingCharge) {
        return {
          days: 0,
          hours: 0,
        }
      }
      return getDateDistance(endDateTime, startDateTime)
    }, [
      caregivingChargeResource?.caregivingRoundInfo.endDateTime,
      caregivingChargeResource?.caregivingRoundInfo.startDateTime,
      caregivingRoundResource,
      dailyCaregivingCharge,
    ])

    const expectedTotalAmount = useMemo<number>(() => {
      if (typeof dailyCaregivingCharge !== 'number') {
        return 0
      }

      const additionalDay =
        caregivingPeriod.hours > CAREGIVING_PERIOD_ADD_DAY_THRESHOLD_HOURS

      return (
        (caregivingPeriod.days + Number(additionalDay)) *
          dailyCaregivingCharge +
        caregivingChargeInput.sumOfPayments
      )
    }, [
      caregivingPeriod.hours,
      caregivingPeriod.days,
      dailyCaregivingCharge,
      caregivingChargeInput.sumOfPayments,
    ])

    const handleOnChangeInput =
      <K extends keyof CaregivingChargeInput>(property: K) =>
      (value: CaregivingChargeInput[K]): void => {
        caregivingChargeInput.set(property, value)
      }

    const handleOnChangeAdditionalCharge =
      <K extends keyof CaregivingChargeAdditionalChargeInput>(
        index: 0 | 1 | 2,
        property: K,
      ) =>
      (value: CaregivingChargeAdditionalChargeInput[K]) => {
        caregivingChargeInput.setAdditionalCharge(index, property, value)
      }

    const validate = useCallback((): {
      errorMessage?: string
      isValidated: boolean
    } => {
      const additionalCharges = caregivingChargeInput.additionalCharges.filter(
        (item) => !item.isEmpty,
      )

      const isDuplicateAdditionalCharges =
        new Set(additionalCharges.map((item) => item.name)).size <
        additionalCharges.length
      if (isDuplicateAdditionalCharges) {
        return {
          errorMessage: '기타 비용의 계정과목명은 중복 입력하실 수 없습니다.',
          isValidated: false,
        }
      }
      if (!caregivingChargeInput.expectedSettlementDate) {
        return {
          errorMessage: '정산 예정일자를 입력해 주세요.',
          isValidated: false,
        }
      }
      return {isValidated: true}
    }, [
      caregivingChargeInput.additionalCharges,
      caregivingChargeInput.expectedSettlementDate,
    ])

    const handleOnSubmit = useCallback(() => {
      const {isValidated, errorMessage} = validate()

      if (!isValidated && errorMessage) {
        alert(errorMessage)
        return
      }

      updateCaregivingCharge(
        {
          pathParams: {caregivingRoundId},
          payload: caregivingChargeInput.input,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['caregiving-charge', 'detail', {caregivingRoundId}],
            })
            queryClient.invalidateQueries({
              queryKey: [
                'reception-caregiving-round',
                'list',
                {
                  receptionId:
                    caregivingRoundResource?.receptionInfo.receptionId,
                },
              ],
            })
            queryClient.invalidateQueries({
              queryKey: [
                'reception-settlement',
                'list',
                {
                  receptionId:
                    caregivingRoundResource?.receptionInfo.receptionId,
                },
              ],
            })
            queryClient.invalidateQueries({
              queryKey: [
                'reception-caregiving-charge-modification',
                {
                  receptionId:
                    caregivingRoundResource?.receptionInfo.receptionId,
                },
              ],
            })

            alert('간병비 산정이 완료되었습니다.')
            onClickClose()
          },
        },
      )
    }, [
      validate,
      updateCaregivingCharge,
      caregivingRoundId,
      caregivingChargeInput.input,
      onClickClose,
      queryClient,
      caregivingRoundResource?.receptionInfo.receptionId,
    ])

    return (
      <Modal
        closeIndicationType="button"
        disabled={!caregivingChargeInput.expectedSettlementDate}
        modalWidth="md"
        onClose={onClickClose}
        onSubmit={handleOnSubmit}
        title={`${caregivingRoundNumber}회차 간병비 산정`}
      >
        <Box gap="lg">
          <Box gap="sm" marginBottom="xs" marginTop="xs">
            {/** data 1 */}
            <Box
              backgroundColor="bgPrimary"
              borderRadius="sm"
              elevation="elevation-1"
              gap="md"
              pb="lg"
              pt="md"
              px="sm"
              variant="shadow"
            >
              <Box gap="xs">
                <Box flexDirection="row" gap="xs">
                  <Card.Item title="일당">
                    <AmountInput
                      disabled
                      readonly
                      value={
                        (dailyCaregivingCharge &&
                          formatStaticNumberWithComma(dailyCaregivingCharge)) ||
                        '0'
                      }
                    />
                  </Card.Item>
                  <Card.Item title="실간병기간">
                    <Input
                      disabled
                      readonly
                      value={`${caregivingPeriod.days}일 ${caregivingPeriod.hours}시간`}
                    />
                  </Card.Item>
                </Box>
                <Box flexDirection="row" gap="xs">
                  <Card.Item title="추가시간">
                    <AmountInput
                      onChange={handleOnChangeInput('additionalHoursCharge')}
                      value={caregivingChargeInput.additionalHoursCharge}
                    />
                  </Card.Item>
                  <Card.Item title="식대">
                    <AmountInput
                      onChange={handleOnChangeInput('mealCost')}
                      value={caregivingChargeInput.mealCost}
                    />
                  </Card.Item>
                </Box>
                <Box flexDirection="row" gap="xs">
                  <Card.Item title="교통비">
                    <AmountInput
                      onChange={handleOnChangeInput('transportationFee')}
                      value={caregivingChargeInput.transportationFee}
                    />
                  </Card.Item>
                  <Card.Item title="명절 근무">
                    <AmountInput
                      onChange={handleOnChangeInput('holidayCharge')}
                      value={caregivingChargeInput.holidayCharge}
                    />
                  </Card.Item>
                </Box>
                <Box flexDirection="row" gap="xs">
                  <Card.Item title="코로나 검사비">
                    <AmountInput
                      onChange={handleOnChangeInput('covid19TestingCost')}
                      value={caregivingChargeInput.covid19TestingCost}
                    />
                  </Card.Item>
                  <Card.Item title="환자상태">
                    <AmountInput
                      onChange={handleOnChangeInput('patientConditionCharge')}
                      value={caregivingChargeInput.patientConditionCharge}
                    />
                  </Card.Item>
                </Box>
                <Box flexDirection="row" gap="xs">
                  <Card.Item title="배상책임보험">
                    <AmountInput
                      onChange={handleOnChangeInput('caregiverInsuranceFee')}
                      value={caregivingChargeInput.caregiverInsuranceFee}
                    />
                  </Card.Item>
                  <Card.Item title="간병인 미지급">
                    <AmountInput
                      onChange={handleOnChangeInput('outstandingAmount')}
                      value={caregivingChargeInput.outstandingAmount}
                    />
                  </Card.Item>
                </Box>
                <Box flexDirection="row" gap="xs">
                  <Card.Item title="유급휴가">
                    <AmountInput
                      onChange={handleOnChangeInput('vacationCharge')}
                      value={caregivingChargeInput.vacationCharge}
                    />
                  </Card.Item>
                  <Card.Item title="수수료">
                    <AmountInput
                      onChange={handleOnChangeInput('commissionFee')}
                      prefix="minus"
                      value={caregivingChargeInput.commissionFee}
                    />
                  </Card.Item>
                </Box>
                <Card.Item title="기타 비용 1">
                  <Box flexDirection="row" gap="xs">
                    <Input
                      forcedInput
                      hideMaxLengthText
                      maxLength={15}
                      onTextChange={handleOnChangeAdditionalCharge(0, 'name')}
                      placeholder="계정과목명 입력 (최대 15자)"
                      style={{flex: 1}}
                      value={caregivingChargeInput.additionalCharges[0].name}
                    />
                    <Box flex={1} flexDirection="row" gap="xs">
                      <ComboBox
                        items={NUMBER_SIGN_OPTIONS}
                        onSelect={handleOnChangeAdditionalCharge(0, 'sign')}
                        style={{width: NUMBER_SIGN_DROPDOWN_WIDTH}}
                        value={caregivingChargeInput.additionalCharges[0].sign}
                      />
                      <AmountInput
                        onChange={handleOnChangeAdditionalCharge(0, 'amount')}
                        style={{flex: 1}}
                        value={
                          caregivingChargeInput.additionalCharges[0].amount
                        }
                      />
                    </Box>
                  </Box>
                </Card.Item>
                <Card.Item title="기타 비용 2">
                  <Box flexDirection="row" gap="xs">
                    <Input
                      forcedInput
                      hideMaxLengthText
                      maxLength={15}
                      onTextChange={handleOnChangeAdditionalCharge(1, 'name')}
                      placeholder="계정과목명 입력 (최대 15자)"
                      style={{flex: 1}}
                      value={caregivingChargeInput.additionalCharges[1].name}
                    />
                    <Box flex={1} flexDirection="row" gap="xs">
                      <ComboBox
                        items={NUMBER_SIGN_OPTIONS}
                        onSelect={handleOnChangeAdditionalCharge(1, 'sign')}
                        style={{width: NUMBER_SIGN_DROPDOWN_WIDTH}}
                        value={caregivingChargeInput.additionalCharges[1].sign}
                      />
                      <AmountInput
                        onChange={handleOnChangeAdditionalCharge(1, 'amount')}
                        style={{flex: 1}}
                        value={
                          caregivingChargeInput.additionalCharges[1].amount
                        }
                      />
                    </Box>
                  </Box>
                </Card.Item>
                <Card.Item title="기타 비용 3">
                  <Box flex={1} flexDirection="row" gap="xs">
                    <Input
                      forcedInput
                      hideMaxLengthText
                      maxLength={15}
                      onTextChange={handleOnChangeAdditionalCharge(2, 'name')}
                      placeholder="계정과목명 입력 (최대 15자)"
                      style={{flex: 1}}
                      value={caregivingChargeInput.additionalCharges[2].name}
                    />
                    <Box flex={1} flexDirection="row" gap="xs">
                      <ComboBox
                        items={NUMBER_SIGN_OPTIONS}
                        onSelect={handleOnChangeAdditionalCharge(2, 'sign')}
                        style={{width: NUMBER_SIGN_DROPDOWN_WIDTH}}
                        value={caregivingChargeInput.additionalCharges[2].sign}
                      />
                      <AmountInput
                        onChange={handleOnChangeAdditionalCharge(2, 'amount')}
                        style={{flex: 1}}
                        value={
                          caregivingChargeInput.additionalCharges[2].amount
                        }
                      />
                    </Box>
                  </Box>
                </Card.Item>
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
                  {formatStaticNumberWithComma(expectedTotalAmount)} 원
                </Typography>
              </Box>
            </Box>
            {/** data 2 */}
            <Box
              backgroundColor="bgPrimary"
              borderRadius="sm"
              elevation="elevation-1"
              flexDirection="row"
              gap="xs"
              pb="lg"
              pt="md"
              px="sm"
              variant="shadow"
            >
              <Card.Item title="정산 예정일자">
                <Input
                  max={MAX_DATE_VALUE}
                  onTextChange={handleOnChangeInput('expectedSettlementDate')}
                  type="date"
                  value={caregivingChargeInput.expectedSettlementDate}
                />
              </Card.Item>
              <Card.Item title="도착 후 취소 여부">
                <Box
                  alignItems="center"
                  flexDirection="row"
                  gap="sm"
                  height={sizes.sm}
                >
                  <Radio
                    color="primary"
                    onClick={(): void =>
                      handleOnChangeInput('isCancelAfterArrived')(true)
                    }
                    size="sm"
                    value={caregivingChargeInput.isCancelAfterArrived}
                  >
                    <Typography variant="body3">해당</Typography>
                  </Radio>
                  <Radio
                    color="primary"
                    onClick={(): void =>
                      handleOnChangeInput('isCancelAfterArrived')(false)
                    }
                    size="sm"
                    value={!caregivingChargeInput.isCancelAfterArrived}
                  >
                    <Typography variant="body3">해당 안함</Typography>
                  </Radio>
                </Box>
              </Card.Item>
            </Box>
          </Box>
        </Box>
      </Modal>
    )
  },
)

export default CaregivingChargeEstimateModal
