import {DefaultRadius, Sizes} from '../../types'

export const radius: Sizes = {
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
  ...radius,

  /**
   * @description 100%
   */
  full: '100%',

  /**
   * @description size4 (16)
   */
  lg: radius.size4,

  /**
   * @description size3 (8)
   */
  md: radius.size3,

  /**
   * @description size0 (0)
   */
  none: radius.size0,

  /**
   * @description size2 (4)
   */
  sm: radius.size2,

  /**
   * @description size5 (20)
   */
  xl: radius.size5,

  /**
   * @description size1 (2)
   */
  xs: radius.size1,

  /**
   * @description size6 (24)
   */
  xxl: radius.size6,
  /**
   * @description size1 (2)
   */
  xxs: radius.size1,
} as DefaultRadius
