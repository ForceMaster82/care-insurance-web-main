import {space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {Icon, Typography} from '..'
import {clickable} from '../../theme/mixins'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import Divider from '../Divider'
import {IProgressItemIcon, IProgressItemRoot, IProgressItemText} from './types'
import 'react'

const baseStyle = css<IProgressItemRoot>`
  ${clickable}

  position: relative;
`

export const ProgressItemIcon = styled(Icon)<IProgressItemIcon>``

export const ProgressItemText = styled(Typography)<IProgressItemText>`
  padding: 0 ${space.sm}px;

  ${variant({
    prop: 'size',
    variants: {
      lg: {...typography.body1},
      md: {...typography.body3},
      sm: {...typography.caption1},
    },
  })}
`

export const ProgressItemBar = styled(Divider)``

export const Root = styled(Box)<IProgressItemRoot>`
  ${baseStyle}
`
