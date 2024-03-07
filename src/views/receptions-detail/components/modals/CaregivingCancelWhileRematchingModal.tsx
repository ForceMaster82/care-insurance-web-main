/* eslint-disable unicorn/filename-case */
import {Box, ComboBox, Textarea} from '@caredoc/ui-web'
import React, {ReactElement, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import Modal from '../../../../components/Modal'
import ReceptionCaregivingRoundResource from '../../../../models/dto/reception-caregiving-round/Resource'
import ReceptionCaregivingRoundInput from '../../../../models/dto/reception-caregiving-round/Input'
import useCaregivingRoundUpdate from '../../../../hooks/api/caregiving-round/use-caregiving-round-update'
import Card from '../../../../components/Card'
import {MAX_LENGTH} from '../../../../constraints/input'
import {caregivingRoundCancelReasons} from '../../../../constants'
import {CaregivingRoundClosingReasonType} from '../../../../types'

interface IProps {
  caregivingRoundResource: ReceptionCaregivingRoundResource
  onClickClose: () => void
}

const CaregivingCancelWhileRematchingModal = (props: IProps): ReactElement => {
  const {caregivingRoundResource, onClickClose} = props

  const [reasonType, setReasonType] =
    useState<CaregivingRoundClosingReasonType>('CANCELED_WHILE_REMATCHING')
  const [reasonDetail, setReasonDetail] = useState('')

  const {mutate: updateCaregivingRound} = useCaregivingRoundUpdate()

  const queryClient = useQueryClient()

  const handleOnClickCancelWhileRematching = (): void => {
    const caregivingRoundInput = new ReceptionCaregivingRoundInput(
      caregivingRoundResource,
    )
    caregivingRoundInput.data = {
      ...caregivingRoundInput.data,
      caregivingProgressingStatus: 'CANCELED_WHILE_REMATCHING',
      caregivingRoundClosingReasonDetail: reasonDetail,
      caregivingRoundClosingReasonType: reasonType,
    }

    updateCaregivingRound(
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
      modalWidth="sm"
      onClose={onClickClose}
      onSubmit={handleOnClickCancelWhileRematching}
      title="리매칭 중 취소"
    >
      <Box gap="sm">
        <Card.Item title="간병 종료 사유">
          <ComboBox
            items={caregivingRoundCancelReasons}
            onSelect={setReasonType}
            value={reasonType}
          />
        </Card.Item>
        <Card.Item fixedHeight={false} isOptional title="사유 상세">
          <Textarea
            maxLength={MAX_LENGTH.TEXTAREA}
            onTextChange={setReasonDetail}
            value={reasonDetail}
          />
        </Card.Item>
      </Box>
    </Modal>
  )
}

export default CaregivingCancelWhileRematchingModal
