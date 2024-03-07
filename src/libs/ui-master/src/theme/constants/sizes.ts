import {DefaultSizes, Sizes} from '../../types'

export const sizes: Sizes = {
  size0: 0,
  size1: 4,
  size10: 72,
  size2: 8,
  size3: 16,
  size4: 20,
  size5: 24,
  size6: 32,
  size7: 48,
  size8: 56,
  size9: 64,
}

export default {
  ...sizes,

  /**
   * @description 100%
   */
  full: '100%',

  /**
   * @description size9 (64)
   */
  lg: sizes.size9,

  /**
   * @description size8 (56)
   */
  md: sizes.size8,

  /**
   * @description size0 (0)
   */
  none: sizes.size0,

  /**
   * @description size7 (48)
   */
  sm: sizes.size7,

  /**
   * @description size10 (72)
   */
  xl: sizes.size10,

  /**
   * @description size6 (20)
   */
  xs: sizes.size6,

  /**
   * @description size10 (72)
   */
  xxl: sizes.size10,
  /**
   * @description size3 (16)
   */
  xxs: sizes.size3,
} as DefaultSizes
