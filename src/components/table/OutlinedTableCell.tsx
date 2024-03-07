import {Box, IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren} from 'react'

interface IOutlinedTableCellProps extends IBox {
  isWrapper?: boolean
}

export const OutlinedTableCell = (
  props: PropsWithChildren<IOutlinedTableCellProps>,
) => {
  const {isWrapper = false, children, ...rest} = props

  return (
    <Box
      alignItems="center"
      alignSelf="stretch"
      backgroundColor={isWrapper ? 'borderSecondary' : 'bgPrimary'}
      gap={isWrapper ? 1 : 0}
      justifyContent="center"
      p={isWrapper ? 'none' : 'sm'}
      width="100%"
      {...rest}
    >
      {children}
    </Box>
  )
}

export default OutlinedTableCell
