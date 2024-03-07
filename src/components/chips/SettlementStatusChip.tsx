import React, {useMemo} from 'react'
import {Chip} from '@caredoc/ui-web'
import {CustomColorKey} from '@caredoc/ui-master'
import {SettlementProgressingStatus} from '../../types'
import {SETTLEMENT_PROGRESSING_STATUS} from '../../constants'
interface ISettlementStatusChipProps {
  status: SettlementProgressingStatus
}

export const SettlementStatusChip = ({status}: ISettlementStatusChipProps) => {
  const chipColor = useMemo<CustomColorKey>(() => {
    if (status === 'CONFIRMED') {
      return 'warning'
    }
    if (status === 'WAITING') {
      return 'information'
    }
    if (status === 'COMPLETED') {
      return 'positive'
    }
    return 'fontTertiary'
  }, [status])

  return (
    <Chip color={chipColor} size="md" variant="primary">
      {SETTLEMENT_PROGRESSING_STATUS[status]}
    </Chip>
  )
}

export default SettlementStatusChip
