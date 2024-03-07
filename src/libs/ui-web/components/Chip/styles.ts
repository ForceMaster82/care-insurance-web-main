/* eslint-disable sort-keys-fix/sort-keys-fix */
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {colors, space} from '@caredoc/ui-master'
import Typography from '../Typography'
import Box from '../Box'
import Icon from '../Icon'
import typography from '../../theme/variants/typography'
import {transition} from '../../theme/mixins'
import {opacityBorderColor} from '../../theme/system/color'
import {IChipIcon, IChipRoot, IChipText} from './types'
import 'react'

const BG_OPACITY = 0.15

const baseStyle = css<IChipRoot>`
  ${transition}

  position: relative;
  border-style: none;
`

export const ChipIcon = styled(Icon)<IChipIcon>`
  ${variant({
    prop: 'chipVariant',
    variants: {
      primary: {
        '& svg *': {
          fill: colors.fontWhite,
        },
      },

      // will be deprecated below
      solid: {
        '& svg *': {
          fill: colors.fontWhite,
        },
      },
    },
  })}
`

export const ChipText = styled(Typography)<IChipText>`
  ${variant({
    prop: 'chipVariant',
    variants: {
      primary: {
        color: colors.fontWhite,
      },

      // will be deprecated below
      solid: {
        color: colors.fontWhite,
      },
    },
  })}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        ...typography.body1,
      },
      md: {
        ...typography.body3,
      },
      sm: {
        ...typography.caption1,
      },
      xl: {...typography.subtitle1},
      xs: {
        ...typography.caption3,
      },
    },
  })}
`

export const Root = styled(Box)<IChipRoot>`
  ${baseStyle}
  ${opacityBorderColor}

  ${({color}) =>
    variant({
      prop: 'chipVariant',
      variants: {
        primary: {
          '&::before': {
            display: 'none',
          },
          borderWidth: 0,
          backgroundColor: color,
        },
        secondary: {
          '&::before': {
            backgroundColor: color,
            bottom: 0,
            content: JSON.stringify(''),
            left: 0,
            opacity: BG_OPACITY,
            position: 'absolute',
            right: 0,
            top: 0,
          },
          backgroundColor: 'transparent',
          borderWidth: 0,
          overflow: 'hidden',
          position: 'relative',
        },
        tertiary: {
          '&::before': {
            display: 'none',
          },
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: 1,
        },

        // will be deprecated below
        outline: {
          '&::before': {
            display: 'none',
          },
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: 1,
        },
        solid: {
          '&::before': {
            display: 'none',
          },
          backgroundColor: color,
        },
        twotone: {
          '&::before': {
            backgroundColor: color,
            bottom: 0,
            content: JSON.stringify(''),
            left: 0,
            opacity: BG_OPACITY,
            position: 'absolute',
            right: 0,
            top: 0,
          },
          backgroundColor: 'transparent',
          borderWidth: 0,
          overflow: 'hidden',
          position: 'relative',
        },
      },
    })}

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        height: 40,
        padding: `0px ${space.sm}px`,
      },
      md: {
        height: 32,
        padding: `0px ${space.xs}px`,
      },
      sm: {
        height: 24,
        padding: `0px ${space.xs}px`,
      },
      xl: {
        height: 48,
        padding: `0px ${space.sm}px`,
      },
      xs: {
        height: 20,
        padding: `0px ${space.xs}px`,
      },
    },
  })}
`
