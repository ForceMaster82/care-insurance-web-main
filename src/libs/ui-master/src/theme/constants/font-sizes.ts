import {DefaultFontSizes, Sizes} from '../../types'

const fontSizes: Sizes = {
  size0: 0,
  size1: 10,
  size10: 48,
  size2: 12,
  size3: 14,
  size4: 16,
  size5: 18,
  size6: 20,
  size7: 24,
  size8: 32,
  size9: 40,
}

export default {
  ...fontSizes,

  /**
   * @description 100%
   */
  full: '100%',

  /**
   * @description size0 (0)
   */
  lg: fontSizes.size0,

  /**
   * @description size0 (0)
   */
  md: fontSizes.size0,

  /**
   * @description size0 (0)
   */
  none: fontSizes.size0,

  /**
   * @description size0 (0)
   */
  sm: fontSizes.size0,

  /**
   * @description size0 (0)
   */
  xl: fontSizes.size0,

  /**
   * @description size0 (0)
   */
  xs: fontSizes.size0,

  /**
   * @description size0 (0)
   */
  xxl: fontSizes.size0,
  /**
   * @description size0 (0)
   */
  xxs: fontSizes.size0,
} as DefaultFontSizes
