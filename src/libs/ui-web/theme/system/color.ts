import {colors} from '@caredoc/ui-master'
import {generateOpacityToHexString} from '@caredoc/utils'
import {system} from 'styled-system'

const STROKE_OPACITY = 15

export default system({
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  textColor: {
    property: 'color',
    scale: 'colors',
  },
})

export const opacityBorderColor = system({
  opacityBorderColor: {
    property: 'borderColor',
    scale: 'colors',
    transform: (c) =>
      generateOpacityToHexString((colors as any)[c], STROKE_OPACITY),
  },
})
