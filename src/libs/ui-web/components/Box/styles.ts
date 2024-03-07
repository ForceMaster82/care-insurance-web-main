/* eslint-disable no-magic-numbers */
import {colors} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {border, flexbox, position, space, variant} from 'styled-system'
import {color, flexGap, layout, opacity, transform} from '../../theme/system'
import elevations from '../../theme/variants/elevation'
import {IBoxRoot} from './types'

const baseStyle = css<IBoxRoot>`
  display: flex;
  opacity: ${({disabled}): number => (disabled ? 0.4 : 1)};
  box-sizing: border-box;
`

export const Root = styled.div<IBoxRoot>`
  ${baseStyle}
  ${position}
  ${flexbox}
  ${color}
  ${space}
  ${border}
  ${layout}
  ${flexGap}
  ${opacity}
  ${transform}

  ${({elevation, borderColor = colors.n200, borderWidth = 1}) =>
    variant({
      variants: {
        filled: {
          overflow: 'hidden',
        },
        outlined: {
          borderColor: borderColor,
          borderStyle: 'solid',
          borderWidth: borderWidth || 1,
          overflow: 'hidden',
        },
        shadow: {
          ...(elevation && elevations[elevation]),
          overflow: 'visible',
        },
      },
    })}
`

export const ClickableRoot = styled(Root)<IBoxRoot>`
  cursor: pointer;
`
