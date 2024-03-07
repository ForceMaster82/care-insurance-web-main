import {DefaultColors, DefaultSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import {IBox} from '../Box/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>

export interface IToggle extends IBox {
  color?: ResponsiveValue<keyof DefaultColors>
  disabled?: boolean
  onClick?: () => void
  size?: ResponsiveValue<Size>
  value?: boolean
}
export interface IBall extends IBox {
  size?: ResponsiveValue<Size>
  value?: boolean
}

export interface IToggleRoot extends Omit<IToggle, 'onClick' | 'alt'> {}
