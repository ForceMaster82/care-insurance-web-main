import React, {FC} from 'react'
import {FocusedBar, Root, TabItemText} from './styles'
import {ITabItem} from './types'

const TabItem: FC<React.PropsWithChildren<ITabItem>> = (props) => {
  const {
    children,
    analysis,
    focused = false,
    disabled = false,
    size = 'sm',
    color = 'primary',
    onClick,
    ...rest
  } = props
  return (
    <Root
      alignItems="center"
      analysis={analysis}
      backgroundColor="bgPrimary"
      disabled={disabled}
      justifyContent="center"
      onClick={onClick}
      size={size}
      {...rest}
    >
      <TabItemText
        focused={focused}
        size={size}
        textColor={focused ? color : 'fontTertiary'}
      >
        {children}
      </TabItemText>
      {focused && <FocusedBar color={color} />}
    </Root>
  )
}

export default TabItem
