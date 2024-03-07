import {DefaultColors, DefaultSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>
export interface ICheckbox extends IDefaultProps {
  color?: ResponsiveValue<keyof DefaultColors>
  disabled?: boolean
  onClick?: () => void
  size?: ResponsiveValue<Size>
  value?: boolean
}

export interface ICheckboxOutline extends Omit<ICheckbox, 'onClick' | 'alt'> {}

export interface ICheckboxLabel extends ITypography {
  size?: ResponsiveValue<Size>
}

export interface ICheckboxRoot extends IBox {}
