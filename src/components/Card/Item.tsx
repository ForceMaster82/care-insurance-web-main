import React, {PropsWithChildren, ReactElement} from 'react'
import {Box, Chip, Typography} from '@caredoc/ui-web'
import {sizes} from '@caredoc/ui-master'
import TitledItem, {ITitledItemProps} from '../TitledItem'
import {EMPTY_VALUE_TEXT} from '../../constants'

type IProps = {
  fixedHeight?: boolean
  subButton?: {
    onClick: () => void
    text: string
  }
} & ITitledItemProps

const CardItem = ({
  subButton,
  children,
  fixedHeight = true,
  ...rest
}: PropsWithChildren<IProps>): ReactElement => {
  return (
    <TitledItem flex={1} {...rest}>
      <Box
        alignItems="center"
        flexDirection="row"
        gap="xs"
        height={(fixedHeight && sizes.sm) || undefined}
      >
        {(Boolean(children) && typeof children === 'object' && (
          <Box flex={1}>{children}</Box>
        )) || (
          <Box
            height={(fixedHeight && sizes.sm) || undefined}
            justifyContent="center"
          >
            <Typography textColor="fontSecondary" variant="body2">
              {children || EMPTY_VALUE_TEXT}
            </Typography>
          </Box>
        )}
        {subButton && (
          <Box minWidth="fit-content">
            <Chip
              color="fontPrimary"
              onClick={(): void => subButton.onClick()}
              size="sm"
              variant="tertiary"
            >
              {subButton.text}
            </Chip>
          </Box>
        )}
      </Box>
    </TitledItem>
  )
}

export default CardItem
