import {DefaultColors, DefaultSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>

export interface IRadio extends IDefaultProps {
  color?: ResponsiveValue<keyof DefaultColors>
  disabled?: boolean
  onClick?: () => void
  size?: ResponsiveValue<Size>
  value?: boolean
}
export interface IRadioLabel extends IDefaultProps {
  size?: ResponsiveValue<Size>
}

export interface IRadioRound extends Omit<IRadio, 'alt' | 'onClick'> {}

export interface IRadioRoot extends IBox {}
