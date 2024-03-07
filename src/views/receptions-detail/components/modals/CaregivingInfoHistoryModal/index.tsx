/* eslint-disable unicorn/filename-case */
import React, {ReactElement} from 'react'
import Modal from '../../../../../components/Modal'
import CaregivingRoundModificationHistory from './CaregivingRoundModificationHistory'

interface IProps {
  onClickClose: () => void
  receptionId: string
}

const CaregivingInfoHistoryModal = (props: IProps): ReactElement => {
  const {onClickClose, receptionId} = props

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="xl"
      onClose={onClickClose}
      title="간병 정보 수정내역"
    >
      <CaregivingRoundModificationHistory receptionId={receptionId} />
    </Modal>
  )
}

export default CaregivingInfoHistoryModal
