import {space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {breakpoints} from '../../theme/breakpoints'
import Box from '../Box'
import {IContainerRoot} from './types'
import 'react'

const IGNORE_FROM = 0
const MAX_WIDTH = 1024

const baseStyle = css<IContainerRoot>`
  padding-left: ${space.sm}px;
  padding-right: ${space.sm}px;
  width: 100%;

  ${({fluid}) =>
    !fluid &&
    breakpoints.map(
      (breakpoint, index) => `
        @media screen and (min-width: ${breakpoint}) {
            ${
              (index > IGNORE_FROM &&
                `
                    max-width: ${MAX_WIDTH}px;
                    margin: 0 auto;
                    padding-left: 0;
                    padding-right: 0;
                `) ||
              ''
            }
        }
    `,
    )}
`

export const Root = styled(Box)<IContainerRoot>`
  ${baseStyle}
`
