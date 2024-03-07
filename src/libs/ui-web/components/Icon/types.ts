import {DefaultColors, DefaultIconSizes, IconType} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'

type Size =
  | keyof Pick<DefaultIconSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>
  | number
export interface IIcon extends IDefaultProps {
  fill?: ResponsiveValue<keyof DefaultColors>
  name: IconType
  size?: ResponsiveValue<Size>
}

export interface IIconRoot extends Omit<IIcon, 'name'> {}
