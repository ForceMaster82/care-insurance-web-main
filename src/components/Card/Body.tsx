import {Box, IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

type IProps = Pick<
  IBox,
  | 'borderRadius'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
>

const CardBody = ({
  children,
  ...rest
}: PropsWithChildren<IProps>): ReactElement => {
  return (
    <Box backgroundColor="bgPrimary" p="md" {...rest}>
      {children}
    </Box>
  )
}

export default CardBody
