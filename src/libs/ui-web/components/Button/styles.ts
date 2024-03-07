/* eslint-disable sort-keys-fix/sort-keys-fix */
import styled, {css} from 'styled-components'
import {colors, radius, sizes, space} from '@caredoc/ui-master'
import {variant} from 'styled-system'
import Box from '../Box'
import Typography from '../Typography'
import typography from '../../theme/variants/typography'
import {clickable, ripple, transition} from '../../theme/mixins'
import {IButtonRoot, IButtonText} from './types'
import 'react'

const BG_OPACITY = 0.15

const commonStyle = css`
  ${transition};

  position: relative;
  border-style: none;
`

const baseStyle = css<IButtonRoot>`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ButtonText = styled(Typography)<IButtonText>`
  ${commonStyle}

  ${variant({
    prop: 'size',
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
      xl: {
        ...typography.subtitle1,
      },
      xs: {
        ...typography.caption1,
      },
    },
  })}

  ${({textColor, disabled}) => {
    if (disabled) {
      return css`
        color: ${colors.fontTertiary};
      `
    }
    return variant({
      prop: 'buttonVariant',
      variants: {
        primary: {
          color: colors.fontWhite,
        },
        secondary: {
          color: textColor,
        },
        tertiary: {
          color: textColor,
        },

        // will be deprecated below
        flat: {
          color: textColor,
        },
        outline: {
          color: textColor,
        },
        solid: {
          color: colors.fontWhite,
        },
        textlink: {
          color: textColor,
          textDecoration: 'underline',
        },
        twotone: {
          color: textColor,
        },
      },
    })
  }}
`

export const Root = styled(Box)<IButtonRoot>`
  & > a,
  & > button {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  ${commonStyle};
  ${baseStyle};
  ${clickable};
  ${ripple.input};

  ${variant({
    prop: 'flat',
    variants: {
      true: {
        borderRadius: 'none',
      },
      false: {
        borderRadius: `${radius.sm}px`,
      },
    },
  })};

  ${variant({
    prop: 'size',
    variants: {
      lg: {
        height: sizes.lg,
        padding: `${space.xs}px ${space.sm}px`,
      },
      md: {
        height: sizes.md,
        padding: `${space.xs}px ${space.sm}px`,
      },
      sm: {
        height: sizes.sm,
        padding: `${space.xs}px ${space.sm}px`,
      },
      xl: {
        height: sizes.xl,
        padding: `${space.sm}px ${space.sm}px`,
      },
      xs: {
        height: sizes.xs,
        padding: `${space.xxs}px ${space.sm}px`,
      },
    },
  })};

  ${({color, disabled}) =>
    variant({
      prop: 'buttonVariant',
      variants: {
        primary: {
          backgroundColor: disabled ? 'borderTertiary' : color,
          opacity: 1,
        },
        secondary: {
          '&::before': {
            backgroundColor: disabled ? 'borderTertiary' : color,
            bottom: 0,
            content: JSON.stringify(''),
            left: 0,
            opacity: disabled ? 1 : BG_OPACITY,
            position: 'absolute',
            right: 0,
            top: 0,
          },
          backgroundColor: colors.bgPrimary,
          position: 'relative',
        },
        tertiary: {
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: disabled ? 'fontTertiary' : color,
        },

        // deprecated below
        flat: {
          backgroundColor: 'transparent',
        },
        outline: {
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: disabled ? 'fontTertiary' : color,
        },
        solid: {
          backgroundColor: disabled ? 'borderTertiary' : color,
          opacity: 1,
        },
        textlink: {
          backgroundColor: 'transparent',
          padding: 0,
        },
        twotone: {
          '&::before': {
            backgroundColor: disabled ? 'borderTertiary' : color,
            bottom: 0,
            content: JSON.stringify(''),
            left: 0,
            opacity: disabled ? 1 : BG_OPACITY,
            position: 'absolute',
            right: 0,
            top: 0,
          },
          backgroundColor: colors.bgPrimary,
          position: 'relative',
        },
      },
    })};
`
