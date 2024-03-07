import React, {PropsWithChildren, ReactElement} from 'react'
import TableItem from './TableItem'

interface IProps {
  ellipsis?: boolean
  flex?: number
}

const Td = ({
  children,
  flex,
  ellipsis,
}: PropsWithChildren<IProps>): ReactElement => (
  <TableItem ellipsis={ellipsis} flex={flex}>
    {children}
  </TableItem>
)

export default Td
