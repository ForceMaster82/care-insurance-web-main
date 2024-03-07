import {colors, space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {Typography} from '..'
import {clickable, transition} from '../../theme/mixins'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import {IImageOptionRoot, IImageOptionText} from './types'
import 'react'

const baseStyle = css<IImageOptionRoot>`
  ${transition}
  ${clickable}
`

export const ImageOptionText = styled(Typography)<IImageOptionText>`
  ${variant({
    prop: 'selected',
    variants: {
      true: {
        color: colors.fontWhite,
      },
    },
  })}

  ${variant({
    prop: 'imageOptionSize',
    variants: {
      lg: {
        paddingTop: space.sm,
        ...typography.subtitle1,
      },
      md: {
        paddingTop: space.sm,
        ...typography.body1,
      },
      sm: {
        paddingTop: space.xs,
        ...typography.body3,
      },
    },
  })}
`

export const Root = styled(Box)<IImageOptionRoot>`
  ${baseStyle}
`
