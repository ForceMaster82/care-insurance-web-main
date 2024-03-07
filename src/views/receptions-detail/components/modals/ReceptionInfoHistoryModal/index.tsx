/* eslint-disable unicorn/filename-case */
import React, {ReactElement} from 'react'
import Modal from '../../../../../components/Modal'
import ReceptionModificationHistory from './ReceptionModificationHistory'

interface IProps {
  onClickClose: () => void
  receptionId: string
}

const ReceptionInfoHistoryModal = (props: IProps): ReactElement => {
  const {onClickClose, receptionId} = props

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="xl"
      onClose={onClickClose}
      title="접수 정보 수정내역"
    >
      <ReceptionModificationHistory receptionId={receptionId} />
    </Modal>
  )
}

export default ReceptionInfoHistoryModal
