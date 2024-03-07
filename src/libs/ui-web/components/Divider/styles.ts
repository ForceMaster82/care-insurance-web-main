import {colors, space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import Box from '../Box'
import {IDividerRoot} from './types'
import 'react'

const baseStyle = css<IDividerRoot>`
  width: 100%;
  background-color: ${({backgroundColor}) => backgroundColor || colors.n100};
`

export const Root = styled(Box)<IDividerRoot>`
  ${baseStyle}

  ${(backgroundColor) =>
    variant({
      prop: 'size',
      variants: {
        lg: {
          height: space.size4,
        },
        md: {
          height: space.size3,
        },
        sm: {
          height: space.size2,
        },
        xl: {
          height: space.size5,
        },
        xs: {
          height: space.size1,
        },
        xxl: {
          height: space.size6,
        },
        xxs: {
          backgroundColor: backgroundColor || colors.n200,
          height: 1,
        },
      },
    })}
`
