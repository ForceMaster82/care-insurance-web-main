import styled from 'styled-components'
import {variant} from 'styled-system'
import {Typography} from '..'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import {IInfoGridLabel, IInfoGridRoot, IInfoGridText} from './types'
import 'react'

export const InfoGridLabel = styled(Typography)<IInfoGridLabel>`
  ${variant({
    prop: 'infoGridSize',
    variants: {
      lg: {
        ...typography.body4,
      },
      md: {
        ...typography.caption2,
      },
      sm: {
        ...typography.caption2,
      },
    },
  })}
`

export const InfoGridText = styled(Typography)<IInfoGridText>`
  ${variant({
    prop: 'infoGridSize',
    variants: {
      lg: {
        ...typography.subtitle1,
      },
      md: {
        ...typography.body1,
      },
      sm: {
        ...typography.body3,
      },
    },
  })}
`

export const Root = styled(Box)<IInfoGridRoot>`
  ${variant({
    prop: 'size',
    variants: {
      lg: {
        height: 88,
      },
      md: {
        height: 88,
      },
      sm: {
        height: 80,
      },
    },
  })}
`
