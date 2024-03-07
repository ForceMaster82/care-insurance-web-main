import {
  DefaultSpace,
  ElevationVariants,
  OutlineVariants,
} from '@caredoc/ui-master'
import {Property} from 'csstype'
import {MouseEvent, Ref} from 'react'
import {
  BackgroundColorProps,
  BorderProps,
  DisplayProps,
  FlexboxProps,
  HeightProps,
  MarginProps,
  MaxHeightProps,
  MaxWidthProps,
  MinHeightProps,
  MinWidthProps,
  OpacityProps,
  OverflowProps,
  PaddingProps,
  PositionProps,
  RequiredTheme,
  ResponsiveValue,
  Theme,
  WidthProps,
} from 'styled-system'
import {CustomTheme} from '../../theme'
import IDefaultProps from '../../types'

export type GapKeys = keyof DefaultSpace | number

export interface ExtraProps<T extends Theme = RequiredTheme> {
  textAlign?: ResponsiveValue<Property.TextAlign, T>
  transform?: ResponsiveValue<Property.Transform, T>
  transition?: ResponsiveValue<Property.Transition, T>
}

export interface IBox
  extends IDefaultProps,
    ExtraProps,
    FlexboxProps,
    WidthProps,
    HeightProps,
    MinWidthProps,
    MinHeightProps,
    MaxWidthProps,
    MaxHeightProps,
    DisplayProps,
    PositionProps,
    OpacityProps,
    OverflowProps,
    BackgroundColorProps<Required<CustomTheme>>,
    PaddingProps<Required<CustomTheme>>,
    MarginProps<Required<CustomTheme>>,
    BorderProps<Required<CustomTheme>> {
  as?: React.ElementType
  disabled?: boolean
  elevation?: ElevationVariants
  flexGap?: ResponsiveValue<GapKeys>
  gap?: ResponsiveValue<GapKeys>
  id?: string
  onClick?: (event: MouseEvent<HTMLDivElement>) => void | (() => void)
  ref?: Ref<any>
  target?: string
  variant?: ResponsiveValue<OutlineVariants>
}

export interface IBoxRoot extends Omit<IBox, 'onClick' | 'target'> {}
