export type Colors = {
  b000: string
  b100: string
  b200: string
  b300: string
  b400: string
  b500: string
  b600: string
  b700: string
  b800: string
  // blue
  b900: string
  e100: string
  e200: string
  e300: string
  e400: string
  // eTC
  e500: string
  g000: string
  g100: string
  g200: string
  g300: string
  g400: string
  g500: string
  g600: string
  g700: string
  g800: string
  // green
  g900: string
  kakao1: string
  // kAKAO
  kakao2: string
  kb1: string
  kb2: string
  kb3: string
  kb4: string
  // kB
  kb5: string
  n000: string
  n100: string
  n200: string
  n300: string
  n400: string
  n500: string
  n600: string
  n700: string
  n800: string
  // neutral
  n900: string
  r000: string
  r100: string
  r200: string
  r300: string
  r400: string
  r500: string
  r600: string
  r700: string
  r800: string
  // red
  r900: string
  y000: string
  y100: string
  y200: string
  y300: string
  y400: string
  y500: string
  y600: string
  y700: string
  y800: string
  // yellow
  y900: string
}

export type Sizes = {
  size0: number
  size1: number
  size10: number
  size2: number
  size3: number
  size4: number
  size5: number
  size6: number
  size7: number
  size8: number
  size9: number
}

export type ZIndex = {
  navigation: number
  overlay: number
  popup: number
}

export type CustomColorKey =
  | 'primary'
  | 'primaryVariant'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'information'
  | 'bgPrimary'
  | 'bgSecondary'
  | 'borderPrimary'
  | 'borderSecondary'
  | 'borderTertiary'
  | 'fontPrimary'
  | 'fontSecondary'
  | 'fontTertiary'
  | 'fontWhite'
  | 'disabled'
  | 'transparent'

export type CustomSizeKey = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type CustomFontWeightKey = 'light' | 'regular' | 'bold'

// custom values
export type CustomColorValues = Colors & Record<CustomColorKey, string>

export type CustomSizeValues = Sizes &
  Record<CustomSizeKey, number> & {
    full: '100%'
    // none or full size
    none: Pick<Sizes, 'size0'>['size0']
  }

export type CustomFontWeightValues = Sizes & Record<CustomFontWeightKey, number>

// default type
export type DefaultSizes = CustomSizeValues

export type DefaultSpace = CustomSizeValues

export type DefaultRadius = CustomSizeValues

export type DefaultBorderWidths = CustomSizeValues

export type DefaultLineHeights = CustomSizeValues

export type DefaultIconSizes = CustomSizeValues

export type DefaultFontWeights = CustomFontWeightValues

export type DefaultFontSizes = CustomSizeValues

export type DefaultColors = CustomColorValues

// variants
export type TypographyVariants =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'heading7'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'caption1'
  | 'caption2'
  | 'caption3'
  | 'caption4'

export type ButtonVariants =
  | 'primary'
  | 'secondary'
  | 'tertiary'

  // will be deprecated below
  | 'solid'
  | 'twotone'
  | 'outline'
  | 'flat'
  | 'textlink'

export type ChipVariants =
  | 'primary'
  | 'secondary'
  | 'tertiary'

  // will be deprecated below
  | 'solid'
  | 'twotone'
  | 'outline'

export type OutlineVariants = 'filled' | 'outlined' | 'shadow'

export type StateVariants = 'info' | 'warning' | 'error' | 'success'

export type ElevationVariants =
  | 'elevation-0'
  | 'elevation-1'
  | 'elevation-2'
  | 'elevation-3'
  | 'elevation-4'
  | 'elevation-5'
