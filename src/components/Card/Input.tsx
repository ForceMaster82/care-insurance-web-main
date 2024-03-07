import React, {ReactElement} from 'react'
import {Box, IBox, IInput, Input} from '@caredoc/ui-web'
import {MAX_LENGTH} from '../../constraints/input'

type IProps = Pick<IBox, 'onClick'> & IInput

const CardInput = ({onClick, ...rest}: IProps): ReactElement => {
  return (
    <Box onClick={onClick}>
      <Input
        forcedInput
        hideMaxLengthText
        maxLength={MAX_LENGTH.DEFAULT}
        {...rest}
      />
    </Box>
  )
}

export default CardInput
