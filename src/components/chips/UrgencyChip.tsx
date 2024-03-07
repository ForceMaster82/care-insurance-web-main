import {CustomColorKey, CustomSizeKey} from '@caredoc/ui-master'
import {Chip} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {Urgency} from '../../types'
import {URGENCY} from '../../constants'

interface IProps {
  renderOnly?: Urgency[]
  size?: Exclude<CustomSizeKey, 'xxs' | 'xxl'>
  value: Urgency
}

const UrgencyChip = (props: IProps): ReactElement | null => {
  const {value, size = 'xs', renderOnly} = props

  const color: CustomColorKey =
    (value === 'URGENT' && 'negative') || 'fontPrimary'
  const text = URGENCY[value]

  if (renderOnly && !renderOnly.includes(value)) {
    return null
  }

  return (
    <Chip color={color} size={size} variant="secondary">
      {text}
    </Chip>
  )
}

export default UrgencyChip
