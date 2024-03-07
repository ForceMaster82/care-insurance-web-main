import React, {FC} from 'react'
import {Typography} from '..'
import {IBox} from '../Box/types'
import {DropdownLabelRoot, DropdownLabelText} from './styles'
import {IDropdownLabel} from './types'

export const LabelText: FC<React.PropsWithChildren<IBox>> = (props) => (
  <Typography {...props} textColor="n700" variant="heading6">
    {props.children}
  </Typography>
)

export const DropdownLabel: FC<React.PropsWithChildren<IDropdownLabel>> = ({
  label,
  isActive,
  children,
  size = 'sm',
  ...rest
}) => (
  <>
    {label && <DropdownLabelText size={size}>{label}</DropdownLabelText>}
    <DropdownLabelRoot
      borderRadius="size1"
      isActive={isActive}
      justifyContent="center"
      size={size}
      {...rest}
      variant="outlined"
    >
      {children}
    </DropdownLabelRoot>
  </>
)

export default DropdownLabel
