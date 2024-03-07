/* eslint-disable unicorn/filename-case */
import React, {PropsWithChildren, ReactElement, useMemo} from 'react'
import {Chip} from '@caredoc/ui-web'
import {Colors, CustomColorKey} from '@caredoc/ui-master'
import {CaregivingSatisfactionSurveyReservationStatus} from '../../types'
import {CAREGIVING_SATISFACTION_SURVEY_RESERVATION_STATUS} from '../../constants'

interface IProps {
  status: CaregivingSatisfactionSurveyReservationStatus
}

export const CaregivingSatisfactionSurveyReservationStatusChip = ({
  status,
}: PropsWithChildren<IProps>): ReactElement => {
  const chipColor = useMemo<CustomColorKey | keyof Colors>(
    () =>
      (status === 'FAILED' && 'negative') ||
      (status === 'RESERVED' && 'positive') ||
      'n500',
    [status],
  )

  return (
    <Chip color={chipColor} size="md" variant="primary">
      {CAREGIVING_SATISFACTION_SURVEY_RESERVATION_STATUS[status]}
    </Chip>
  )
}

export default CaregivingSatisfactionSurveyReservationStatusChip
