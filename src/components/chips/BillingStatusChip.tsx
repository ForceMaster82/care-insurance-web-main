/* eslint-disable unicorn/filename-case */
import React, {useMemo} from 'react'
import {Chip} from '@caredoc/ui-web'
import {CustomColorKey} from '@caredoc/ui-master'
import {BillingProgressingStatus} from '../../types'
import {BILLING_PROGRESSING_STATUS} from '../../constants'
interface IBillingStatusChipProps {
  status: BillingProgressingStatus
}
export const BillingStatusChip = ({status}: IBillingStatusChipProps) => {
  const chipColor = useMemo<CustomColorKey>(() => {
    if (status === 'WAITING_FOR_BILLING') {
      return 'information'
    }
    if (status === 'OVER_DEPOSIT' || status === 'UNDER_DEPOSIT') {
      return 'warning'
    }
    if (status === 'WAITING_DEPOSIT') {
      return 'negative'
    }
    if (status === 'COMPLETED_DEPOSIT') {
      return 'positive'
    }
    return 'fontTertiary'
  }, [status])

  return (
    <Chip color={chipColor} size="md" variant="primary">
      {BILLING_PROGRESSING_STATUS[status]}
    </Chip>
  )
}

export default BillingStatusChip
