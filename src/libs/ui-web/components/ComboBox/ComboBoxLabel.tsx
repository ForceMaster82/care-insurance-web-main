import React, {FC} from 'react'
import {Typography} from '..'
import {IBox} from '../Box/types'
import {ComboBoxLabelRoot, ComboBoxLabelText} from './styles'
import {IComboBoxLabel} from './types'

export const LabelText: FC<React.PropsWithChildren<IBox>> = (props) => (
  <Typography {...props} textColor="n700" variant="heading6">
    {props.children}
  </Typography>
)

export const ComboBoxLabel: FC<React.PropsWithChildren<IComboBoxLabel>> = ({
  label,
  isActive,
  children,
  size = 'sm',
  isSelected,
  error,
  ...rest
}) => {
  return (
    <>
      {label && <ComboBoxLabelText size={size}>{label}</ComboBoxLabelText>}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-ignore*/}
      <ComboBoxLabelRoot
        borderRadius="sm"
        className="comboBoxRoot"
        isActive={isActive}
        justifyContent="center"
        size={size}
        {...rest}
        error={error}
        isSelected={isSelected}
        variant="outlined"
      >
        {children}
      </ComboBoxLabelRoot>
    </>
  )
}

export default ComboBoxLabel
