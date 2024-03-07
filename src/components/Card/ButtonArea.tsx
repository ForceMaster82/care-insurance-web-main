import {Box, IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

const BUTTON_AREA_WIDTH = 136

type IProps = Pick<IBox, 'flex' | 'gap' | 'justifyContent'>

const CardButtonArea = ({
  children,
  flex,
  ...rest
}: PropsWithChildren<IProps>): ReactElement => (
  <Box flex={flex}>
    <Box alignSelf="flex-end" flex={1} width={BUTTON_AREA_WIDTH} {...rest}>
      {children}
    </Box>
  </Box>
)

export default CardButtonArea
