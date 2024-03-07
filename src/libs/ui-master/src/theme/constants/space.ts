import {DefaultSpace, Sizes} from '../../types'

export const space: Sizes = {
  size0: 0,
  size1: 2,
  size10: 64,
  size2: 4,
  size3: 8,
  size4: 16,
  size5: 20,
  size6: 24,
  size7: 32,
  size8: 48,
  size9: 56,
}

export default {
  ...space,

  /**
   * @description 100%
   */
  full: '100%',

  /**
   * @description size7 (32)
   */
  lg: space.size7,

  /**
   * @description size6 (24)
   */
  md: space.size6,

  /**
   * @description size0 (0)
   */
  none: space.size0,

  /**
   * @description size4 (16)
   */
  sm: space.size4,

  /**
   * @description size8 (48)
   */
  xl: space.size8,

  /**
   * @description size3 (8)
   */
  xs: space.size3,

  /**
   * @description size10 (64)
   */
  xxl: space.size10,
  /**
   * @description size2 (4)
   */
  xxs: space.size2,
} as DefaultSpace
