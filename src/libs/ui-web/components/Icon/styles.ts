import styled, {css} from 'styled-components'
import {system, variant} from 'styled-system'
import Box from '../Box'
import {iconVariants} from '../../theme/variants/icon'
import {transition} from '../../theme/mixins'
import {IIconRoot} from './types'

const fill = system({
  fill: {
    property: 'fill',
    scale: 'colors',
  },
})

const baseStyle = css<IIconRoot>`
  ${transition}
`
export const Root = styled(Box)<IIconRoot>`
  ${baseStyle}

  svg {
    display: inline-block;
    vertical-align: middle;

    ${variant({
      prop: 'size',
      variants: {...iconVariants},
    })}

    * {
      ${fill}
    }
  }
`
