import {DefaultIconSizes, Sizes} from '../../types'

export const sizes: Sizes = {
  size0: 0,
  size1: 12,
  size10: 84,
  size2: 16,
  size3: 20,
  size4: 24,
  size5: 32,
  size6: 48,
  size7: 56,
  size8: 64,
  size9: 72,
}

export default {
  ...sizes,

  /**
   * @description 100%
   */
  full: '100%',

  /**
   * @description size4 (24)
   */
  lg: sizes.size4,

  /**
   * @description size3 (20)
   */
  md: sizes.size3,

  /**
   * @description size0 (0)
   */
  none: sizes.size0,

  /**
   * @description size2 (16)
   */
  sm: sizes.size2,

  /**
   * @description size5 (32)
   */
  xl: sizes.size5,

  /**
   * @description size1 (12)
   */
  xs: sizes.size1,

  /**
   * @description size5 (32)
   */
  xxl: sizes.size5,
  /**
   * @description size1 (12)
   */
  xxs: sizes.size1,
} as DefaultIconSizes
