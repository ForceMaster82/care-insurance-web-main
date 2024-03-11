/* eslint-disable react/jsx-max-depth */
import {
  Box,
  Button,
  Checkbox,
  ComboBox,
  Input,
  Radio,
  Textarea,
  Typography,
} from '@caredoc/ui-web'
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {SubmitErrorHandler, SubmitHandler, useForm} from 'react-hook-form'
import {sizes} from '@caredoc/ui-master'
import InputFile from '../receptions/components/InputFile'
import {extractMeritzReceptionData} from '../../utils/pdf-data-extract/meritz'
import CoverageListResource from '../../models/dto/coverage/ListResource'
import {getCoverageOptions} from '../../utils/option'
import Card from '../../components/Card'
import FormattingInput from '../../components/inputs/FormattingInput'
import {
  formatNumberWithComma,
  formatPhoneNumberWithHyphen,
} from '../../utils/formatter'
import ReceptionCreateInput from '../../models/dto/reception/CreateInput'
import {MAX_DATE_TIME_VALUE, MAX_DATE_VALUE} from '../../constraints/input'
import PdfViewer from './components/PdfViewer'
import {
  buttonWidths,
  claimTypes,
  comboBoxWidths,
  inputWidths,
  sexItems,
} from '~constants'
import {ReceptionCreateData} from '~types/form'
import {receptionCreateConstraints} from '~constraints/reception'

const Section = ({children}: PropsWithChildren<unknown>): ReactElement => {
  return (
    <Box backgroundColor="bgPrimary" borderRadius="md" gap="lg" p="sm">
      {children}
    </Box>
  )
}

interface IProps {
  coverages: CoverageListResource[]
  onCancel: (isFormDirty: boolean) => void
  onInvalid: SubmitErrorHandler<ReceptionCreateData>
  onValid: (applicationFile?: File | null) => SubmitHandler<ReceptionCreateData>
}

const ReceptionsRegistrationView = (props: IProps): ReactElement => {
  const {onCancel, coverages, onValid, onInvalid} = props

  const [applicationFile, setApplicationFile] = useState<File | null>(null)

  const {formState, register, setValue, watch, control, handleSubmit} =
    useForm<ReceptionCreateData>({
      defaultValues: new ReceptionCreateInput().data,
      reValidateMode: 'onSubmit',
      shouldFocusError: false,
    })
  const {isDirty} = formState

  const coverageOptions = useMemo(
    () => getCoverageOptions(coverages),
    [coverages],
  )

  const handleOnSelectApplicationFile = async (file: File): Promise<void> => {
    setApplicationFile(file)

    try {
      const meritzReception = await extractMeritzReceptionData(file)
      const result = meritzReception.getReceptionCreateData()

      setValue('insuranceInfo', result.insuranceInfo, {shouldDirty: true})
      setValue('accidentInfo', result.accidentInfo, {shouldDirty: true})
      setValue('insuranceManagerInfo', result.insuranceManagerInfo, {
        shouldDirty: true,
      })
      setValue('patientInfo', result.patientInfo, {shouldDirty: true})
      setValue('additionalRequests', result.additionalRequests, {
        shouldDirty: true,
      })
      setValue(
        'desiredCaregivingStartDate',
        result.desiredCaregivingStartDate,
        {shouldDirty: true},
      )
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert((error as Error).message)
    }
  }

  useEffect(() => {
    register('notifyCaregivingProgress')
    register('urgency')
    register('patientInfo.sex', receptionCreateConstraints['patientInfo.sex'])
    register(
      'accidentInfo.claimType',
      receptionCreateConstraints['accidentInfo.claimType'],
    )
    register(
      'insuranceInfo.coverageId',
      receptionCreateConstraints['insuranceInfo.coverageId'],
    )
    register(
      'fixedDesiredCaregivingPeriod',
      receptionCreateConstraints['fixedDesiredCaregivingPeriod'],
    )
  }, [register])

  return (
    <form onSubmit={handleSubmit(onValid(applicationFile), onInvalid)}>
      <Box backgroundColor="bgSecondary" gap="sm" pb="xl" pt="lg" px="sm">
        {/** title */}
        <Box backgroundColor="bgPrimary" borderRadius="md" px="sm" py="xs">
          <Typography textColor="fontPrimary" variant="heading6">
            접수 등록
          </Typography>
        </Box>
        {/** form */}
        <Box flexDirection="row" gap="sm">
          <Box flex={1} gap="sm">
            <Section>
              <Box flexDirection="row" gap="sm">
                <Card.Item title="접수 등록일자">
                  <Input
                    max={MAX_DATE_VALUE}
                    register={register(
                      'receivedDateTime',
                      receptionCreateConstraints['receivedDateTime'],
                    )}
                    size="sm"
                    type="date"
                  />
                </Card.Item>
                <Card.Item title="신청서 PDF">
                  <InputFile
                    file={applicationFile}
                    onClear={(): void => setApplicationFile(null)}
                    onSelect={handleOnSelectApplicationFile}
                  />
                </Card.Item>
              </Box>
            </Section>
            {/* 사고정보 */}
            <Section>
              <Typography textColor="fontPrimary" variant="subtitle1">
                사고 정보
              </Typography>
              <Box gap="md">
                {/* 1st Col */}
                <Box flexDirection="row" gap="sm">
                  <Card.Item fixedHeight={false} title="사고번호">
                    <Input
                      hint="‘-’ 포함하여 입력"
                      register={register(
                        'accidentInfo.accidentNumber',
                        receptionCreateConstraints[
                          'accidentInfo.accidentNumber'
                        ],
                      )}
                      size="sm"
                    />
                  </Card.Item>
                  <Card.Item fixedHeight={false} title="증권번호">
                    <Input
                      hint="‘-’ 포함하여 입력"
                      register={register(
                        'insuranceInfo.insuranceNumber',
                        receptionCreateConstraints[
                          'insuranceInfo.insuranceNumber'
                        ],
                      )}
                      size="sm"
                    />
                  </Card.Item>
                </Box>
                {/* 2nd Col */}
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="고객정보">
                    <Box alignItems="center" flexDirection="row" gap="xs">
                      <Box flex={1}>
                        <Input
                          placeholder="피보험자명"
                          register={register(
                            'patientInfo.name',
                            receptionCreateConstraints['patientInfo.name'],
                          )}
                          size="sm"
                        />
                      </Box>
                      <Box width={inputWidths.sm}>
                        <FormattingInput
                          constraints={receptionCreateConstraints}
                          control={control}
                          fieldName="patientInfo.age"
                          formatter={formatNumberWithComma}
                          placeholder="만 나이"
                        />
                      </Box>
                      <Typography variant="body4">세</Typography>
                      <Box width={comboBoxWidths.sm}>
                        <ComboBox
                          items={sexItems}
                          onSelect={(value): void => {
                            return setValue('patientInfo.sex', value, {
                              shouldDirty: true,
                            })
                          }}
                          selectionText="성별"
                          value={watch('patientInfo.sex')}
                        />
                      </Box>
                    </Box>
                  </Card.Item>
                  <Card.Item isOptional title="닉네임">
                    <Input
                      register={register('patientInfo.nickname')}
                      size="sm"
                    />
                  </Card.Item>
                </Box>
                {/* 3rd Col */}
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="사고일시">
                    <Input
                      max={MAX_DATE_TIME_VALUE}
                      register={register(
                        'accidentInfo.accidentDateTime',
                        receptionCreateConstraints[
                          'accidentInfo.accidentDateTime'
                        ],
                      )}
                      size="sm"
                      type="datetime-local"
                    />
                  </Card.Item>
                  <Card.Item title="청구유형">
                    <ComboBox
                      items={claimTypes}
                      onSelect={(value): void =>
                        setValue('accidentInfo.claimType', value, {
                          shouldDirty: true,
                        })
                      }
                      value={watch('accidentInfo.claimType')}
                    />
                  </Card.Item>
                </Box>
                {/* 4th Col */}
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="청약일자">
                    <Input
                      max={MAX_DATE_VALUE}
                      register={register(
                        'insuranceInfo.subscriptionDate',
                        receptionCreateConstraints[
                          'insuranceInfo.subscriptionDate'
                        ],
                      )}
                      size="sm"
                      type="date"
                    />
                  </Card.Item>
                  <Card.Item title="한도일">
                    <FormattingInput
                      constraints={receptionCreateConstraints}
                      control={control}
                      fieldName="insuranceInfo.caregivingLimitPeriod"
                      formatter={formatNumberWithComma}
                    />
                  </Card.Item>
                </Box>
                {/* 5th Col */}
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="가입담보">
                    <ComboBox
                      items={coverageOptions}
                      onSelect={(value): void =>
                        setValue('insuranceInfo.coverageId', value, {
                          shouldDirty: true,
                        })
                      }
                      value={watch('insuranceInfo.coverageId')}
                    />
                  </Card.Item>
                  <Card.Item title="알림톡/비즈콜 수신">
                    <Box
                      alignItems="center"
                      flexDirection="row"
                      gap="xs"
                      height={sizes.sm}
                    >
                      <Radio
                        color="primary"
                        onClick={(): void =>
                          setValue('notifyCaregivingProgress', true, {
                            shouldDirty: true,
                          })
                        }
                        size="sm"
                        value={watch('notifyCaregivingProgress')}
                      >
                        <Typography variant="body3">수신</Typography>
                      </Radio>
                      <Radio
                        color="primary"
                        onClick={(): void =>
                          setValue('notifyCaregivingProgress', false, {
                            shouldDirty: true,
                          })
                        }
                        size="sm"
                        value={!watch('notifyCaregivingProgress')}
                      >
                        <Typography variant="body3">미수신</Typography>
                      </Radio>
                    </Box>
                  </Card.Item>
                </Box>
              </Box>
            </Section>
            {/* 입원정보 */}
            <Section>
              <Typography textColor="fontPrimary" variant="subtitle1">
                입원 정보
              </Typography>
              <Box gap="md">
                {/* 1st */}
                <Card.Item fixedHeight={false} isOptional title="환자상태">
                  <Textarea
                    maxLength={4000}
                    register={register('accidentInfo.patientDescription')}
                    value={watch('accidentInfo.patientDescription')}
                  />
                </Card.Item>
                {/* 2nd */}
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="입원일시">
                    <Input
                      max={MAX_DATE_TIME_VALUE}
                      register={register(
                        'accidentInfo.admissionDateTime',
                        receptionCreateConstraints[
                          'accidentInfo.admissionDateTime'
                        ],
                      )}
                      size="sm"
                      type="datetime-local"
                    />
                  </Card.Item>
                  <Card.Item title="희망일자">
                    <Input
                      max={MAX_DATE_VALUE}
                      register={register(
                        'desiredCaregivingStartDate',
                        receptionCreateConstraints[
                          'desiredCaregivingStartDate'
                        ],
                      )}
                      size="sm"
                      type="date"
                    />
                  </Card.Item>
                </Box>
                {/* 3rd */}
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="병실정보">
                    <Input
                      register={register(
                        'accidentInfo.hospitalRoomInfo.hospitalAndRoom',
                        receptionCreateConstraints[
                          'accidentInfo.hospitalRoomInfo.hospitalAndRoom'
                        ],
                      )}
                      size="sm"
                    />
                  </Card.Item>
                  <Card.Item title="희망기간 (일)">
                    <Box alignItems="center" flexDirection="row" gap="md">
                      <Box
                        alignItems="center"
                        flex={1}
                        flexDirection="row"
                        gap="xs"
                      >
                        <Box flex={1}>
                          <FormattingInput
                            constraints={receptionCreateConstraints}
                            control={control}
                            disabled={watch('fixedDesiredCaregivingPeriod')}
                            fieldName="desiredCaregivingPeriod"
                            formatter={formatNumberWithComma}
                            placeholder="일 수 입력"
                            readonly={watch('fixedDesiredCaregivingPeriod')}
                          />
                        </Box>
                        <Checkbox
                          color="primary"
                          onClick={(): void => {
                            setValue(
                              'fixedDesiredCaregivingPeriod',
                              !watch('fixedDesiredCaregivingPeriod'),
                              {shouldDirty: true},
                            )
                          }}
                          size="sm"
                          value={watch('fixedDesiredCaregivingPeriod')}
                        >
                          <Typography textColor="fontPrimary" variant="body3">
                            미정
                          </Typography>
                        </Checkbox>
                      </Box>
                      <Checkbox
                        color="primary"
                        onClick={(): void =>
                          watch('urgency') !== 'URGENT'
                            ? setValue('urgency', 'URGENT', {shouldDirty: true})
                            : setValue('urgency', 'NORMAL', {shouldDirty: true})
                        }
                        size="sm"
                        value={watch('urgency') === 'URGENT'}
                      >
                        <Typography textColor="fontPrimary" variant="body3">
                          긴급
                        </Typography>
                      </Checkbox>
                    </Box>
                  </Card.Item>
                </Box>
                {/* 4th */}
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="연락처 I">
                    <Box flexDirection="row" gap="xs">
                      <Box flex={1}>
                        <FormattingInput
                          constraints={receptionCreateConstraints}
                          control={control}
                          fieldName="patientInfo.primaryContact.phoneNumber"
                          formatter={formatPhoneNumberWithHyphen}
                          placeholder="휴대폰 번호"
                        />
                      </Box>
                      <Box flex={1}>
                        <Input
                          placeholder="관계"
                          register={register(
                            'patientInfo.primaryContact.relationshipWithPatient',
                            receptionCreateConstraints[
                              'patientInfo.primaryContact.relationshipWithPatient'
                            ],
                          )}
                          size="sm"
                        />
                      </Box>
                    </Box>
                  </Card.Item>
                  <Card.Item isOptional title="연락처 II">
                    <Box flexDirection="row" gap="xs">
                      <Box flex={1}>
                        <FormattingInput
                          constraints={receptionCreateConstraints}
                          control={control}
                          fieldName="patientInfo.secondaryContact.phoneNumber"
                          formatter={formatPhoneNumberWithHyphen}
                          placeholder="휴대폰 번호"
                        />
                      </Box>
                      <Box flex={1}>
                        <Input
                          placeholder="관계"
                          register={register(
                            'patientInfo.secondaryContact.relationshipWithPatient',
                            receptionCreateConstraints[
                              'patientInfo.secondaryContact.relationshipWithPatient'
                            ],
                          )}
                          size="sm"
                        />
                      </Box>
                    </Box>
                  </Card.Item>
                </Box>
                {/* 5th */}
                <Card.Item fixedHeight={false} isOptional title="요청사항">
                  <Textarea
                    maxLength={4000}
                    register={register('additionalRequests')}
                    value={watch('additionalRequests')}
                  />
                </Card.Item>
              </Box>
            </Section>
            {/* 담당자 정보 */}
            <Section>
              <Typography textColor="fontPrimary" variant="subtitle1">
                담당자 정보
              </Typography>
              <Box gap="sm">
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="보험사명">
                    <Input disabled placeholder="메리츠화재" readonly />
                  </Card.Item>
                  <Card.Item title="접수부점">
                    <Input
                      register={register(
                        'insuranceManagerInfo.branchName',
                        receptionCreateConstraints[
                          'insuranceManagerInfo.branchName'
                        ],
                      )}
                      size="sm"
                    />
                  </Card.Item>
                </Box>
                <Box flexDirection="row" gap="sm">
                  <Card.Item title="접수자">
                    <Input
                      register={register(
                        'insuranceManagerInfo.receptionistName',
                        receptionCreateConstraints[
                          'insuranceManagerInfo.receptionistName'
                        ],
                      )}
                      size="sm"
                    />
                  </Card.Item>
                  <Card.Item isOptional title="연락처">
                    <FormattingInput
                      constraints={receptionCreateConstraints}
                      control={control}
                      fieldName="insuranceManagerInfo.phoneNumber"
                      formatter={formatPhoneNumberWithHyphen}
                    />
                  </Card.Item>
                </Box>
              </Box>
            </Section>
            {/** buttons */}
            <Box flexDirection="row" gap="xs">
              <Box width={buttonWidths.sm}>
                <Button
                  color="fontSecondary"
                  onClick={(): void => onCancel(isDirty)}
                  size="sm"
                  variant="tertiary"
                >
                  취소
                </Button>
              </Box>
              <Box width={buttonWidths.sm}>
                <button type="submit">
                  <Button color="primary" size="sm" variant="primary">
                    완료
                  </Button>
                </button>
              </Box>
            </Box>
          </Box>
          <PdfViewer file={applicationFile} />
        </Box>
      </Box>
    </form>
  )
}
export default ReceptionsRegistrationView
