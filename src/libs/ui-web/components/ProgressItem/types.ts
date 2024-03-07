import {DefaultColors, DefaultSizes, IconType} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
import {IIcon} from '../Icon/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>

export interface IProgressItem extends IBox, IDefaultProps {
  color?: ResponsiveValue<keyof DefaultColors>
  disabled?: boolean
  icon: IconType
  passed?: boolean
  size?: ResponsiveValue<Size>
}

export interface IProgressItemIcon extends IIcon {
  passed?: boolean
  size?: ResponsiveValue<Size>
}

export interface IProgressItemText extends ITypography {
  passed?: boolean
  size?: ResponsiveValue<Size>
}

export interface IProgressItemRoot extends Omit<IProgressItem, 'icon'> {}
