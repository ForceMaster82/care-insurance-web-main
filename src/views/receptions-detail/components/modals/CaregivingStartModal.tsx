/* eslint-disable no-alert */
/* eslint-disable unicorn/filename-case */
import {Input} from '@caredoc/ui-web'
import React, {ReactElement, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import Modal from '../../../../components/Modal'
import ReceptionCaregivingRoundResource from '../../../../models/dto/reception-caregiving-round/Resource'
import Card from '../../../../components/Card'
import {MAX_DATE_TIME_VALUE} from '../../../../constraints/input'
import useCaregivingRoundUpdate from '~hooks/api/caregiving-round/use-caregiving-round-update'
import ReceptionCaregivingRoundInput from '~models/dto/reception-caregiving-round/Input'

interface IProps {
  caregivingRoundResource: ReceptionCaregivingRoundResource
  onClickClose: () => void
}

const CaregivingStartModal = (props: IProps): ReactElement => {
  const {onClickClose, caregivingRoundResource} = props

  const [caregivingStartDateTime, setCaregivingStartDateTime] = useState('')

  const {mutate: caregivingRoundUpdate} = useCaregivingRoundUpdate()

  const queryClient = useQueryClient()

  const handleOnSubmit = (): void => {
    if (!caregivingStartDateTime) {
      return
    }

    const caregivingRoundInput = new ReceptionCaregivingRoundInput(
      caregivingRoundResource,
    )
    caregivingRoundInput.data = {
      ...caregivingRoundInput.data,
      caregivingProgressingStatus: 'CAREGIVING_IN_PROGRESS',
      startDateTime: caregivingStartDateTime,
    }

    caregivingRoundUpdate(
      {
        pathParams: {caregivingRoundId: caregivingRoundResource.id},
        payload: caregivingRoundInput.input,
      },
      {
        onSuccess: () => {
          caregivingRoundResource.caregivingRoundNumber === 1 &&
            queryClient.invalidateQueries({
              queryKey: [
                'reception',
                'detail',
                {id: caregivingRoundResource.receptionInfo.receptionId},
              ],
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

          onClickClose()
        },
      },
    )
  }

  return (
    <Modal
      closeIndicationType="button"
      disabled={!caregivingStartDateTime}
      modalWidth="sm"
      onClose={onClickClose}
      onSubmit={handleOnSubmit}
      title="간병 시작일시 입력"
    >
      <Card.Item title="간병 시작일시">
        <Input
          max={MAX_DATE_TIME_VALUE}
          onTextChange={setCaregivingStartDateTime}
          type="datetime-local"
          value={caregivingStartDateTime}
        />
      </Card.Item>
    </Modal>
  )
}

export default CaregivingStartModal
