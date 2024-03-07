import {ButtonVariants, DefaultColors, DefaultSizes} from '@caredoc/ui-master'
import {ColorProps, FlexProps, ResponsiveValue} from 'styled-system'
import React from 'react'
import {CustomTheme} from '../../theme'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'xs' | 'sm' | 'md' | 'lg'>
export interface IButton
  extends IDefaultProps,
    ColorProps<Required<CustomTheme>>,
    FlexProps<Required<CustomTheme>> {
  alt?: string
  as?: React.ElementType
  disabled?: boolean
  flat?: ResponsiveValue<boolean>
  href?: string
  isLoading?: boolean
  onClick?: () => void
  size?: ResponsiveValue<Size>
  target?: string
  variant?: ResponsiveValue<ButtonVariants>
}

export interface IButtonText extends ITypography {
  buttonVariant: ResponsiveValue<ButtonVariants>
  disabled?: boolean
  size: ResponsiveValue<Size>
}

export interface IButtonRoot
  extends Pick<IBox, 'flex'>,
    Pick<IButton, 'size' | 'onClick'>,
    ColorProps<Required<CustomTheme>> {
  buttonVariant?: ResponsiveValue<ButtonVariants>
  flat?: ResponsiveValue<boolean>
  opacityBorderColor?: ResponsiveValue<keyof DefaultColors>
}
