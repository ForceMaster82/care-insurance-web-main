import {ResponsiveValue} from 'styled-system'
import {DefaultSizes, StateVariants} from '@caredoc/ui-master'
import IDefaultProps from '../../types'
import {IIcon} from '../Icon/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>

export interface IInfoBox extends IDefaultProps {
  size?: ResponsiveValue<Size>
  state: StateVariants
}

export interface IInfoBoxIcon extends IIcon {
  state: StateVariants
}

export interface IInfoBoxText extends ITypography {
  infoBoxSize?: ResponsiveValue<Size>
  state: StateVariants
}

export interface IInfoBoxRoot extends IInfoBox {}
