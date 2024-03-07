import React, {FC} from 'react'
import {FocusedBar, Root, TableItemText} from './styles'
import {ITableItem} from './types'

const TableItem: FC<React.PropsWithChildren<ITableItem>> = (props) => {
  const {
    children,
    type = 'td',
    highlight = false,
    disabled = false,
    size = 'sm',
    onClick,
    ...rest
  } = props
  return (
    <Root
      alignItems="center"
      disabled={disabled}
      highlight={highlight}
      justifyContent="center"
      onClick={onClick}
      size={size}
      type={type}
      {...rest}
    >
      <TableItemText
        highlight={highlight}
        size={size}
        textColor={highlight ? 'r300' : 'fontPrimary'}
        type={type}
      >
        {children}
      </TableItemText>
      {type === 'td' && <FocusedBar highlight={highlight} size={size} />}
    </Root>
  )
}

export default TableItem
