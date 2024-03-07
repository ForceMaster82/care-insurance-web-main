/* eslint-disable no-magic-numbers */
import {colors, sizes, space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {border, flexbox, overflow, position, variant} from 'styled-system'
import {color, layout, opacity} from '../../theme/system'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import {IBoxRoot} from '../Box/types'
import Typography from '../Typography'
import {
  IComboBoxItem,
  IComboBoxItems,
  IComboBoxItemText,
  IComboBoxLabel,
  IComboBoxLabelText,
  IComboBoxRoot,
} from './types'

const baseStyle = css<IComboBoxRoot>`
  display: flex;
  opacity: ${({disabled}): number => (disabled ? 0.4 : 1)};
  box-sizing: border-box;
`

export const Root = styled.div<IComboBoxRoot>`
  ${baseStyle}
  ${position}
  ${flexbox}
  ${color}
  ${space}
  ${border}
  ${opacity}
  ${layout}
`

export const ComboBoxItemText = styled(Typography)<IComboBoxItemText>`
  ${variant({
    prop: 'size',
    variants: {
      lg: {
        ...typography.subtitle2,
      },
      md: {
        ...typography.body4,
      },
      sm: {
        ...typography.body4,
      },
    },
  })}
`

export const ComboBoxLabelText = styled(Typography)<IComboBoxLabelText>`
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
    },
  })}
`

const getBackgroundColor = (error: string[] | null, isSelected: boolean) => {
  if (!isSelected && error && error.length > 0) {
    return css`
      background: ${colors.r000};
    `
  }
  return css`
    background: ${colors.bgPrimary};
  `
}

const getBorderColor = (
  isActive: boolean,
  error: string[] | null,
  isSelected: boolean,
) => {
  if (isActive) {
    return css`
      border-color: ${colors.borderTertiary};
    `
  } else if (isSelected) {
    return css`
      border-color: ${colors.borderTertiary};
    `
  } else if (error && error.length > 0) {
    return css`
      border-color: ${colors.r100};
    `
  }

  return css`
    border-color: ${colors.borderPrimary};
  `
}
export const ComboBoxLabelRoot = styled(Box)<
  IComboBoxLabel & {error: null | string[]; isSelected: boolean}
>`
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
    },
  })}
  ${(props) => getBackgroundColor(props.error, props.isSelected)}
  ${(props) => getBorderColor(props.isActive, props.error, props.isSelected)}
`

export const ComboBoxItems = styled(Box)<IComboBoxItems & {isMenuUp: boolean}>`
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
      },
    })};
`

export const ComboBoxItemRoot = styled(Box)<IComboBoxItem>`
  cursor: pointer;
`

export const ComboBoxItemsScrollableArea = styled(Box)<IBoxRoot>`
  ${overflow}
`
export const ComboBoxSelectTypo = styled(Typography)<IComboBoxLabelText>`
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
    },
  })}
`
