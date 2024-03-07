import {DefaultColors, DefaultSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>
export interface IInfoGrid extends IDefaultProps {
  color?: ResponsiveValue<keyof DefaultColors>
  disabled?: boolean
  label?: string
  size?: ResponsiveValue<Size>
}
export interface IInfoGridLabel extends ITypography {
  infoGridSize?: ResponsiveValue<Size>
}

export interface IInfoGridText extends ITypography {
  infoGridSize?: ResponsiveValue<Size>
}

export interface IInfoGridRoot extends Omit<IInfoGrid, 'label'> {}
