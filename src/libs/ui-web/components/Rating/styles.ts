import {space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {Icon} from '..'
import {clickable, transition} from '../../theme/mixins'
import Box from '../Box'
import {IRatingGap, IRatingRoot, IRatingWrapper} from './types'
import 'react'

const baseStyle = css<IRatingRoot>`
  ${transition}

  ${({onChange}) => onChange && clickable}

  position: relative;
`

export const RatingWrapper = styled(Box)<IRatingWrapper>`
  ${({isBg}) =>
    !isBg &&
    `
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
`}
`

export const RatingHover = styled.div`
  position: relative;
`

export const RatingStar = styled(Icon)<IRatingGap>`
  ${({index}) =>
    index > 0 &&
    variant({
      prop: 'size',
      variants: {
        lg: {
          marginLeft: space.sm,
        },
        md: {
          marginLeft: space.xs,
        },
        sm: {
          marginLeft: space.xs,
        },
        xl: {
          marginLeft: space.sm,
        },
        xs: {
          marginLeft: space.xxs,
        },
        xxs: {
          marginLeft: space.xxs,
        },
      },
    })}
`

export const RatingEventWrapper = styled.div``

export const Root = styled(Box)<IRatingRoot>`
  ${baseStyle}
`
