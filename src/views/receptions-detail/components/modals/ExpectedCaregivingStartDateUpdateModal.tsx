/* eslint-disable unicorn/filename-case */
import {DatePicker} from '@caredoc/ui-web'
import React, {ReactElement, useState} from 'react'
import {useQueryClient} from '@tanstack/react-query'
import Modal from '../../../../components/Modal'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import useReceptionUpdate from '../../../../hooks/api/reception/use-reception-update'
import ReceptionUpdateInput from '../../../../models/dto/reception/UpdateInput'
import {formatDate} from '../../../../utils/date'

interface IProps {
  onClickCloseButton: () => void
  receptionId: string
}

const ExpectedCaregivingStartDateUpdateModal = (
  props: IProps,
): ReactElement => {
  const {onClickCloseButton, receptionId} = props

  const [selectedDate, setSelectedDate] = useState<Date>()

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

  const handleOnSubmit = (): void => {
    if (!selectedDate) {
      return
    }

    const input = new ReceptionUpdateInput(receptionData)
    input.expectedCaregivingStartDate = formatDate(selectedDate)

    updateReception(
      {
        pathParams: {receptionId},
        payload: input.input,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['reception', 'detail', {id: receptionId}],
          })
          queryClient.invalidateQueries({
            queryKey: ['reception-modification', {receptionId}],
          })

          onClickCloseButton()
        },
      },
    )
  }

  return (
    <Modal
      buttonText="선택 완료"
      closeIndicationType="icon"
      disabled={!selectedDate}
      onClose={onClickCloseButton}
      onSubmit={handleOnSubmit}
      title="간병 예상일자 수정"
    >
      <DatePicker
        onClickDate={setSelectedDate}
        value={(selectedDate && [selectedDate]) || []}
      />
    </Modal>
  )
}

export default ExpectedCaregivingStartDateUpdateModal
