import {Box, IBox, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

interface IProps extends IBox {
  title?: string
}

const SearchFilterTitleWrapper = ({
  title,
  children,
  ...rest
}: PropsWithChildren<IProps>): ReactElement => {
  return (
    <Box alignItems="center" flexDirection="row" gap="sm" pl="xs" {...rest}>
      {Boolean(title) && (
        <>
          <Typography variant="body3">{title}</Typography>
          <Typography textColor="fontTertiary" variant="body4">
            |
          </Typography>
        </>
      )}
      {children}
    </Box>
  )
}

export default SearchFilterTitleWrapper
