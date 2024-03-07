import {colors, space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import Icon from '../Icon'
import Typography from '../Typography'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import {IInfoBoxIcon, IInfoBoxRoot, IInfoBoxText} from './types'
import 'react'

const baseStyle = css<IInfoBoxRoot>`
  position: relative;
  overflow: hidden;
`

export const InfoBoxIcon = styled(Icon)<IInfoBoxIcon>`
  ${variant({
    prop: 'state',
    variants: {
      error: {
        '& svg *': {
          fill: colors.r500,
        },
      },
      info: {
        '& svg *': {
          fill: colors.b500,
        },
      },
      success: {
        '& svg *': {
          fill: colors.g500,
        },
      },
      warning: {
        '& svg *': {
          fill: colors.y500,
        },
      },
    },
  })}
`

export const InfoBoxText = styled(Typography)<IInfoBoxText>`
  ${variant({
    prop: 'state',
    variants: {
      error: {
        color: colors.r900,
      },
      info: {
        color: colors.b900,
      },
      success: {
        color: colors.g900,
      },
      warning: {
        color: colors.y900,
      },
    },
  })}

  ${variant({
    prop: 'infoBoxSize',
    variants: {
      lg: {
        ...typography.body2,
      },
      md: {
        ...typography.body4,
      },
      sm: {
        ...typography.caption2,
      },
    },
  })}
`

export const Root = styled(Box)<IInfoBoxRoot>`
  ${baseStyle}

  ${variant({
    prop: 'state',
    variants: {
      error: {
        backgroundColor: colors.r000,
      },
      info: {
        backgroundColor: colors.b000,
      },
      success: {
        backgroundColor: colors.g000,
      },
      warning: {
        backgroundColor: colors.y000,
      },
    },
  })}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        padding: space.sm,
      },
      md: {
        padding: space.sm,
      },
      sm: {
        padding: space.xs,
      },
    },
  })}
`
