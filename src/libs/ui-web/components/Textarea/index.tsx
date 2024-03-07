import React, {FC} from 'react'
import {Root} from './styles'
import {ITextarea} from './types'

const Textarea: FC<React.PropsWithChildren<ITextarea>> = (props) => {
  const {...rest} = props

  return <Root affix={undefined} prefix={undefined} {...rest} />
}

export default Textarea
