import React, {FC} from 'react'
import {Ball, Label, Root, Round} from './styles'
import {IRadio} from './types'

const Radio: FC<React.PropsWithChildren<IRadio>> = (props) => {
  const {
    analysis,
    disabled = false,
    color = 'fontSecondary',
    size = 'sm',
    value = false,
    onClick,
    children,
    ...rest
  } = props

  const radioProps: IRadio = {
    color,
    size,
    value: Boolean(value),
  }
  return (
    <Root
      alignItems="center"
      analysis={analysis}
      flexDirection="row"
      gap="xs"
      justifyContent="center"
      onClick={onClick}
    >
      <Round
        alignItems="center"
        borderColor={value ? color : 'fontSecondary'}
        borderWidth="md"
        disabled={disabled}
        gap="sm"
        justifyContent="center"
        variant="outlined"
        {...radioProps}
        {...rest}
      >
        <Ball {...radioProps} />
      </Round>
      <Label size={size}>{children}</Label>
    </Root>
  )
}

export default Radio
