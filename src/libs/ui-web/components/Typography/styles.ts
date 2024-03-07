import styled, {css} from 'styled-components'
import {textAlign, variant} from 'styled-system'
import {color} from '../../theme/system'
import {ITypographyRoot} from './types'

const baseStyle = css<ITypographyRoot>`
  display: inline-block;
  letter-spacing: 0;
  white-space: pre-wrap;
`

export const Root = styled.span<ITypographyRoot>`
  ${baseStyle}
  ${textAlign}
  ${color}

  ${({ellipsis}) =>
    ellipsis &&
    `
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
  `}

  ${variant({
    scale: 'typographyVariants',
  })}
`
