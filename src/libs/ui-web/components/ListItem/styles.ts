import {sizes, space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {Typography} from '..'
import {clickable} from '../../theme/mixins'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import {IListItemRoot, IListItemText} from './types'
import 'react'

const baseStyle = css<IListItemRoot>`
  ${({onClick}) => onClick && clickable}
`

export const ListItemText = styled(Typography)<IListItemText>`
  ${variant({
    prop: 'listItemSize',
    variants: {
      lg: {
        ...typography.subtitle2,
      },
      md: {
        ...typography.body2,
      },
      sm: {
        ...typography.body4,
      },
    },
  })}
`

export const Root = styled(Box)<IListItemRoot>`
  ${baseStyle}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        height: `${sizes.lg}px`,
        padding: `${space.md}px ${space.sm}px `,
      },
      md: {
        height: `${sizes.md}px`,
        padding: `${space.sm}px`,
      },
      sm: {
        height: `${sizes.sm}px`,
        padding: `${space.xs}px ${space.sm}px`,
      },
    },
  })}
`
