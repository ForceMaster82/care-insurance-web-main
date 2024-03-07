import {Box, IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'
import Th from './Th'
import Td from './Td'

interface ITableInformationCell extends IBox {
  contents: string | number | undefined
  title: string
}

const TableInformationCell = (
  props: PropsWithChildren<ITableInformationCell>,
): ReactElement => {
  const {title, contents, flexDirection, ...rest} = props
  return (
    <Box flexDirection={flexDirection} gap="xxs" {...rest}>
      <Th flex={1}>{title}</Th>
      <Td flex={1}>{contents}</Td>
    </Box>
  )
}

export default TableInformationCell
