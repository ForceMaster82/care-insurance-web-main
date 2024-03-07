/* eslint-disable sort-keys-fix/sort-keys-fix */
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {sizes, space} from '@caredoc/ui-master'
import Box from '../Box'
import Typography from '../Typography'
import typography from '../../theme/variants/typography'
import {opacityBorderColor} from '../../theme/system/color'
import {transition} from '../../theme/mixins'
import {ILinkRoot, ILinkText} from './types'
import 'react'

const commonStyle = css`
  ${transition}

  position: relative;
  border-style: none;
`

const baseStyle = css<ILinkRoot>``

export const LinkText = styled(Typography)<ILinkText>`
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

  ${({flat}) => !flat && 'text-decoration: underline;'}
  ${({textColor}) => textColor && `color: ${textColor};`}
`

export const Root = styled(Box)<ILinkRoot>`
  ${commonStyle}
  ${baseStyle}
  ${opacityBorderColor}
  & > a {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  ${({flat}) =>
    flat &&
    variant({
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
    })}
`
