import React, {FC} from 'react'
import {CheckIcon, Label, Outline, Root} from './styles'
import {ICheckbox} from './types'

const CheckBox: FC<React.PropsWithChildren<ICheckbox>> = (props) => {
  const {
    analysis,
    size = 'sm',
    color = 'fontSecondary',
    disabled = false,
    value,
    children,
    onClick,
  } = props

  return (
    <Root
      alignItems="center"
      analysis={analysis}
      flexDirection="row"
      gap="xs"
      onClick={onClick}
    >
      <Outline
        alignItems="center"
        backgroundColor={value ? color : 'transparent'}
        borderColor={value ? color : 'fontSecondary'}
        borderRadius="xs"
        borderWidth="md"
        disabled={disabled}
        justifyContent="center"
        size={size}
        variant="outlined"
      >
        <CheckIcon fill={value ? 'fontWhite' : 'transparent'} name="check" />
      </Outline>
      {children && <Label size={size}>{children}</Label>}
    </Root>
  )
}

export default CheckBox
