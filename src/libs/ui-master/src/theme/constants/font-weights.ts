import {DefaultFontWeights} from '../../types'

const fontWeights = {
  size0: 0,
  size1: 100,
  size10: 1000,
  size2: 200,
  size3: 300,
  size4: 400,
  size5: 500,
  size6: 600,
  size7: 700,
  size8: 800,
  size9: 900,
}

export default {
  ...fontWeights,

  /**
   * @description size7 (700)
   */
  bold: fontWeights.size7,

  /**
   * @description size3 (300)
   */
  light: fontWeights.size3,

  /**
   * @description size4 (400)
   */
  regular: fontWeights.size4,
} as DefaultFontWeights
