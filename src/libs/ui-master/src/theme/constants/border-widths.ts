import {DefaultBorderWidths, Sizes} from '../../types'

export const borderWidths: Sizes = {
  size0: 0,
  size1: 1,
  size10: 40,
  size2: 2,
  size3: 4,
  size4: 8,
  size5: 12,
  size6: 16,
  size7: 20,
  size8: 24,
  size9: 32,
}

export default {
  ...borderWidths,

  /**
   * @description 100%
   */
  full: '100%',

  /**
   * @description size3 (4)
   */
  lg: borderWidths.size3,

  /**
   * @description size2 (2)
   */
  md: borderWidths.size2,

  /**
   * @description size0 (0)
   */
  none: borderWidths.size0,

  /**
   * @description size1 (1)
   */
  sm: borderWidths.size1,

  /**
   * @description size4 (8)
   */
  xl: borderWidths.size4,

  /**
   * @description size1 (1)
   */
  xs: borderWidths.size1,

  /**
   * @description size5 (12)
   */
  xxl: borderWidths.size5,
  /**
   * @description size1 (1)
   */
  xxs: borderWidths.size1,
} as DefaultBorderWidths
