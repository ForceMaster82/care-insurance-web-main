import React, {FC, useMemo} from 'react'
import {icons} from '@caredoc/ui-master'
import {Root} from './styles'
import {IIcon} from './types'

const Icon: FC<React.PropsWithChildren<IIcon>> = (props) => {
  const {name = 'check', fill = 'fontPrimary', size = 'xs', ...rest} = props
  const Icon = useMemo(() => icons.get(name) || null, [name])

  if (!Icon) {
    return null
  }

  return (
    <Root
      alignItems="center"
      fill={fill}
      justifyContent="center"
      size={size}
      {...rest}
    >
      <Icon preserveAspectRatio="xMinYMin meet" />
    </Root>
  )
}

export default Icon
