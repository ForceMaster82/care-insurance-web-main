import React, {FC} from 'react'
import {Root} from './styles'
import {IDivider} from './types'

/*
 * border color alias (color)
 * - borderPrimary: n100
 * - borderSecondary: n200
 * - borderTertiary: n300
 */
const Divider: FC<React.PropsWithChildren<IDivider>> = (props) => {
  const {color = 'borderSecondary', size = 'xxs', ...rest} = props
  return <Root {...rest} backgroundColor={color} size={size} />
}

export default Divider
