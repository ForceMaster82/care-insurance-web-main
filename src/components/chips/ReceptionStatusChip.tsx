import React, {useMemo} from 'react'
import {Chip} from '@caredoc/ui-web'
import {CustomColorKey} from '@caredoc/ui-master'
import {RECEPTION_PROGRESS_STATUS} from '../../constants'
import {ReceptionProgressingStatus} from '~types'

interface IReceptionStatusChipProps {
  status: ReceptionProgressingStatus
}

export const ReceptionStatusChip = ({status}: IReceptionStatusChipProps) => {
  const chipColor = useMemo<CustomColorKey>(() => {
    if (
      status === 'CANCELED' ||
      status === 'CANCELED_BY_PERSONAL_CAREGIVER' ||
      status === 'CANCELED_BY_MEDICAL_REQUEST' ||
      status === 'CANCELED_WHILE_MATCHING'
    ) {
      return 'negative'
    }
    if (status === 'PENDING' || status === 'PENDING_MATCHING') {
      return 'warning'
    }
    if (status === 'MATCHING' || status === 'CAREGIVING_IN_PROGRESS') {
      return 'information'
    }
    if (status === 'COMPLETED') {
      return 'positive'
    }
    return 'fontTertiary'
  }, [status])

  return (
    <Chip color={chipColor} size="md" variant="primary">
      {RECEPTION_PROGRESS_STATUS[status]}
    </Chip>
  )
}

export default ReceptionStatusChip
