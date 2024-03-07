import React, {FC} from 'react'
import {
  ProgressItemBar,
  ProgressItemIcon,
  ProgressItemText,
  Root,
} from './styles'
import {IProgressItem} from './types'

/**
 *
 * @deprecated using a temlate
 */
const ProgressItem: FC<React.PropsWithChildren<IProgressItem>> = (props) => {
  const {
    icon,
    passed = false,
    disabled = false,
    size = 'sm',
    color = 'primary',
    children,
    ...rest
  } = props
  const nowColor = passed ? color : 'n500'

  return (
    <Root
      alignItems="center"
      disabled={disabled}
      gap="xs"
      size={size}
      {...rest}
    >
      <ProgressItemIcon
        fill={nowColor}
        name={icon}
        passed={passed}
        size={size}
      />
      <ProgressItemBar color={nowColor} size="sm" />
      <ProgressItemText passed={passed} size={size} textColor={nowColor}>
        {children}
      </ProgressItemText>
    </Root>
  )
}

export default ProgressItem
