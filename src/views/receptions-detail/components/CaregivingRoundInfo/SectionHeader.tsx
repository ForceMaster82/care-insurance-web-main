import {Box, Divider, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

const SectionHeader = ({
  children,
}: PropsWithChildren<unknown>): ReactElement => {
  return (
    <Box gap="xs">
      <Typography variant="body1">{children}</Typography>
      <Divider color="borderSecondary" />
    </Box>
  )
}

export default SectionHeader
