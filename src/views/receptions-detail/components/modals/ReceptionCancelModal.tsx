/* eslint-disable no-alert */
/* eslint-disable unicorn/filename-case */
import {Box, ComboBox, Textarea} from '@caredoc/ui-web'
import React, {ReactElement, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import Modal from '../../../../components/Modal'
import {receptionCancelReasons} from '../../../../constants'
import {MAX_LENGTH} from '../../../../constraints/input'
import {ReceptionProgressingStatus} from '../../../../types'
import TitledItem from '../../../../components/TitledItem'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import useReceptionUpdate from '~hooks/api/reception/use-reception-update'
import ReceptionUpdateInput from '~models/dto/reception/UpdateInput'

const MODAL_HEIGHT = 512

interface IProps {
  onClickClose: () => void
  receptionId: string
}

const ReceptionCancelModal = (props: IProps): ReactElement => {
  const {onClickClose, receptionId} = props

  const [cancellationReason, setCancellationReason] =
    useState<ReceptionProgressingStatus>('CANCELED')
  const [detailedCancellationReason, setDetailedCancellationReason] =
    useState('')

  const queryClient = useQueryClient()

  const {data: receptionData} = useReceptionDetail({
    receptionId,
    unmaskedProperty: [
      'PATIENT_NAME',
      'PATIENT_PRIMARY_PHONE_NUMBER',
      'PATIENT_SECONDARY_PHONE_NUMBER',
    ],
  })
  const {mutate: updateReception} = useReceptionUpdate()

  const handleOnClickSubmitButton = (): void => {
    const updateInput = new ReceptionUpdateInput(receptionData)
    updateInput.progressingStatus = cancellationReason
    updateInput.reasonForCancellation = detailedCancellationReason

    const cancelRequested = window.confirm('접수 취소하시겠습니까?')

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
      modalHeight={MODAL_HEIGHT}
      modalWidth="sm"
      onClose={onClickClose}
      onSubmit={handleOnClickSubmitButton}
      title="접수 취소"
    >
      <Box gap="lg">
        <Box gap="sm">
          <TitledItem title="접수 취소 사유">
            <ComboBox<ReceptionProgressingStatus>
              items={receptionCancelReasons}
              onSelect={setCancellationReason}
              value={cancellationReason}
            />
          </TitledItem>
          <TitledItem isOptional title="사유 상세">
            <Textarea
              maxLength={MAX_LENGTH.TEXTAREA}
              onTextChange={setDetailedCancellationReason}
              value={detailedCancellationReason}
            />
          </TitledItem>
        </Box>
      </Box>
    </Modal>
  )
}

export default ReceptionCancelModal
