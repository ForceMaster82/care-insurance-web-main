import {Box} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

const CardRow = ({children}: PropsWithChildren<unknown>): ReactElement => {
  return (
    <Box flexDirection="row" gap="md">
      {children}
    </Box>
  )
}

export default CardRow
