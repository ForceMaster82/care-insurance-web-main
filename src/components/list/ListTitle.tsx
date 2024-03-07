import {Box, Checkbox, IBox, Typography} from '@caredoc/ui-web'
import React from 'react'
import TableGrid from '../table/TableGrid'

interface IListTitleProps extends IBox {
  gridTemplate: string
  isSelected?: boolean
  onSelect?: () => void
  titleList: string[]
  useSelection?: boolean
}

const ListTitle = (props: IListTitleProps) => {
  const {
    gridTemplate,
    titleList,
    useSelection = false,
    isSelected = false,
    onSelect,
    ...rest
  } = props

  return (
    <Box backgroundColor="bgPrimary" minWidth="fit-content" py="sm" {...rest}>
      <TableGrid gridTemplate={gridTemplate}>
        {useSelection && (
          <Checkbox color="primary" onClick={onSelect} value={isSelected} />
        )}
        {titleList.map((title, index) => (
          <Typography key={`list-title-item-${index}`} variant="body3">
            {title}
          </Typography>
        ))}
      </TableGrid>
    </Box>
  )
}

export default ListTitle
