import {
  ChipVariants,
  DefaultColors,
  DefaultSizes,
  IconType,
} from '@caredoc/ui-master'
import {ColorProps, ResponsiveValue} from 'styled-system'
import {CustomTheme} from '../../theme'
import IDefaultProps from '../../types'
import {IIcon} from '../Icon/types'

type Size = keyof Pick<DefaultSizes, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>

export interface IChip
  extends IDefaultProps,
    ColorProps<Required<CustomTheme>> {
  disabled?: boolean
  icon?: IconType
  onClick?: () => void
  size?: ResponsiveValue<Size>
  variant?: ResponsiveValue<ChipVariants>
}

export interface IChipIcon extends IIcon {
  chipVariant: ResponsiveValue<ChipVariants>
}

export interface IChipText {
  chipVariant: ResponsiveValue<ChipVariants>
  size: ResponsiveValue<Size>
}
export interface IChipRoot
  extends Pick<IChip, 'size' | 'onClick'>,
    ColorProps<Required<CustomTheme>> {
  chipVariant: ResponsiveValue<ChipVariants>
  opacityBorderColor?: ResponsiveValue<keyof DefaultColors>
}
