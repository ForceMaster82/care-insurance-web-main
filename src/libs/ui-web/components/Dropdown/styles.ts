/* eslint-disable no-magic-numbers */
import {sizes, space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {border, flexbox, overflow, position, variant} from 'styled-system'
import {color, layout, opacity} from '../../theme/system'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import {IBoxRoot} from '../Box/types'
import Typography from '../Typography'
import {
  IDropdownItem,
  IDropdownItems,
  IDropdownItemText,
  IDropdownLabel,
  IDropdownLabelText,
  IDropdownRoot,
} from './types'

const baseStyle = css<IDropdownRoot>`
  display: flex;
  opacity: ${({disabled}): number => (disabled ? 0.4 : 1)};
  box-sizing: border-box;
`

export const Root = styled.div<IDropdownRoot>`
  ${baseStyle}
  ${position}
  ${flexbox}
  ${color}
  ${space}
  ${border}
  ${opacity}
  ${layout}
`

export const DropdownItemText = styled(Typography)<IDropdownItemText>`
  ${variant({
    prop: 'size',
    variants: {
      lg: {
        ...typography.subtitle2,
      },
      md: {
        ...typography.subtitle2,
      },
      sm: {
        ...typography.body4,
      },
      xl: {
        ...typography.subtitle2,
      },
      xs: {
        ...typography.body4,
      },
    },
  })}
`

export const DropdownLabelText = styled(Typography)<IDropdownLabelText>`
  ${variant({
    prop: 'size',
    variants: {
      lg: {
        ...typography.subtitle1,
      },
      md: {
        ...typography.subtitle1,
      },
      sm: {
        ...typography.body3,
      },
      xl: {
        ...typography.subtitle1,
      },
      xs: {
        ...typography.body3,
      },
    },
  })}
`

export const DropdownLabelRoot = styled(Box)<IDropdownLabel>`
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
        height: sizes.lg,
        padding: `${space.sm}px ${space.sm}px`,
      },
      xs: {
        height: sizes.sm,
        padding: `${space.xs}px ${space.sm}px`,
      },
    },
  })}
`

export const DropdownItems = styled(Box)<IDropdownItems & {isMenuUp: boolean}>`
  ${({isMenuUp}) =>
    variant({
      prop: 'size',
      variants: {
        lg: isMenuUp
          ? {bottom: sizes.lg}
          : {
              top: sizes.lg,
            },
        md: isMenuUp
          ? {bottom: sizes.md}
          : {
              top: sizes.md,
            },
        sm: isMenuUp
          ? {bottom: sizes.sm}
          : {
              top: sizes.sm,
            },
        xl: isMenuUp
          ? {bottom: sizes.lg}
          : {
              top: sizes.lg,
            },
        xs: isMenuUp
          ? {bottom: sizes.sm}
          : {
              top: sizes.sm,
            },
      },
    })};
`

export const DropdownItemRoot = styled(Box)<IDropdownItem>`
  cursor: pointer;
`

export const DropdownItemsScrollableArea = styled(Box)<IBoxRoot>`
  ${overflow}
`
