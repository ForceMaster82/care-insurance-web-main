import {sizes} from '@caredoc/ui-master'
import {Box, IBox, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'
import {EMPTY_VALUE_TEXT} from '../constants'

export type ITitledItemProps = {
  isOptional?: boolean
  title: string
} & Pick<IBox, 'flex'>

const TitledItem = (
  props: PropsWithChildren<ITitledItemProps>,
): ReactElement => {
  const {children, title, isOptional = false, flex} = props

  return (
    <Box flex={flex} gap="xxs">
      <Box alignItems="flex-end" flexDirection="row" gap="xxs">
        <Typography textColor="fontPrimary" variant="body3">
          {title}
        </Typography>
        {isOptional && (
          <Typography textColor="fontTertiary" variant="caption4">
            (선택사항)
          </Typography>
        )}
      </Box>
      {(typeof children === 'object' && children) || (
        <Box height={sizes.sm} justifyContent="center">
          <Typography variant="body2">
            {children || EMPTY_VALUE_TEXT}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default TitledItem
