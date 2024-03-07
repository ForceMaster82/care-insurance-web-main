import {Box, IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

type IProps = Pick<IBox, 'flex'>

const CardRowGroup = ({
  children,
  flex,
}: PropsWithChildren<IProps>): ReactElement => {
  return (
    <Box flex={flex} gap="md">
      {children}
    </Box>
  )
}

export default CardRowGroup
