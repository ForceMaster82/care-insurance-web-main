import {colors, sizes, space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import Typography from '../Typography'
import {clickable, transition} from '../../theme/mixins'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import Icon from '../Icon'
import {
  IHTMLInput,
  IInput,
  IInputCaption,
  IInputIcon,
  IInputMaxLength,
  IInputRoot,
  IInputWrapper,
} from './types'
import 'react'

const baseStyle = css<IInputRoot>``

const textStyle = css<IHTMLInput>`
  ${transition}

  border: none;
  width: 100%;
  outline: none;
  background-color: transparent;
  color: ${colors.n700};

  ::placeholder {
    color: ${colors.n500};
  }

  ${variant({
    prop: 'status',
    variants: {
      disabled: {
        color: colors.fontSecondary,
      },
      error: {
        color: colors.negative,
      },
      validated: {
        color: colors.positive,
      },
    },
  })}
`

export const InputWrapper = styled(Box)<IInputWrapper>`
  ${transition}

  border-color: ${colors.n200};
  background-color: ${colors.bgPrimary};
  border-width: 1px;

  ${variant({
    prop: 'status',
    variants: {
      disabled: {
        backgroundColor: colors.n100,
        borderColor: colors.n200,
      },
      error: {
        backgroundColor: colors.r000,
        borderColor: colors.r100,
      },
      validated: {
        backgroundColor: colors.g000,
        borderColor: colors.g100,
      },
    },
  })}

  ${variant({
    prop: 'inputSize',
    variants: {
      lg: {
        minHeight: sizes.lg,
        padding: `${space.sm}px`,
      },
      md: {
        minHeight: sizes.md,
        padding: `${space.xs}px ${space.sm}px`,
      },
      sm: {
        minHeight: sizes.sm,
        padding: `${space.xs}px ${space.sm}px`,
      },
    },
  })};
`

export const InputContent = styled(Box)``

export const InputIcon = styled(Icon)<IInputIcon>`
  ${transition}
  ${textStyle}
  ${clickable}

${({focused}) =>
    !focused &&
    `
  & svg * {
    fill: ${colors.n500}
  }
`};

  ${variant({
    prop: 'status',
    variants: {
      disabled: {
        '& svg *': {
          fill: colors.fontSecondary,
        },
      },
      error: {
        '& svg *': {
          fill: colors.negative,
        },
      },
      validated: {
        '& svg *': {
          fill: colors.positive,
        },
      },
    },
  })}
`

export const TextInput = styled.input<IHTMLInput & IInput>`
  -webkit-appearance: none;

  ${transition};
  ${textStyle};

  ${({ellipsis}) =>
    ellipsis &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}

  ${variant({
    prop: 'inputSize',
    variants: {
      lg: typography.subtitle2,
      md: typography.body2,
      sm: typography.body4,
    },
  })};
`

export const Textarea = styled.textarea<IHTMLInput>`
  ${transition}
  ${textStyle}

  resize: none;
  overflow: visible;

  ${variant({
    prop: 'inputSize',
    variants: {
      lg: typography.subtitle2,
      md: typography.body2,
      sm: typography.body4,
    },
  })};
`

export const InputMaxLength = styled(Typography)<IInputMaxLength>`
  ${transition}
  ${textStyle}

  border: none;
  width: 100%;
  outline: none;
  background-color: transparent;

  ${({focused}) => !focused && `color: ${colors.n500}`};

  ${variant({
    prop: 'status',
    variants: {
      disabled: {
        color: colors.fontTertiary,
      },
      error: {
        color: colors.negative,
      },
      validated: {
        color: colors.positive,
      },
    },
  })}

  ${variant({
    prop: 'inputSize',
    variants: {
      lg: typography.body4,
      md: typography.caption2,
      sm: typography.caption2,
    },
  })};
`

export const InputCaption = styled(Typography)<IInputCaption>`
  color: ${colors.n600};
  padding-left: ${space.xs}px;

  ${variant({
    prop: 'status',
    variants: {
      disabled: {
        color: colors.fontSecondary,
      },
      error: {
        color: colors.negative,
      },
    },
  })}

  ${variant({
    prop: 'inputSize',
    variants: {
      lg: typography.body2,
      md: typography.body4,
      sm: typography.caption2,
    },
  })}
`

export const Root = styled(Box)<IInputRoot>`
  ${baseStyle}
`
