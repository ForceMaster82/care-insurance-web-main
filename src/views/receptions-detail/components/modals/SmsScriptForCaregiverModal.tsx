/* eslint-disable no-alert */
import React, {ReactElement} from 'react'
import {Box, Typography} from '@caredoc/ui-web'
import Modal from '../../../../components/Modal'
import {generateHospitalRoomInfoText} from '../../../../utils/text-transformation'
import {EMPTY_VALUE_TEXT, SEX} from '../../../../constants'
import {formatPhoneNumberWithHyphen} from '../../../../utils/formatter'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import {formatDate} from '../../../../utils/date'

interface IProps {
  onClickClose: () => void
  receptionId: string
}

const SmsScriptForCaregiverModal = (props: IProps): ReactElement | null => {
  const {onClickClose, receptionId} = props

  const {data} = useReceptionDetail({
    receptionId,
    unmaskedProperty: ['PATIENT_NAME', 'PATIENT_PRIMARY_PHONE_NUMBER'],
  })

  if (!data) {
    return null
  }

  const {
    accidentInfo: {hospitalRoomInfo, patientDescription},
    patientInfo: {name, sex, age, primaryContact},
    desiredCaregivingStartDate,
    desiredCaregivingPeriod,
    additionalRequest,
  } = data

  const scriptText = `${generateHospitalRoomInfoText(
    hospitalRoomInfo,
  )}\n${name} / ${
    SEX[sex]
  } / 만 ${age}세 / ${patientDescription}\n\n연락처: ${formatPhoneNumberWithHyphen(
    primaryContact.phoneNumber,
  )} (${primaryContact.relationshipWithPatient})\n시작희망일: ${formatDate(
    desiredCaregivingStartDate,
  )}\n예상기간: ${
    (typeof desiredCaregivingPeriod === 'number' &&
      `${desiredCaregivingPeriod}일`) ||
    '미정'
  }\n요청사항: ${
    additionalRequest || EMPTY_VALUE_TEXT
  }\n일일 간병비(간병인에게 지급 일당): `

  const handleOnClickScriptText = (): void => {
    navigator.clipboard
      .writeText(scriptText)
      .then(() => alert('복사되었습니다.'))
      .catch(() => alert('오류가 발생하여 복사를 할 수 없습니다.'))
  }

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="sm"
      onClose={onClickClose}
      title="SMS 스크립트"
    >
      <Box
        backgroundColor="bgPrimary"
        borderRadius="md"
        elevation="elevation-1"
        my="xxs"
        onClick={handleOnClickScriptText}
        p="sm"
        variant="shadow"
      >
        <Typography>{scriptText}</Typography>
      </Box>
    </Modal>
  )
}

export default SmsScriptForCaregiverModal
