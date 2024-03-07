import {Box, IBox, Typography} from '@caredoc/ui-web'
import React, {ReactElement, ReactNode} from 'react'

type IProps = {
  leftSide?: ReactNode
  rightSide?: ReactNode
  title: string
} & Pick<
  IBox,
  | 'borderRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
>

const CardHeader = (props: IProps): ReactElement => {
  const {title, leftSide, rightSide, ...rest} = props

  return (
    <Box
      alignItems="center"
      backgroundColor="bgPrimary"
      flexDirection="row"
      justifyContent="space-between"
      px="md"
      py="sm"
      {...rest}
    >
      <Box alignItems="center" flexDirection="row" gap="sm">
        <Typography variant="subtitle1">{title}</Typography>
        {leftSide}
      </Box>
      {rightSide}
    </Box>
  )
}

export default CardHeader
