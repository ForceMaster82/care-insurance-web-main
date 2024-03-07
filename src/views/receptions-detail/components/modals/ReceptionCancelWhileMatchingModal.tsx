/* eslint-disable unicorn/filename-case */
import {Textarea} from '@caredoc/ui-web'
import React, {ReactElement, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import Modal from '../../../../components/Modal'
import Card from '../../../../components/Card'
import useReceptionUpdate from '../../../../hooks/api/reception/use-reception-update'
import ReceptionUpdateInput from '../../../../models/dto/reception/UpdateInput'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import {MAX_LENGTH} from '../../../../constraints/input'

interface IProps {
  onClickClose: () => void
  receptionId: string
}

const ReceptionCancelWhileMatchingModal = (props: IProps): ReactElement => {
  const {onClickClose, receptionId} = props

  const [detailedCancellationReason, setDetailedCancellationReason] =
    useState('')

  const {data: receptionData} = useReceptionDetail({
    receptionId,
    unmaskedProperty: [
      'PATIENT_NAME',
      'PATIENT_PRIMARY_PHONE_NUMBER',
      'PATIENT_SECONDARY_PHONE_NUMBER',
    ],
  })
  const {mutate: updateReception} = useReceptionUpdate()

  const queryClient = useQueryClient()

  const handleOnClickSubmit = (): void => {
    const updateInput = new ReceptionUpdateInput(receptionData)

    updateInput.progressingStatus = 'CANCELED_WHILE_MATCHING'
    updateInput.reasonForCancellation = detailedCancellationReason

    // eslint-disable-next-line no-alert
    const cancelRequested = confirm('매칭 중 취소 처리하시겠습니까?')

    if (cancelRequested) {
      updateReception(
        {
          pathParams: {receptionId},
          payload: updateInput.input,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['reception', 'detail', {id: receptionId}],
            })
            queryClient.invalidateQueries({
              queryKey: ['reception-modification', {receptionId}],
            })

            onClickClose()
          },
        },
      )
    }
  }

  return (
    <Modal
      closeIndicationType="button"
      modalWidth="sm"
      onClose={onClickClose}
      onSubmit={handleOnClickSubmit}
      title="매칭 중 취소"
    >
      <Card.Item fixedHeight={false} isOptional title="사유 상세">
        <Textarea
          maxLength={MAX_LENGTH.TEXTAREA}
          onTextChange={setDetailedCancellationReason}
          value={detailedCancellationReason}
        />
      </Card.Item>
    </Modal>
  )
}

export default ReceptionCancelWhileMatchingModal
