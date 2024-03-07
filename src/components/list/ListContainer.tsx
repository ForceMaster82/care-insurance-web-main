import {Box, IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren} from 'react'

type IListContainerProps = Pick<IBox, 'backgroundColor'>

const ListContainer = (props: PropsWithChildren<IListContainerProps>) => {
  const {children, backgroundColor = 'borderSecondary'} = props

  return (
    <Box
      backgroundColor={backgroundColor}
      borderRadius="sm"
      gap={1}
      overflowX="auto"
    >
      {children}
    </Box>
  )
}

export default ListContainer
