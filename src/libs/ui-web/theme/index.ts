import {DefaultTheme} from 'styled-components'
import {
  borderWidths,
  colors,
  DefaultBorderWidths,
  DefaultColors,
  DefaultFontWeights,
  DefaultLineHeights,
  DefaultRadius,
  DefaultSizes,
  DefaultSpace,
  fontWeights,
  radius,
  sizes,
  space,
} from '@caredoc/ui-master'
import typographyVariants from '../theme/variants/typography'
import {breakpoints} from './breakpoints'

export * from './mixins'
export * from './breakpoints'
export * from './system'

export type CustomTheme = DefaultTheme & {
  borderWidths?: DefaultBorderWidths
  breakpoints?: (number | string | symbol)[]
  colors?: DefaultColors
  fontWeights?: DefaultFontWeights
  lineHeights?: DefaultLineHeights
  radii?: DefaultRadius
  sizes?: DefaultSizes
  space?: DefaultSpace
}

export const defaultTheme = {
  borderWidths,
  breakpoints,
  colors,
  fontWeights,
  radii: radius,
  sizes,
  space,

  typographyVariants,
} as CustomTheme
