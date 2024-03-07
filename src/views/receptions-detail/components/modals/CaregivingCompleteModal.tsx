/* eslint-disable unicorn/filename-case */
import {Box, ComboBox, InfoBox, Input, Textarea} from '@caredoc/ui-web'
import React, {ReactElement, useMemo, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import {differenceInSeconds} from 'date-fns'
import Modal from '../../../../components/Modal'
import {caregivingRoundClosingReasons} from '../../../../constants'
import ReceptionCaregivingRoundResource from '../../../../models/dto/reception-caregiving-round/Resource'
import {
  CaregivingProgressingStatus,
  CaregivingRoundClosingReasonType,
} from '../../../../types'
import Card from '../../../../components/Card'
import {MAX_DATE_TIME_VALUE, MAX_LENGTH} from '../../../../constraints/input'
import useCaregivingRoundUpdate from '~hooks/api/caregiving-round/use-caregiving-round-update'
import ReceptionCaregivingRoundInput from '~models/dto/reception-caregiving-round/Input'

interface IProps {
  caregivingRoundResource: ReceptionCaregivingRoundResource
  onClickClose: () => void
}

const isValid = (startDateTime: Date, endDateTime: Date): boolean => {
  return differenceInSeconds(endDateTime, startDateTime) >= 0
}

const CaregivingCompleteModal = (props: IProps): ReactElement => {
  const {onClickClose, caregivingRoundResource} = props

  const [caregivingEndDateTime, setCaregivingEndDateTime] = useState('')
  const [caregivingClosingReasonType, setCaregivingClosingReasonType] =
    useState<CaregivingRoundClosingReasonType>('FINISHED')
  const [remarks, setRemarks] = useState(caregivingRoundResource.remarks)

  const caregivingProgressStatus: CaregivingProgressingStatus = useMemo(
    () =>
      caregivingClosingReasonType === 'FINISHED_USING_PERSONAL_CAREGIVER'
        ? 'COMPLETED_USING_PERSONAL_CAREGIVER'
        : 'COMPLETED',
    [caregivingClosingReasonType],
  )

  const {
    mutate: caregivingRoundUpdate,
    isLoading: isCaregivingRoundUpdateLoading,
  } = useCaregivingRoundUpdate()

  const queryClient = useQueryClient()

  const handleOnSubmit = (): void => {
    if (
      !caregivingRoundResource.startDateTime ||
      !caregivingEndDateTime ||
      isCaregivingRoundUpdateLoading
    ) {
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

    const caregivingRoundInput = new ReceptionCaregivingRoundInput(
      caregivingRoundResource,
    )

    caregivingRoundInput.data = {
      ...caregivingRoundInput.data,
      caregivingProgressingStatus: caregivingProgressStatus,
      caregivingRoundClosingReasonType: caregivingClosingReasonType,
      endDateTime: caregivingEndDateTime,
      remarks,
    }

    caregivingRoundUpdate(
      {
        pathParams: {caregivingRoundId: caregivingRoundResource.id},
        payload: caregivingRoundInput.input,
      },
      {
        onSuccess: () => {
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

          onClickClose()
        },
      },
    )
  }

  return (
    <Modal
      closeIndicationType="button"
      disabled={!caregivingEndDateTime || isCaregivingRoundUpdateLoading}
      modalWidth="sm"
      onClose={onClickClose}
      onSubmit={handleOnSubmit}
      title={`${caregivingRoundResource.caregivingRoundNumber}회차 종료일시 입력 (간병 종료)`}
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
        <Card.Item title="간병 종료 사유">
          <ComboBox<CaregivingRoundClosingReasonType>
            items={caregivingRoundClosingReasons}
            onSelect={setCaregivingClosingReasonType}
            value={caregivingClosingReasonType}
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
        <InfoBox size="md" state="info">
          다음 회차의 시작일시는 이번 회차의 종료일시로 자동 설정됩니다.
        </InfoBox>
      </Box>
    </Modal>
  )
}

export default CaregivingCompleteModal
