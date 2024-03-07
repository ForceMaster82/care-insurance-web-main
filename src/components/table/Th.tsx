import React, {PropsWithChildren, ReactElement} from 'react'
import TableItem from './TableItem'

const Th = ({
  children,
  flex,
}: PropsWithChildren<{flex?: number}>): ReactElement => (
  <TableItem flex={flex} type="th">
    {children}
  </TableItem>
)

export default Th
