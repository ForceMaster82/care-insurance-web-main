import {colors, space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {Typography} from '..'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import Divider from '../Divider'
import {ITableItemBar, ITableItemRoot, ITableItemText} from './types'
import 'react'

const baseStyle = css<ITableItemRoot>`
  position: relative;
`

export const FocusedBar = styled(Divider)<ITableItemBar>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;

  ${({highlight}) =>
    highlight &&
    variant({
      prop: 'size',
      variants: {
        lg: {
          backgroundColor: colors.r000,
        },
        md: {
          backgroundColor: colors.r000,
        },
        sm: {
          backgroundColor: colors.r100,
        },
      },
    })}
`

export const TableItemText = styled(Typography)<ITableItemText>`
  ${({highlight, type}) =>
    variant({
      prop: 'size',
      variants: {
        lg: type === 'th' || highlight ? typography.body1 : typography.body2,
        md: type === 'th' || highlight ? typography.body3 : typography.body4,
        sm:
          type === 'th' || highlight
            ? typography.caption1
            : typography.caption2,
      },
    })}
`

export const Root = styled(Box)<ITableItemRoot>`
  ${baseStyle}

  ${({highlight}) =>
    variant({
      prop: 'type',
      variants: {
        th: {
          backgroundColor: highlight ? colors.r000 : colors.n100,
          ...typography.body3,
        },
      },
    })}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        height: 64,
        padding: `0 ${space.sm}px`,
      },
      md: {
        height: 56,
        padding: `0 ${space.sm}px`,
      },
      sm: {
        height: 34,
        padding: `0 ${space.sm}px`,
      },
    },
  })}
`
