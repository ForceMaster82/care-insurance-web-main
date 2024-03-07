import {sizes} from '@caredoc/ui-master'
import styled from 'styled-components'
import {variant} from 'styled-system'
import {Typography} from '..'
import {clickable, transition} from '../../theme/mixins'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import {IRadioLabel, IRadioRoot, IRadioRound} from './types'
import 'react'

const SIZE = {
  lg: 12,
  md: 10,
  sm: 8,
}

export const Ball = styled(Box)<IRadioRound>`
  ${transition}

  ${({color}) =>
    variant({
      prop: 'value',
      variants: {
        true: {
          backgroundColor: color,
        },
      },
    })};

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        borderRadius: sizes.size5,
        height: SIZE.lg,
        width: SIZE.lg,
      },
      md: {
        borderRadius: sizes.size4,
        height: SIZE.md,
        width: SIZE.md,
      },
      sm: {
        borderRadius: sizes.size3,
        height: SIZE.sm,
        width: SIZE.sm,
      },
    },
  })}
`

export const Round = styled(Box)<IRadioRound>`
  ${clickable}
  ${transition}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        borderRadius: sizes.size5,
        height: SIZE.lg * 2,
        width: SIZE.lg * 2,
      },
      md: {
        borderRadius: sizes.size4,
        height: SIZE.md * 2,
        width: SIZE.md * 2,
      },
      sm: {
        borderRadius: sizes.size3,
        height: SIZE.sm * 2,
        width: SIZE.sm * 2,
      },
    },
  })}
`

export const Label = styled(Typography)<IRadioLabel>`
  ${clickable}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        ...typography.body4,
      },
      md: {
        ...typography.caption2,
      },
      sm: {
        ...typography.caption4,
      },
    },
  })}
`

export const Root = styled(Box)<IRadioRoot>``
