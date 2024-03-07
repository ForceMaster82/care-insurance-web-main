import {colors, Colors, CustomColorKey} from '@caredoc/ui-master'
import {Box, Checkbox, GapKeys, IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren} from 'react'
import styled from 'styled-components'
import TableGrid from '../table/TableGrid'

interface IListItemProps extends IBox {
  backgroundColor?: keyof Colors | CustomColorKey
  gap?: GapKeys
  gridTemplate: string
  highlightHover?: boolean
  isSelected?: boolean
  onSelect?: () => void
  useSelection?: boolean
}

const ListItem = (props: PropsWithChildren<IListItemProps>) => {
  const {
    useSelection = false,
    isSelected = false,
    onSelect,
    highlightHover = false,
    gridTemplate,
    children,
    gap,
    backgroundColor = 'bgPrimary',
    ...rest
  } = props

  return (
    <HighlightHoverBox
      backgroundColor={backgroundColor}
      highlightHover={highlightHover}
      minWidth="fit-content"
      py="sm"
      {...rest}
    >
      <TableGrid gap={gap} gridTemplate={gridTemplate}>
        {useSelection && (
          <Checkbox color="primary" onClick={onSelect} value={isSelected} />
        )}
        {children}
      </TableGrid>
    </HighlightHoverBox>
  )
}

const HighlightHoverBox = styled(Box)<{highlightHover: boolean}>`
  ${(props): string =>
    (props.highlightHover &&
      `
    :hover {
      background-color: ${colors.r000};
    }
  `) ||
    ''}
`

export default ListItem
