import {CustomColorKey, CustomSizeKey} from '@caredoc/ui-master'
import {Chip} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {PeriodType} from '../../types'
import {PERIOD_TYPE} from '../../constants'

interface IProps {
  renderOnly?: PeriodType[]
  size?: Exclude<CustomSizeKey, 'xxs' | 'xxl'>
  value: PeriodType
}

export const PeriodTypeChip = (props: IProps): ReactElement | null => {
  const {value, renderOnly, size = 'xs'} = props

  const color: CustomColorKey =
    (value === 'SHORT' && 'information') || 'fontPrimary'
  const text = PERIOD_TYPE[value]

  if (renderOnly && !renderOnly.includes(value)) {
    return null
  }

  return (
    <Chip color={color} size={size} variant="secondary">
      {text}
    </Chip>
  )
}

export default PeriodTypeChip
