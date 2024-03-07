import styled from 'styled-components'
import {variant} from 'styled-system'
import Icon from '../Icon'
import {transition} from '../../theme/mixins'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import {ICheckboxLabel, ICheckboxOutline, ICheckboxRoot} from './types'
import 'react'

const SIZE = {
  lg: 24,
  md: 20,
  sm: 16,
}

export const Outline = styled(Box)<ICheckboxOutline>`
  ${transition}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        height: SIZE.lg,
        width: SIZE.lg,
      },
      md: {
        height: SIZE.md,
        width: SIZE.md,
      },
      sm: {
        height: SIZE.sm,
        width: SIZE.sm,
      },
    },
  })}
`

export const CheckIcon = styled(Icon)`
  & svg * {
    width: 100%;
    height: 100%;
  }
`

export const Label = styled(Box)<ICheckboxLabel>`
  ${transition}

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

export const Root = styled(Box)<ICheckboxRoot>``
