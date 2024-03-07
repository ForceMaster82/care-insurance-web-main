import {DefaultColors, DefaultIconSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
import {IIcon} from '../Icon/types'

type Size = keyof Pick<DefaultIconSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>

export interface IRating extends IDefaultProps {
  color?: ResponsiveValue<keyof DefaultColors>
  disabled?: boolean
  onChange?: (value: number) => void
  readonly?: boolean
  size?: ResponsiveValue<Size>
  value?: number
}

export interface IRatingWrapper extends IBox {
  isBg?: boolean
}

export interface IRatingGap extends IIcon {
  index: number
  size?: ResponsiveValue<Size>
}

export interface IRatingRoot extends IRating {}
