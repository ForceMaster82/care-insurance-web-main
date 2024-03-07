import React, {FC} from 'react'
import {Ball, Root} from './styles'
import {IToggle} from './types'

const Toggle: FC<React.PropsWithChildren<IToggle>> = (props) => {
  const {
    color = 'r300',
    size = 'sm',
    value,
    onClick,
    disabled,
    analysis,
    ...rest
  } = props
  return (
    <Root
      analysis={analysis}
      backgroundColor={color}
      borderRadius="size6"
      disabled={disabled}
      onClick={onClick}
      size={size}
      value={value}
      {...rest}
    >
      <Ball size={size} value={Boolean(value)} variant="shadow" />
    </Root>
  )
}

export default Toggle
