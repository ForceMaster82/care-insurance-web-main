/* eslint-disable unicorn/filename-case */
import {Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'

interface IProps {
  children: string
}

const InputLabel = ({children}: PropsWithChildren<IProps>): ReactElement => {
  return (
    <Typography textColor="fontPrimary" variant="body1">
      {children}
    </Typography>
  )
}

export default InputLabel
