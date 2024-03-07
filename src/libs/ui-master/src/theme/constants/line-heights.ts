import {DefaultLineHeights, Sizes} from '../../types'

const lineHeights: Sizes = {
  size0: 0,
  size1: 14,
  size10: 68,
  size2: 16,
  size3: 18,
  size4: 20,
  size5: 26,
  size6: 28,
  size7: 36,
  size8: 52,
  size9: 60,
}

export default {
  ...lineHeights,

  /**
   * @description 100%
   */
  full: '100%',

  /**
   * @description size0 (0)
   */
  lg: lineHeights.size0,

  /**
   * @description size0 (0)
   */
  md: lineHeights.size0,

  /**
   * @description size0 (0)
   */
  none: lineHeights.size0,

  /**
   * @description size0 (0)
   */
  sm: lineHeights.size0,

  /**
   * @description size0 (0)
   */
  xl: lineHeights.size0,

  /**
   * @description size0 (0)
   */
  xs: lineHeights.size0,

  /**
   * @description size0 (0)
   */
  xxl: lineHeights.size0,
  /**
   * @description size0 (0)
   */
  xxs: lineHeights.size0,
} as DefaultLineHeights
