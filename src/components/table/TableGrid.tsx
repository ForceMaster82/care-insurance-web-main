import {CustomColorKey, CustomSizeKey, sizes} from '@caredoc/ui-master'
import {Box, GapKeys, IBox} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

interface IProps extends IBox {
  backgroundColor?: CustomColorKey
  gap?: GapKeys
  gridTemplate: string
  height?: CustomSizeKey
  placeItems?: 'stretch' | 'start' | 'center' | 'end'
}
const TableGrid = (props: PropsWithChildren<IProps>): ReactElement => {
  const {
    children,
    gridTemplate,
    gap = 'sm',
    placeItems = 'center',
    height,
    backgroundColor,
    ...rest
  } = props

  return (
    <Box
      backgroundColor={backgroundColor}
      display="grid"
      gap={gap}
      height={height ? sizes[height] : undefined}
      style={{
        gridTemplateColumns: `${gridTemplate}`,
        placeItems,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
// ${space[gap]}px

export default TableGrid
