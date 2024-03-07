import {DefaultColors, DefaultSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>
export interface ITabItem extends IBox, IDefaultProps {
  color?: ResponsiveValue<keyof DefaultColors>
  disabled?: boolean
  focused?: boolean
  onClick?: () => void
  size?: ResponsiveValue<Size>
}

export interface ITabItemText extends ITypography {
  focused?: boolean
  size?: ResponsiveValue<Size>
}

export interface ITabItemRoot extends Omit<ITabItem, 'alt' | 'onClick'> {}
