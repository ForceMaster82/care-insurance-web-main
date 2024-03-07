import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {colors} from '@caredoc/ui-master'
import Box from '../Box'
import {clickable, transition} from '../../theme/mixins'
import {IBall, IToggleRoot} from './types'
import 'react'

const baseStyle = css<IToggleRoot>`
  ${clickable}

  position: relative;
  display: inline-block;
  background-color: ${({color, value}) => (value ? color : colors.n300)};
`

export const Ball = styled(Box)<IBall>`
  ${transition}

  border-radius: 50%;
  background-color: ${colors.bgPrimary};
  position: absolute;
  top: 50%;

  ${variant({
    prop: 'value',
    variants: {
      false: {
        left: 3,
      },
      true: {
        right: 3,
      },
    },
  })};

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        height: 32,
        marginTop: -16,
        width: 32,
      },
      md: {
        height: 28,
        marginTop: -24,
        width: 28,
      },
      sm: {
        height: 26,
        marginTop: -13,
        width: 26,
      },
    },
  })};
`

export const Root = styled(Box)<IToggleRoot>`
  ${baseStyle}
  ${transition}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        height: 40,
        width: 64,
      },
      md: {
        height: 36,
        width: 56,
      },
      sm: {
        height: 32,
        width: 48,
      },
    },
  })}
`
