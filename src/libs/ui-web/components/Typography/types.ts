import {DefaultColors, TypographyVariants} from '@caredoc/ui-master'
import {
  BackgroundColorProps,
  ResponsiveValue,
  TextAlignProps,
} from 'styled-system'
import {CustomTheme} from '../../theme'
import IDefaultProps from '../../types'
export interface ITypography
  extends IDefaultProps,
    TextAlignProps,
    BackgroundColorProps<Required<CustomTheme>> {
  backgroundColor?: ResponsiveValue<keyof DefaultColors>
  ellipsis?: boolean
  textColor?: ResponsiveValue<keyof DefaultColors>
  variant?: ResponsiveValue<TypographyVariants>
}

export interface ITypographyRoot extends ITypography {}
