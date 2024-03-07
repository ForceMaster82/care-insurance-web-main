import React, {FC} from 'react'
import Box from '../Box'
import Typography from '../Typography'
import {ListItemText, Root} from './styles'
import {IListItem} from './types'

const ListItem: FC<React.PropsWithChildren<IListItem>> = (props) => {
  const {
    children,
    disabled = false,
    onClick,
    prefix,
    affix,
    size = 'sm',
    ...rest
  } = props

  const renderPrefix = () => {
    if (!prefix) {
      return null
    }
    if (typeof prefix === 'string' || typeof prefix === 'number') {
      return <Typography>{prefix}</Typography>
    }

    return <Box>{prefix}</Box>
  }

  const renderAffix = () => {
    if (!affix) {
      return null
    }
    if (typeof affix === 'string' || typeof affix === 'number') {
      return <Typography>{affix}</Typography>
    }

    return <Box>{affix}</Box>
  }

  const handleOnClick = () => {
    if (disabled || !onClick) {
      return
    }

    onClick()
  }

  return (
    <Root backgroundColor="bgPrimary" onClick={handleOnClick} size={size}>
      <Box
        alignItems="center"
        disabled={disabled}
        flex={1}
        flexDirection="row"
        gap="xs"
        justifyContent="space-between"
        {...rest}
      >
        {renderPrefix()}
        <Box flex={1}>
          <ListItemText listItemSize={size}>{children}</ListItemText>
        </Box>
        {renderAffix()}
      </Box>
    </Root>
  )
}

export default ListItem
