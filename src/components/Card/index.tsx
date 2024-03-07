import React, {PropsWithChildren, ReactElement} from 'react'
import {Box} from '@caredoc/ui-web'
import CardHeader from './Header'
import CardBody from './Body'
import CardItem from './Item'
import CardDivider from './Divider'
import CardRow from './Row'
import CardRowGroup from './RowGroup'
import CardInput from './Input'
import CardButtonArea from './ButtonArea'

const Card = ({children}: PropsWithChildren<unknown>): ReactElement => {
  return (
    <Box backgroundColor="borderTertiary" borderRadius="md" gap={1}>
      {children}
    </Box>
  )
}

export default Card

Card.Header = CardHeader
Card.Body = CardBody
Card.Item = CardItem
Card.Divider = CardDivider
Card.Row = CardRow
Card.RowGroup = CardRowGroup
Card.Input = CardInput
Card.ButtonArea = CardButtonArea
