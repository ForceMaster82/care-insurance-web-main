/* eslint-disable unicorn/filename-case */
import {Box, InfoBox, Input, Textarea} from '@caredoc/ui-web'
import React, {ReactElement, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {differenceInSeconds} from 'date-fns'
import Modal from '../../../../components/Modal'
import ReceptionCaregivingRoundResource from '../../../../models/dto/reception-caregiving-round/Resource'
import Card from '../../../../components/Card'
import {
  MAX_DATE_TIME_VALUE,
  MAX_DATE_VALUE,
  MAX_LENGTH,
} from '../../../../constraints/input'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import useReceptionUpdate from '../../../../hooks/api/reception/use-reception-update'
import {formatDate} from '../../../../utils/date'
import ReceptionUpdateInput from '../../../../models/dto/reception/UpdateInput'
import {isLocalServerErrorType} from '../../../../utils/fetcher'
import {SERVER_ERROR_MESSAGE} from '../../../../constants/server-error'
import ReceptionCaregivingRoundInput from '~models/dto/reception-caregiving-round/Input'
import useCaregivingRoundUpdate from '~hooks/api/caregiving-round/use-caregiving-round-update'

interface IProps {
  caregivingRoundResource: ReceptionCaregivingRoundResource
  onClickClose: () => void
}

const isValid = (startDateTime: Date, endDateTime: Date): boolean => {
  return differenceInSeconds(endDateTime, startDateTime) >= 0
}

const CaregivingStopModal = (props: IProps): ReactElement => {
  const {onClickClose, caregivingRoundResource} = props

  const [caregivingEndDateTime, setCaregivingEndDateTime] = useState('')
  const [expectedCaregivingStartDate, setExpectedCaregivingStartDate] =
    useState('')
  const [remarks, setRemarks] = useState(caregivingRoundResource.remarks)

  const queryClient = useQueryClient()

  const {data: receptionData} = useReceptionDetail({
    onSuccess: (data) => {
      data.expectedCaregivingStartDate &&
        setExpectedCaregivingStartDate(
          formatDate(data.expectedCaregivingStartDate),
        )
    },
    receptionId: caregivingRoundResource.receptionInfo.receptionId,
    unmaskedProperty: [
      'PATIENT_NAME',
      'PATIENT_PRIMARY_PHONE_NUMBER',
      'PATIENT_SECONDARY_PHONE_NUMBER',
    ],
  })
  const {mutateAsync: updateCaregivingRound} = useCaregivingRoundUpdate()
  const {mutateAsync: updateReception} = useReceptionUpdate()

  const handleOnSubmit = async (): Promise<void> => {
    if (!caregivingRoundResource.startDateTime || !caregivingEndDateTime) {
      return
    }

    if (
      !isValid(
        caregivingRoundResource.startDateTime,
        new Date(caregivingEndDateTime),
      )
    ) {
      // eslint-disable-next-line no-alert
      alert('종료일시는 시작일시보다 작을 수 없습니다.')
      return
    }

    try {
      const caregivingRoundInput = new ReceptionCaregivingRoundInput(
        caregivingRoundResource,
      )
      caregivingRoundInput.data = {
        ...caregivingRoundInput.data,
        caregivingProgressingStatus: 'COMPLETED_RESTARTING',
        endDateTime: caregivingEndDateTime,
        remarks,
      }

      await updateCaregivingRound({
        pathParams: {caregivingRoundId: caregivingRoundResource.id},
        payload: caregivingRoundInput.input,
      })

      queryClient.invalidateQueries({
        queryKey: [
          'reception-caregiving-round',
          'list',
          {receptionId: caregivingRoundResource.receptionInfo.receptionId},
        ],
      })
      queryClient.invalidateQueries({
        queryKey: [
          'reception-caregiving-round-modification',
          {receptionId: caregivingRoundResource.receptionInfo.receptionId},
        ],
      })

      const receptionInput = new ReceptionUpdateInput(receptionData)
      receptionInput.expectedCaregivingStartDate = expectedCaregivingStartDate

      await updateReception({
        pathParams: {
          receptionId: caregivingRoundResource.receptionInfo.receptionId,
        },
        payload: receptionInput.input,
      })

      queryClient.invalidateQueries({
        queryKey: [
          'reception',
          'detail',
          {id: caregivingRoundResource.receptionInfo.receptionId},
        ],
      })
      queryClient.invalidateQueries({
        queryKey: [
          'reception-modification',
          {receptionId: caregivingRoundResource.receptionInfo.receptionId},
        ],
      })

      onClickClose()
    } catch (error) {
      if (error instanceof Error) {
        const errorType = isLocalServerErrorType(error)
        // eslint-disable-next-line no-alert
        errorType && alert(SERVER_ERROR_MESSAGE[errorType] || error.message)
      }
    }
  }

  return (
    <Modal
      closeIndicationType="button"
      disabled={!caregivingEndDateTime}
      modalWidth="sm"
      onClose={onClickClose}
      onSubmit={handleOnSubmit}
      title={`${caregivingRoundResource.caregivingRoundNumber}회차 종료일시 입력 (중단-계속) `}
    >
      <Box gap="sm">
        <Card.Item title="간병 종료일시">
          <Input
            max={MAX_DATE_TIME_VALUE}
            onTextChange={setCaregivingEndDateTime}
            type="datetime-local"
            value={caregivingEndDateTime}
          />
        </Card.Item>
        <Card.Item isOptional title="간병 예상일자">
          <Input
            max={MAX_DATE_VALUE}
            onTextChange={setExpectedCaregivingStartDate}
            type="date"
            value={expectedCaregivingStartDate}
          />
        </Card.Item>
        <Card.Item fixedHeight={false} isOptional title="메모">
          <Textarea
            maxLength={MAX_LENGTH.TEXTAREA}
            onTextChange={setRemarks}
            value={remarks}
          />
        </Card.Item>
        <InfoBox size="md" state="info">
          종료일시 입력 후, 정산/청구를 위해 간병비 산정을 진행해 주시기
          바랍니다.
        </InfoBox>
      </Box>
    </Modal>
  )
}

export default CaregivingStopModal
