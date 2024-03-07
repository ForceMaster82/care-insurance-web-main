import React, {ReactElement, useMemo} from 'react'
import {Chip} from '@caredoc/ui-web'
import {CustomColorKey} from '@caredoc/ui-master'
import {CaregivingProgressingStatus} from '../../types'
import {CAREGIVING_PROGRESSING_STATUS} from '../../constants'
interface ICaregivingStatusChipProps {
  status: CaregivingProgressingStatus
}

export const CaregivingStatusChip = ({
  status,
}: ICaregivingStatusChipProps): ReactElement => {
  const chipColor = useMemo<CustomColorKey>(() => {
    if (status === 'NOT_STARTED') {
      return 'fontTertiary'
    }
    if (
      status === 'CAREGIVING_IN_PROGRESS' ||
      status === 'COMPLETED_RESTARTING' ||
      status === 'REMATCHING'
    ) {
      return 'information'
    }
    if (
      status === 'COMPLETED_USING_PERSONAL_CAREGIVER' ||
      status === 'CANCELED_WHILE_REMATCHING'
    ) {
      return 'negative'
    }
    if (status === 'COMPLETED' || status === 'RECONCILIATION_COMPLETED') {
      return 'positive'
    }
    if (status === 'PENDING_REMATCHING') {
      return 'warning'
    }
    return 'fontTertiary'
  }, [status])

  return (
    <Chip color={chipColor} size="md" variant="primary">
      {CAREGIVING_PROGRESSING_STATUS[status]}
    </Chip>
  )
}

export default CaregivingStatusChip
