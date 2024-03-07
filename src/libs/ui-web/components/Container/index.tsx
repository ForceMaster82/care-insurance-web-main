import React, {FC} from 'react'
import {Root} from './styles'
import {IContainer} from './types'

const Container: FC<React.PropsWithChildren<IContainer>> = (props) => {
  const {children, ...rest} = props
  return (
    <section>
      <Root {...rest}>{children}</Root>
    </section>
  )
}

export default Container
