/* eslint-disable unicorn/filename-case */
import React, {ReactElement} from 'react'
import Modal from '../../../../../components/Modal'
import CaregivingChargeModificationHistory from './CaregivingChargeModificationHistory'

interface IProps {
  onClickCloseButton: () => void
  receptionId: string
}

const CaregivingChargeInfoHistoryModal = (props: IProps): ReactElement => {
  const {onClickCloseButton, receptionId} = props

  return (
    <Modal
      closeIndicationType="icon"
      modalWidth="xl"
      onClose={onClickCloseButton}
      title="산정금액 수정내역"
    >
      <CaregivingChargeModificationHistory receptionId={receptionId} />
    </Modal>
  )
}

export default CaregivingChargeInfoHistoryModal
