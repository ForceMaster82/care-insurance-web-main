import {
  borderWidths,
  colors,
  Colors,
  CustomColorKey,
  TypographyVariants,
} from '@caredoc/ui-master'
import {Box, ITableItem, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement, useMemo} from 'react'

interface ITableItemProps extends Pick<ITableItem, 'type' | 'highlight'> {
  ellipsis?: boolean
  flex?: number
}

const TABLE_ITEM_MIN_HEIGHT = 40

const TableItem = ({
  children,
  type = 'td',
  highlight = false,
  flex,
  ellipsis = false,
}: PropsWithChildren<ITableItemProps>): ReactElement => {
  const borderColor = useMemo<CustomColorKey>(
    () => (highlight && 'primary') || 'borderTertiary',
    [highlight],
  )
  const borderBottomStyle = useMemo(
    () =>
      (type === 'td' && `${borderWidths.xxs}px solid ${colors[borderColor]}`) ||
      '',
    [borderColor, type],
  )
  const backgroundColor = useMemo<keyof Colors | undefined>(
    () => (type === 'th' ? (highlight && 'r000') || 'n100' : undefined),
    [highlight, type],
  )
  const textColor = useMemo<CustomColorKey>(
    () => (highlight && 'primary') || 'fontPrimary',
    [highlight],
  )
  const typograhyVariant = useMemo<TypographyVariants>(
    () => (type === 'th' && 'body3') || 'body4',
    [type],
  )

  return (
    <Box
      backgroundColor={backgroundColor}
      flex={flex}
      justifyContent="center"
      minHeight={TABLE_ITEM_MIN_HEIGHT}
      overflow="hidden"
      px="sm"
      py="xxs"
      style={{
        borderBottom: borderBottomStyle,
        whiteSpace: 'nowrap',
      }}
    >
      <Typography
        ellipsis={ellipsis}
        textAlign="center"
        textColor={textColor}
        variant={typograhyVariant}
      >
        {children}
      </Typography>
    </Box>
  )
}

export default TableItem
