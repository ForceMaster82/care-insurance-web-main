import {Box, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren} from 'react'

interface IProps {
  textAlign?: 'end' | 'center' | 'start'
}

const EllipsisText = (props: PropsWithChildren<IProps>) => {
  const {textAlign = 'center', children} = props
  return (
    <Box
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
      width="100%"
    >
      <Typography ellipsis textAlign={textAlign} variant="body4">
        {children}
      </Typography>
    </Box>
  )
}

export default EllipsisText
