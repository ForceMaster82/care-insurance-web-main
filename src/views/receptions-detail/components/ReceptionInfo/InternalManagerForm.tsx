/* eslint-disable max-lines */
import {
  Box,
  Button,
  Chip,
  ComboBox,
  InfoBox,
  Radio,
  Typography,
} from '@caredoc/ui-web'
import React, {ReactElement, useEffect, useState} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'
import {sizes} from '@caredoc/ui-master'
import ReceptionResource from '../../../../models/dto/reception/Resource'
import Card from '../../../../components/Card'
import {
  INSURANCE_COMPANY,
  RECEPTION_CANCELLATION_REASON,
} from '../../../../constants'
import {formatDate, formatDateTimeText} from '../../../../utils/date'
import useInternalCaregivingManagerDetail from '../../../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import {
  generateCaregivingManagerInfoText,
  generateHospitalRoomInfoText,
} from '../../../../utils/text-transformation'
import useExternalCaregivingManagerDetail from '../../../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-detail'
import useExternalCaregivingOrganization from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import {ReceptionDetailModalType} from '../../../../types'
import ReceptionUpdateInput from '../../../../models/dto/reception/UpdateInput'
import {receptionUpdateConstraints} from '../../../../constraints/reception'
import {getCoverageOptions} from '../../../../utils/option'
import useCoverageList from '../../../../hooks/api/coverage/use-coverage-list'
import {
  HospitalRoomInfoData,
  ReceptionCaregivingManagerInfoData,
  ReceptionUpdateData,
} from '../../../../types/form'
import HospitalRoomInfoModal from '../modals/HospitalRoomInfoModal'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import FormattingInput from '../../../../components/inputs/FormattingInput'
import {
  formatNumberWithComma,
  formatPhoneNumberWithHyphen,
} from '../../../../utils/formatter'
import {
  MAX_DATE_TIME_VALUE,
  MAX_DATE_VALUE,
  MAX_LENGTH,
} from '../../../../constraints/input'
import InputFile from '../../../receptions/components/InputFile'
import {IReceptionApplication} from '../../../../types/dto'
import CaregivingManagerAssignModal from '../modals/CaregivingManagerAssignModal'

interface IProps {
  data: ReceptionResource
  existingApplicationFile?: IReceptionApplication
  onClickCancelModify: () => void
  onInvalid: SubmitErrorHandler<ReceptionUpdateData>
  onValid: (
    applicationFile: File | null,
    deleteApplicationFile?: boolean,
  ) => SubmitHandler<ReceptionUpdateData>
}

const ReceptionInfoInternalManagerForm = (props: IProps): ReactElement => {
  const {
    data,
    onClickCancelModify,
    onValid,
    onInvalid,
    existingApplicationFile,
  } = props

  const modalStore = useModalStore<ReceptionDetailModalType>()
  const [applicationFile, setApplicationFile] = useState<File | null>(null)
  const [deleteApplicationFile, setDeleteApplicationFile] = useState(false)

  const {data: unmaskedData} = useReceptionDetail({
    receptionId: data.id,
    unmaskedProperty: [
      'PATIENT_NAME',
      'PATIENT_PRIMARY_PHONE_NUMBER',
      'PATIENT_SECONDARY_PHONE_NUMBER',
    ],
  })
  const {data: registerManagerData} = useInternalCaregivingManagerDetail({
    internalCaregivingManagerId: data.registerManagerInfo.managingUserId,
  })
  const coverageListData = useCoverageList()

  const isReceptionCanceled =
    data.progressingStatus === 'CANCELED' ||
    data.progressingStatus === 'CANCELED_BY_MEDICAL_REQUEST' ||
    data.progressingStatus === 'CANCELED_BY_PERSONAL_CAREGIVER' ||
    data.progressingStatus === 'CANCELED_WHILE_MATCHING'

  const {register, setValue, watch, handleSubmit, control} = useForm({
    defaultValues: new ReceptionUpdateInput().data,
    values: new ReceptionUpdateInput(unmaskedData).data,
  })

  const caregivingManagerInfo = watch('caregivingManagerInfo')

  const {data: internalCaregivingManagerData} =
    useInternalCaregivingManagerDetail({
      internalCaregivingManagerId:
        caregivingManagerInfo.organizationType === 'INTERNAL' ||
        caregivingManagerInfo.organizationType === 'ORGANIZATION'
          ? caregivingManagerInfo.managingUserId
          : null,
    })
  const externalCaregivingManagerData = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId:
      caregivingManagerInfo.organizationType === 'AFFILIATED'
        ? caregivingManagerInfo.managingUserId
        : null,
  })
  const caregivingManagerData =
    internalCaregivingManagerData || externalCaregivingManagerData
  const externalCaregivingOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      caregivingManagerInfo.organizationType !== 'INTERNAL'
        ? caregivingManagerInfo.organizationId
        : null,
  })

  const handleOnClickCaregivingManagerInfo = (): void => {
    const closeModal = (): void => {
      modalStore.delete('CAREGIVING_MANAGER_ASSIGN')
    }

    const handleOnChangeCaregivingManagerInfo = (
      data: ReceptionCaregivingManagerInfoData,
    ): void => {
      setValue('caregivingManagerInfo', data, {shouldDirty: true})
      closeModal()
    }

    modalStore.create(
      'CAREGIVING_MANAGER_ASSIGN',
      <CaregivingManagerAssignModal
        onClickClose={closeModal}
        onSubmit={handleOnChangeCaregivingManagerInfo}
        receptionId={data.id}
      />,
    )
  }

  const handleOnClickHospitalRoomInfo = (): void => {
    const handleOnChangeHospitalRoomInfo = (
      data: HospitalRoomInfoData,
    ): void => {
      setValue('accidentInfo.hospitalRoomInfo', data, {shouldDirty: true})
    }

    modalStore.create(
      'HOSPITAL_ROOM_INFO',
      <HospitalRoomInfoModal
        data={data.accidentInfo.hospitalRoomInfo}
        onClickClose={(): void => modalStore.delete('HOSPITAL_ROOM_INFO')}
        onSubmit={handleOnChangeHospitalRoomInfo}
      />,
    )
  }

  const handleOnApplicationFileClear = (): void => {
    setApplicationFile(null)
    setDeleteApplicationFile(true)
  }

  const handleOnApplicationFileChange = (file: File | null): void => {
    setApplicationFile(file)
    setDeleteApplicationFile(false)
  }

  useEffect(() => {
    register('patientInfo.sex')
    register('accidentInfo.claimType')
    register('insuranceInfo.coverageId')
    register('notifyCaregivingProgress')
    register('accidentInfo.hospitalRoomInfo')
    register('caregivingManagerInfo')
    register('caregivingManagerInfo.managingUserId')
    register('caregivingManagerInfo.organizationId')
    register('caregivingManagerInfo.organizationType')
  }, [register])

  return (
    <form
      onSubmit={handleSubmit(
        onValid(applicationFile, deleteApplicationFile),
        onInvalid,
      )}
    >
      <Box flexDirection="row" gap="xxl">
        <Card.RowGroup flex={1}>
          {isReceptionCanceled && (
            <>
              <Card.Row>
                <Box flex={1} flexDirection="row" gap="md">
                  <Card.Item title="취소일시">
                    <Card.Input
                      disabled
                      readonly
                      value={
                        (data.canceledDateTime &&
                          formatDateTimeText(data.canceledDateTime)) ||
                        ''
                      }
                    />
                  </Card.Item>
                  <Card.Item title="취소 사유">
                    <Card.Input
                      disabled
                      readonly
                      value={
                        RECEPTION_CANCELLATION_REASON[data.progressingStatus]
                      }
                    />
                  </Card.Item>
                </Box>
                <Card.Item flex={1} title="사유 상세">
                  <Card.Input
                    disabled
                    readonly
                    value={data.reasonForCancellation}
                  />
                </Card.Item>
              </Card.Row>
              <Card.Divider />
            </>
          )}

          <Card.RowGroup>
            <Card.Row>
              <Card.Item title="보험사명">
                <Card.Input disabled readonly value={INSURANCE_COMPANY} />
              </Card.Item>
              <Card.Item title="사고일시">
                <Card.Input
                  max={MAX_DATE_TIME_VALUE}
                  register={register(
                    'accidentInfo.accidentDateTime',
                    receptionUpdateConstraints['accidentInfo.accidentDateTime'],
                  )}
                  type="datetime-local"
                />
              </Card.Item>
              <Card.Item title="접수 등록일자">
                <Card.Input
                  disabled
                  readonly
                  value={formatDate(data.receivedDateTime)}
                />
              </Card.Item>
              <Card.Item title="등록 담당자">
                <Card.Input
                  disabled
                  readonly
                  value={registerManagerData?.name}
                />
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Card.Item title="사고번호">
                <Card.Input
                  register={register(
                    'accidentInfo.accidentNumber',
                    receptionUpdateConstraints['accidentInfo.accidentNumber'],
                  )}
                />
              </Card.Item>
              <Card.Item title="증권번호">
                <Card.Input
                  register={register(
                    'insuranceInfo.insuranceNumber',
                    receptionUpdateConstraints['insuranceInfo.insuranceNumber'],
                  )}
                />
              </Card.Item>
              <Card.Item title="고객명">
                <Card.Input
                  register={register(
                    'patientInfo.name',
                    receptionUpdateConstraints['patientInfo.name'],
                  )}
                />
              </Card.Item>
              <Card.Item isOptional title="닉네임">
                <Card.Input register={register('patientInfo.nickname')} />
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Card.Item title="만 나이 (세)">
                <FormattingInput
                  constraints={receptionUpdateConstraints}
                  control={control}
                  fieldName="patientInfo.age"
                  formatter={formatNumberWithComma}
                />
              </Card.Item>
              <Card.Item title="성별">
                <Box flexDirection="row" gap="xs">
                  <Radio
                    color="primary"
                    onClick={(): void => setValue('patientInfo.sex', 'MALE')}
                    value={watch('patientInfo.sex') === 'MALE'}
                  >
                    <Typography variant="body3">남자</Typography>
                  </Radio>
                  <Radio
                    color="primary"
                    onClick={(): void => setValue('patientInfo.sex', 'FEMALE')}
                    value={watch('patientInfo.sex') === 'FEMALE'}
                  >
                    <Typography variant="body3">여자</Typography>
                  </Radio>
                </Box>
              </Card.Item>
              <Card.Item title="연락처 I">
                <Box flexDirection="row" gap="xs">
                  <Box flex={6}>
                    <FormattingInput
                      constraints={receptionUpdateConstraints}
                      control={control}
                      fieldName="patientInfo.primaryContact.phoneNumber"
                      formatter={formatPhoneNumberWithHyphen}
                      placeholder="휴대폰 번호"
                    />
                  </Box>
                  <Box flex={4}>
                    <Card.Input
                      placeholder="관계"
                      register={register(
                        'patientInfo.primaryContact.relationshipWithPatient',
                        receptionUpdateConstraints[
                          'patientInfo.primaryContact.relationshipWithPatient'
                        ],
                      )}
                    />
                  </Box>
                </Box>
              </Card.Item>
              <Card.Item isOptional title="연락처 II">
                <Box flexDirection="row" gap="xs">
                  <Box flex={6}>
                    <FormattingInput
                      constraints={receptionUpdateConstraints}
                      control={control}
                      fieldName="patientInfo.secondaryContact.phoneNumber"
                      formatter={formatPhoneNumberWithHyphen}
                      placeholder="휴대폰 번호"
                    />
                  </Box>
                  <Box flex={4}>
                    <Card.Input
                      placeholder="관계"
                      register={register(
                        'patientInfo.secondaryContact.relationshipWithPatient',
                        receptionUpdateConstraints[
                          'patientInfo.secondaryContact.relationshipWithPatient'
                        ],
                      )}
                    />
                  </Box>
                </Box>
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Card.Item title="청구유형">
                <Box flexDirection="row" gap="xs">
                  <Radio
                    color="primary"
                    onClick={(): void =>
                      setValue('accidentInfo.claimType', 'SICKNESS')
                    }
                    value={watch('accidentInfo.claimType') === 'SICKNESS'}
                  >
                    <Typography variant="body3">질병</Typography>
                  </Radio>
                  <Radio
                    color="primary"
                    onClick={(): void =>
                      setValue('accidentInfo.claimType', 'ACCIDENT')
                    }
                    value={watch('accidentInfo.claimType') === 'ACCIDENT'}
                  >
                    <Typography variant="body3">상해</Typography>
                  </Radio>
                </Box>
              </Card.Item>
              <Card.Item title="청약일자">
                <Card.Input
                  max={MAX_DATE_VALUE}
                  register={register(
                    'insuranceInfo.subscriptionDate',
                    receptionUpdateConstraints[
                      'insuranceInfo.subscriptionDate'
                    ],
                  )}
                  type="date"
                />
              </Card.Item>
              <Card.Item title="가입담보">
                <ComboBox
                  items={getCoverageOptions(coverageListData)}
                  onSelect={(value): void =>
                    setValue('insuranceInfo.coverageId', value)
                  }
                  value={watch('insuranceInfo.coverageId')}
                />
              </Card.Item>
              <Card.Item title="한도일">
                <FormattingInput
                  constraints={receptionUpdateConstraints}
                  control={control}
                  fieldName="insuranceInfo.caregivingLimitPeriod"
                  formatter={formatNumberWithComma}
                />
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Box flex={1} flexDirection="row" gap="md">
                <Card.Item title="예상 한도일자">
                  <Card.Input
                    max={MAX_DATE_VALUE}
                    register={register(
                      'expectedCaregivingLimitDate',
                      receptionUpdateConstraints['expectedCaregivingLimitDate'],
                    )}
                    type="date"
                  />
                </Card.Item>
                <Card.Item title="알림톡/비즈콜 수신">
                  <Box flexDirection="row" gap="xs">
                    <Radio
                      color="primary"
                      onClick={(): void =>
                        setValue('notifyCaregivingProgress', true)
                      }
                      value={watch('notifyCaregivingProgress')}
                    >
                      <Typography variant="body3">수신</Typography>
                    </Radio>
                    <Radio
                      color="primary"
                      onClick={(): void =>
                        setValue('notifyCaregivingProgress', false)
                      }
                      value={!watch('notifyCaregivingProgress')}
                    >
                      <Typography variant="body3">미수신</Typography>
                    </Radio>
                  </Box>
                </Card.Item>
              </Box>
              <Card.Item flex={1} isOptional title="간병인 신청서">
                <InputFile
                  existingFileName={
                    deleteApplicationFile
                      ? null
                      : existingApplicationFile?.fileName
                  }
                  file={deleteApplicationFile ? null : applicationFile}
                  onClear={handleOnApplicationFileClear}
                  onSelect={handleOnApplicationFileChange}
                  renderUploadButton={(onClick): ReactElement => (
                    <Chip
                      color="fontPrimary"
                      onClick={onClick}
                      size="sm"
                      variant="tertiary"
                    >
                      업로드
                    </Chip>
                  )}
                />
              </Card.Item>
            </Card.Row>
          </Card.RowGroup>
          <Card.Divider />

          <Card.RowGroup>
            <Card.Row>
              <Card.Item title="입원일시">
                <Card.Input
                  max={MAX_DATE_TIME_VALUE}
                  register={register(
                    'accidentInfo.admissionDateTime',
                    receptionUpdateConstraints[
                      'accidentInfo.admissionDateTime'
                    ],
                  )}
                  type="datetime-local"
                />
              </Card.Item>
              <Card.Item title="병실정보">
                <Card.Input
                  onClick={handleOnClickHospitalRoomInfo}
                  readonly
                  value={generateHospitalRoomInfoText(
                    watch('accidentInfo.hospitalRoomInfo'),
                  )}
                />
              </Card.Item>
              <Card.Item title="희망일자">
                <Card.Input
                  max={MAX_DATE_VALUE}
                  register={register(
                    'desiredCaregivingStartDate',
                    receptionUpdateConstraints['desiredCaregivingStartDate'],
                  )}
                  type="date"
                />
              </Card.Item>
              <Card.Item title="희망기간 (일)">
                <FormattingInput
                  constraints={receptionUpdateConstraints}
                  control={control}
                  fieldName="desiredCaregivingPeriod"
                  formatter={formatNumberWithComma}
                />
              </Card.Item>
            </Card.Row>
            <Card.Row>
              <Card.Item fixedHeight={false} isOptional title="환자상태">
                <Card.Input
                  forcedInput={false}
                  hideMaxLengthText={false}
                  maxLength={MAX_LENGTH.TEXTAREA}
                  register={register('accidentInfo.patientDescription')}
                  value={watch('accidentInfo.patientDescription')}
                />
              </Card.Item>
              <Card.Item fixedHeight={false} isOptional title="요청사항">
                <Card.Input
                  forcedInput={false}
                  hideMaxLengthText={false}
                  maxLength={MAX_LENGTH.TEXTAREA}
                  register={register('additionalRequests')}
                  value={watch('additionalRequests')}
                />
              </Card.Item>
            </Card.Row>
          </Card.RowGroup>
          <Card.Divider />

          <Card.Row>
            <Box flex={1} flexDirection="row" gap="md">
              <Card.Item title="키 (cm)">
                <FormattingInput
                  constraints={receptionUpdateConstraints}
                  control={control}
                  fieldName="patientInfo.height"
                  formatter={formatNumberWithComma}
                />
              </Card.Item>
              <Card.Item title="몸무게 (kg)">
                <FormattingInput
                  constraints={receptionUpdateConstraints}
                  control={control}
                  fieldName="patientInfo.weight"
                  formatter={formatNumberWithComma}
                />
              </Card.Item>
            </Box>
            <Card.Item flex={1} title="배정 담당자">
              {(caregivingManagerData &&
                caregivingManagerInfo.organizationType && (
                  <Card.Input
                    onClick={handleOnClickCaregivingManagerInfo}
                    readonly
                    value={
                      generateCaregivingManagerInfoText(
                        caregivingManagerInfo.organizationType,
                        caregivingManagerData,
                        externalCaregivingOrganization,
                      ) || ''
                    }
                  />
                )) || (
                <InfoBox size="sm" state="warning" style={{height: sizes.sm}}>
                  담당자 배정을 진행해 주세요.
                </InfoBox>
              )}
            </Card.Item>
          </Card.Row>
        </Card.RowGroup>
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

export default ReceptionInfoInternalManagerForm
