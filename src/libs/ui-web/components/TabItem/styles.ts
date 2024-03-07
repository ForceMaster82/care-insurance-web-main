import {space} from '@caredoc/ui-master'
import styled, {css} from 'styled-components'
import {variant} from 'styled-system'
import {Typography} from '..'
import {clickable} from '../../theme/mixins'
import typography from '../../theme/variants/typography'
import Box from '../Box'
import Divider from '../Divider'
import {ITabItemRoot, ITabItemText} from './types'
import 'react'

const baseStyle = css<ITabItemRoot>`
  ${clickable}

  position: relative;
`

export const TabItemText = styled(Typography)<ITabItemText>`
  ${variant({
    prop: 'size',
    variants: {
      lg: typography.subtitle1,
      md: typography.body1,
      sm: typography.body3,
    },
  })}
`

export const FocusedBar = styled(Divider)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
`

export const Root = styled(Box)<ITabItemRoot>`
  ${baseStyle}

  ${variant({
    prop: 'size',
    variants: {
      lg: {height: 64, padding: `0 ${space.sm}px`},
      md: {height: 56, padding: `0 ${space.sm}px`},
      sm: {height: 48, padding: `0 ${space.sm}px`},
    },
  })}
`
