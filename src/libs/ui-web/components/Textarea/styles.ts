import styled, {css} from 'styled-components'
import Input from '../Input'
import {ITextareaRoot} from './types'
import 'react'

const baseStyle = css<ITextareaRoot>``

export const Root = styled(Input)<ITextareaRoot>`
  ${baseStyle}
`
