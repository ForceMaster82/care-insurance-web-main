import React, {FC} from 'react'
import {Chip} from '..'
import {DropdownItemRoot, DropdownItemText} from './styles'
import {IDropdownItem} from './types'

export interface IDropdownItemData<T> {
  badge?: string
  data: T
  disabled?: boolean
  handleOnDisabled?: () => void
  label: string
}
export const DropdownItem: FC<React.PropsWithChildren<IDropdownItem>> = ({
  badge,
  disabled,
  isFirst,
  size = 'sm',
  isHeader,
  isSelected,
  children,
  onClick,
  ...rest
}) => {
  return (
    <DropdownItemRoot
      {...rest}
      alignItems="center"
      backgroundColor={isSelected ? 'r400' : 'n000'}
      borderBottomWidth={isHeader ? 'size1' : 'size0'}
      borderColor="n200"
      borderLeftWidth="size0"
      borderRightWidth="size0"
      borderStyle="solid"
      borderTopWidth={isFirst ? 'size0' : 'size1'}
      disabled={disabled}
      flexDirection="row"
      justifyContent="space-between"
      onClick={onClick}
      padding="sm"
      width="100%"
    >
      <DropdownItemText size={size} textColor={isSelected ? 'n000' : 'n700'}>
        {children}
      </DropdownItemText>
      {badge && <Chip color={disabled ? 'n700' : 'g400'}>{badge}</Chip>}
    </DropdownItemRoot>
  )
}
