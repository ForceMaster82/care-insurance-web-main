import {DefaultColors, DefaultSizes} from '@caredoc/ui-master'
import {HeightProps, ResponsiveValue, WidthProps} from 'styled-system'
import {IBox} from '../Box/types'

type Size = keyof Pick<
  DefaultSizes,
  'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
>

export interface IDivider extends IBox, HeightProps, WidthProps {
  color?: ResponsiveValue<keyof DefaultColors>
  size?: ResponsiveValue<Size>
}

export interface IDividerRoot extends IDivider {}
