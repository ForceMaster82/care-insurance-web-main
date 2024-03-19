import React, {ReactElement, useCallback, useEffect, useMemo} from 'react'
import {
  Box,
  Button,
  ComboBox,
  InfoBox,
  Radio,
  Typography,
} from '@caredoc/ui-web'
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'
import {sizes} from '@caredoc/ui-master'
import {isToday} from 'date-fns'
import Card from '../../../../components/Card'
import ReceptionCaregivingRoundResource from '../../../../models/dto/reception-caregiving-round/Resource'
import {bankList, ORGANIZATION_TYPE} from '../../../../constants'
import ReceptionCaregivingRoundInput from '../../../../models/dto/reception-caregiving-round/Input'
import {receptionCaregivingRoundConstraints} from '../../../../constraints/reception-caregiving-round'
import {formatDateTimeText, getDateDistance} from '../../../../utils/date'
import {MAX_DATE_TIME_VALUE, MAX_LENGTH} from '../../../../constraints/input'
import {getExternalCaregivingOrganizationOptions} from '../../../../utils/option'
import useExternalCaregivingOrganizationList from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization-list'
import useExternalCaregivingOrganization from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import {ReceptionCaregivingRoundData} from '../../../../types/form'
import {generatePeriodText} from '../../../../utils/text-transformation'
import FormattingInput from '../../../../components/inputs/FormattingInput'
import {
  formatAccountNumber,
  formatDateText,
  formatNumberWithComma,
  formatPhoneNumberWithHyphen,
} from '../../../../utils/formatter'
import {CaregivingRoundClosingReasonType} from '../../../../types'
import SectionHeader from './SectionHeader'

interface IProps {
  data: ReceptionCaregivingRoundResource
  onClickCancelModify: () => void
  onInvalid: SubmitErrorHandler<ReceptionCaregivingRoundData>
  onValid: SubmitHandler<ReceptionCaregivingRoundData>
  previousRoundClosingReasonType: CaregivingRoundClosingReasonType | null
}

const CaregivingRoundInfoInternalManagerForm = (
  props: IProps,
): ReactElement => {
  const {
    data,
    onClickCancelModify,
    onInvalid,
    onValid,
    previousRoundClosingReasonType,
  } = props

  const {register, watch, setValue, handleSubmit, control} = useForm({
    defaultValues: new ReceptionCaregivingRoundInput(data).data,
  })
  const startDateTimeInput = watch('startDateTime')
  const endDateTimeInput = watch('endDateTime')

  const affiliatedList = useExternalCaregivingOrganizationList({
    externalCaregivingOrganizationType: 'AFFILIATED',
  })
  const organizationList = useExternalCaregivingOrganizationList({
    externalCaregivingOrganizationType: 'ORGANIZATION',
  })
  const selectedExternalOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId: watch(
      'caregiverInfo.caregiverOrganizationId',
    ),
  })

  const isStartDateTimeEditable =
    previousRoundClosingReasonType !== 'FINISHED_CONTINUE'
  const organizationOptions = useMemo(
    () => [
      {data: null, label: ORGANIZATION_TYPE.INTERNAL},
      ...getExternalCaregivingOrganizationOptions(affiliatedList),
      ...getExternalCaregivingOrganizationOptions(organizationList),
    ],
    [affiliatedList, organizationList],
  )
  const isCaregivingRoundCanceled =
    data.caregivingProgressingStatus === 'CANCELED_WHILE_REMATCHING'

  const expectedCaregivingPeriod = useMemo(() => {
    if (!startDateTimeInput) {
      return null
    }
    const startDateTime = new Date(startDateTimeInput)

    if (isToday(startDateTime)) {
      return {
        days: 1,
        hours: 0,
      }
    }

    const expectedEndDateTime = !endDateTimeInput
      ? new Date()
      : new Date(endDateTimeInput)

    return getDateDistance(expectedEndDateTime, startDateTime)
  }, [endDateTimeInput, startDateTimeInput])

  const caregivingPeriod = useMemo(() => {
    if (!startDateTimeInput || !endDateTimeInput) {
      return null
    }

    const startDateTime = new Date(startDateTimeInput)
    const endDateTime = new Date(endDateTimeInput)

    return getDateDistance(endDateTime, startDateTime)
  }, [endDateTimeInput, startDateTimeInput])

  // const setCaregiverAccountInfoByOrganizationAccountInfo = useCallback(() => {
  //   if (selectedExternalOrganization) {
  //     const {bank, accountNumber, accountHolder} =
  //       selectedExternalOrganization.accountInfo
  //     bank && setValue('caregiverInfo.accountInfo.bank', bank)
  //     accountHolder &&
  //       setValue('caregiverInfo.accountInfo.accountHolder', accountHolder)
  //     accountNumber &&
  //       setValue('caregiverInfo.accountInfo.accountNumber', accountNumber)
  //   }
  // }, [selectedExternalOrganization, setValue])

  useEffect(() => {
    register('caregiverInfo.caregiverOrganizationId')
    register('caregiverInfo.sex')
    register('caregiverInfo.insured')
    register('caregiverInfo.accountInfo.bank')
  }, [register])

  // useEffect(() => {
  //   setCaregiverAccountInfoByOrganizationAccountInfo()
  // }, [setCaregiverAccountInfoByOrganizationAccountInfo])

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <Box flexDirection="row" gap="xxl" overflowY="visible">
        <Box flex={1} gap="lg">
          {data.startDateTime && (
            <Box gap="sm">
              <SectionHeader>진행 정보</SectionHeader>
              <Card.RowGroup flex={1}>
                {isCaregivingRoundCanceled && (
                  <Card.Row>
                    <Card.Item title="취소일시">
                      <Card.Input
                        disabled
                        readonly
                        value={
                          (data.cancelDateTime &&
                            formatDateTimeText(data.cancelDateTime)) ||
                          ''
                        }
                      />
                    </Card.Item>
                    <Card.Item title="사유 상세">
                      <Card.Input
                        disabled
                        readonly
                        value={data.caregivingRoundClosingReasonDetail}
                      />
                    </Card.Item>
                  </Card.Row>
                )}
                <Card.Row>
                  <Card.RowGroup flex={1}>
                    <Card.Row>
                      <Card.Item title="시작일시">
                        <Card.Input
                          //disabled={!isStartDateTimeEditable}
                          max={MAX_DATE_TIME_VALUE}
                          //readonly={!isStartDateTimeEditable}
                          register={register('startDateTime', {
                            required: data.startDateTime
                              ? receptionCaregivingRoundConstraints
                                  .startDateTime?.required
                              : false,
                            validate:
                              receptionCaregivingRoundConstraints.startDateTime
                                ?.validate,
                          })}
                          type="datetime-local"
                        />
                      </Card.Item>
                      <Card.Item title="종료일시">
                        {(data.endDateTime && (
                          <Card.Input
                            max={MAX_DATE_TIME_VALUE}
                            register={register('endDateTime', {
                              required: data.endDateTime
                                ? receptionCaregivingRoundConstraints
                                    .endDateTime?.required
                                : false,
                            })}
                            type="datetime-local"
                          />
                        )) || (
                          <InfoBox
                            size="sm"
                            state="warning"
                            style={{height: sizes.sm}}
                          >
                            해당 회차 간병이 종료되지 않았습니다.
                          </InfoBox>
                        )}
                      </Card.Item>
                    </Card.Row>
                    <Card.Row>
                      <Card.Item title="간병기간">
                        <Card.Input
                          disabled
                          readonly
                          value={
                            (expectedCaregivingPeriod &&
                              generatePeriodText(
                                expectedCaregivingPeriod,
                                true,
                              )) ||
                            ''
                          }
                        />
                      </Card.Item>
                      <Card.Item title="실간병기간">
                        <Card.Input
                          disabled
                          readonly
                          value={
                            (caregivingPeriod &&
                              generatePeriodText(caregivingPeriod)) ||
                            ''
                          }
                        />
                      </Card.Item>
                    </Card.Row>
                  </Card.RowGroup>
                  <Card.Item fixedHeight={false} isOptional title="메모">
                    <Card.Input
                      maxLength={MAX_LENGTH.TEXTAREA}
                      register={register('remarks')}
                      value={watch('remarks')}
                    />
                  </Card.Item>
                </Card.Row>
              </Card.RowGroup>
            </Box>
          )}
          <Box gap="sm">
            <SectionHeader>간병인 정보</SectionHeader>
            <Card.RowGroup>
              <Card.Row>
                <Card.Item title="간병인 소속">
                  <ComboBox
                    items={organizationOptions}
                    onSelect={(value): void =>
                      setValue('caregiverInfo.caregiverOrganizationId', value)
                    }
                    value={watch('caregiverInfo.caregiverOrganizationId')}
                  />
                </Card.Item>
                <Card.Item title="간병인명">
                  <Card.Input
                    register={register(
                      'caregiverInfo.name',
                      receptionCaregivingRoundConstraints['caregiverInfo.name'],
                    )}
                  />
                </Card.Item>
                <Card.Item title="성별">
                  <Box flexDirection="row" gap="xs">
                    <Radio
                      color="primary"
                      onClick={(): void =>
                        setValue('caregiverInfo.sex', 'MALE')
                      }
                      value={watch('caregiverInfo.sex') === 'MALE'}
                    >
                      <Typography variant="body3">남자</Typography>
                    </Radio>
                    <Radio
                      color="primary"
                      onClick={(): void =>
                        setValue('caregiverInfo.sex', 'FEMALE')
                      }
                      value={watch('caregiverInfo.sex') === 'FEMALE'}
                    >
                      <Typography variant="body3">여자</Typography>
                    </Radio>
                  </Box>
                </Card.Item>
                <Card.Item fixedHeight={false} title="생년월일">
                  {/*<FormattingInput*/}
                  {/*  constraints={receptionCaregivingRoundConstraints}*/}
                  {/*  control={control}*/}
                  {/*  fieldName="caregiverInfo.birthDate"*/}
                  {/*  formatter={formatDateText}*/}
                  {/*  hint="'-' 없이 생년월일 8자리 입력"*/}
                  {/*/>*/}
                  <Card.Input
                      register={register(
                          'caregiverInfo.birthDate',
                          receptionCaregivingRoundConstraints['caregiverInfo.birthDate'],
                      )}
                  />
                </Card.Item>
              </Card.Row>
              <Card.Row>
                <Card.Item fixedHeight={false} title="연락처">
                  <FormattingInput
                    constraints={receptionCaregivingRoundConstraints}
                    control={control}
                    fieldName="caregiverInfo.phoneNumber"
                    formatter={formatPhoneNumberWithHyphen}
                    hint="'-' 없이 번호만 입력"
                  />
                </Card.Item>
                <Card.Item title="간병인 일당 (원)">
                  <FormattingInput
                    constraints={receptionCaregivingRoundConstraints}
                    control={control}
                    fieldName="caregiverInfo.dailyCaregivingCharge"
                    formatter={formatNumberWithComma}
                  />
                </Card.Item>
                <Card.Item title="수수료 (원)">
                  <FormattingInput
                    constraints={receptionCaregivingRoundConstraints}
                    control={control}
                    defaultValue="0"
                    fieldName="caregiverInfo.commissionFee"
                    formatter={formatNumberWithComma}
                  />
                </Card.Item>
                <Card.Item title="책임보험 가입여부">
                  <Box flexDirection="row" gap="xs">
                    <Radio
                      color="primary"
                      onClick={(): void =>
                        setValue('caregiverInfo.insured', true)
                      }
                      value={watch('caregiverInfo.insured')}
                    >
                      <Typography variant="body3">가입</Typography>
                    </Radio>
                    <Radio
                      color="primary"
                      onClick={(): void =>
                        setValue('caregiverInfo.insured', false)
                      }
                      value={!watch('caregiverInfo.insured')}
                    >
                      <Typography variant="body3">가입 안함</Typography>
                    </Radio>
                  </Box>
                </Card.Item>
              </Card.Row>
              <Card.Row>
                <Card.Item title="은행명">
                  <ComboBox
                    items={bankList}
                    onSelect={(value): void =>
                      setValue('caregiverInfo.accountInfo.bank', value)
                        //setValue('data.caregiverInfo.accountInfo.bank', value)
                    }
                    value={watch('caregiverInfo.accountInfo.bank')}
                  />
                </Card.Item>
                <Card.Item title="예금주">
                  <Card.Input
                    register={register(
                      'caregiverInfo.accountInfo.accountHolder',
                    )}
                  />
                </Card.Item>
                <Card.Item fixedHeight={false} title="계좌번호">
                  <FormattingInput
                    constraints={receptionCaregivingRoundConstraints}
                    control={control}
                    fieldName="caregiverInfo.accountInfo.accountNumber"
                    formatter={formatAccountNumber}
                    hint="'-' 포함하여 계좌번호 입력"
                  />
                </Card.Item>
                <Box flex={1} />
              </Card.Row>
            </Card.RowGroup>
          </Box>
        </Box>
        <Card.ButtonArea gap="xs">
          <button type="submit">
            <Button color="primary">완료</Button>
          </button>
          <Button
            color="fontPrimary"
            onClick={onClickCancelModify}
            variant="tertiary"
          >
            취소
          </Button>
        </Card.ButtonArea>
      </Box>
    </form>
  )
}

export default CaregivingRoundInfoInternalManagerForm
