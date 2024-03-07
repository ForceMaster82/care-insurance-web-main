import React, {FC, useEffect, useState} from 'react'
import {Box, Icon, Typography} from '..'
import {IDropdownActionSheet} from './types'

export const DropdownActionSheet: FC<
  React.PropsWithChildren<IDropdownActionSheet>
> = ({close, title = '선택', children, ...rest}) => {
  // eslint-disable-next-line no-magic-numbers
  const [position, setPosition] = useState(0)

  useEffect(() => {
    setPosition(0)
  }, [position])

  return (
    <Box
      {...rest}
      height="100vh"
      left="0"
      overflow="hidden"
      position="fixed"
      top="0"
      width="100vw"
      zIndex={10_000}
    >
      <Box
        backgroundColor="n900"
        height="100%"
        left="0"
        onClick={close}
        opacity=".3"
        position="fixed"
        top="0"
        width="100%"
      />
      <Box
        backgroundColor="n000"
        borderTopLeftRadius="size4"
        borderTopRightRadius="size4"
        bottom={position}
        left="0"
        position="fixed"
        transition="bottom 0.3s ease-in-out"
        width="100vw"
      >
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          padding="sm"
        >
          <Typography textColor="n700" variant="heading7">
            {title}
          </Typography>
          <Box onClick={close}>
            <Icon fill="n700" name="close" size="sm" />
          </Box>
        </Box>
        <Box maxHeight="480px" overflow="scroll">
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default DropdownActionSheet
