import {DefaultColors, DefaultSizes} from '@caredoc/ui-master'
import {
  ColorProps,
  FlexboxProps,
  FlexProps,
  ResponsiveValue,
} from 'styled-system'
import React from 'react'
import {CustomTheme} from '../../theme'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'xs' | 'sm' | 'md' | 'lg'>
export interface ILink
  extends IDefaultProps,
    ColorProps<Required<CustomTheme>>,
    FlexProps<Required<CustomTheme>> {
  alt?: string
  as?: React.ReactElement
  disabled?: boolean
  flat?: ResponsiveValue<boolean>
  isLoading?: boolean
  onClick?: () => void
  size?: ResponsiveValue<Size>
}

export interface ILinkText extends ITypography {
  flat?: ResponsiveValue<boolean>
  size: ResponsiveValue<Size>
}

export interface ILinkRoot
  extends IBox,
    ColorProps<Required<CustomTheme>>,
    Pick<FlexboxProps, 'flex'> {
  flat?: ResponsiveValue<boolean>
  opacityBorderColor?: ResponsiveValue<keyof DefaultColors>
  size: ResponsiveValue<Size>
}
