/* eslint-disable no-alert */
import React, {ReactElement} from 'react'
import {Box, Typography} from '@caredoc/ui-web'
import Modal from '../../../../components/Modal'
import {EMPTY_VALUE_TEXT, SEX} from '../../../../constants'

import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import {formatDate} from '../../../../utils/date'

interface IProps {
  onClickClose: () => void
  receptionId: string
}

const SmsScriptForPersonalCaregiverApprovalModal = (
  props: IProps,
): ReactElement | null => {
  const {onClickClose, receptionId} = props

  const {data} = useReceptionDetail({
    receptionId,
    unmaskedProperty: ['PATIENT_NAME', 'PATIENT_PRIMARY_PHONE_NUMBER'],
  })

  if (!data) {
    return null
  }

  const {
    accidentInfo: {accidentNumber},
    patientInfo: {name, sex, age},
    canceledDateTime,
    reasonForCancellation,
    insuranceInfo: {insuranceNumber},
  } = data

  const canceledDateText =
    (canceledDateTime && formatDate(canceledDateTime)) || EMPTY_VALUE_TEXT

  const scriptText =
    '[개인구인승인 요청] 사고번호 ' +
    accidentNumber +
    ' / ' +
    name +
    ' / ' +
    SEX[sex] +
    ' / ' +
    '만 ' +
    age +
    '세\n\n안녕하세요~ 케어닥 입니다.\n개인구인 승인 요청드립니다.\n\n간병인지원서비스 개인구인 승인 요청\n요청일: ' +
    canceledDateText +
    '\n업체명: 케어닥\n사고번호: ' +
    accidentNumber +
    '\n피보험자 성명: ' +
    name +
    '\n증권번호: ' +
    insuranceNumber +
    '\n사유: ' +
    (reasonForCancellation || EMPTY_VALUE_TEXT) +
    '\n\n업체 의견: 개인구인 승인합니다.\n문의처(담당자) 케어닥 1833-2799'

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
      title="메리츠 발송 스크립트"
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

export default SmsScriptForPersonalCaregiverApprovalModal
