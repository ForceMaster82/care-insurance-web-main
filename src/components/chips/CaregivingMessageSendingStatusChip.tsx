/* eslint-disable unicorn/filename-case */
import React, {PropsWithChildren, ReactElement, useMemo} from 'react'
import {Chip} from '@caredoc/ui-web'
import {Colors, CustomColorKey} from '@caredoc/ui-master'
import {CaregivingMessageSendingStatus} from '../../types'
import {CAREGIVING_MESSAGE_SENDING_STATUS} from '../../constants'

interface IProps {
  status: CaregivingMessageSendingStatus
}

export const CaregivingMessageSendingStatusChip = ({
  status,
}: PropsWithChildren<IProps>): ReactElement => {
  const chipColor = useMemo<CustomColorKey | keyof Colors>(
    () =>
      (status === 'FAILED' && 'negative') ||
      (status === 'SENT' && 'positive') ||
      'n500',
    [status],
  )

  return (
    <Chip color={chipColor} size="md" variant="primary">
      {CAREGIVING_MESSAGE_SENDING_STATUS[status]}
    </Chip>
  )
}

export default CaregivingMessageSendingStatusChip
