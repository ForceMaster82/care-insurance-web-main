import React, {FC} from 'react'
import {IButton} from './types'
import {ButtonText, Root} from './styles'

/**
 * variant warning
 * - solid, two-tone, outline are deprecated use primary, secondary, tertiary
 * - textlink -> use Link component
 * - flat -> use Link component (use flat)
 *
 * color alias (color)
 * - primary: r400
 * - primaryVariant: r300
 * - positive: g500
 * - negative: r500
 * - warning: y500
 * - information: b500
 */
const Button: FC<
  React.PropsWithChildren<
    IButton & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>
  >
> = (props) => {
  const {
    as,
    className,
    children,
    flat = false,
    flex,
    analysis,
    size = 'sm',
    variant = 'primary',
    color = 'fontPrimary',
    disabled = false,
    isLoading = false,
    onClick = () => null,
    type = 'button',
    ...other
  } = props

  const attrs = {
    alignItems: 'center',
    analysis,
    as,
    buttonVariant: {variant},
    className,
    color,
    disabled: disabled || isLoading,
    flat,
    flex,
    flexDirection: 'row',
    justifyContent: 'center',
    onClick,
    opacityBorderColor: {color},
    size,
    type,
    ...other,
  }
  return (
    <Root {...attrs}>
      <ButtonText
        buttonVariant={variant}
        disabled={disabled}
        size={size}
        textAlign="center"
        textColor={color}
      >
        {isLoading ? (
          <span aria-label="content-loader">loading...</span>
        ) : (
          children
        )}
      </ButtonText>
    </Root>
  )
}

export default Button
