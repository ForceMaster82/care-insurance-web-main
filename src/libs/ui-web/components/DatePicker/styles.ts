/* eslint-disable no-magic-numbers */
import {Colors, colors, CustomColorKey, sizes} from '@caredoc/ui-master'
import styled from 'styled-components'
import Box from '../Box'
import Typography from '../Typography'

export const Root = styled(Box)``

export const IndicatorIconWrapper = styled(Box)`
  width: ${sizes.size5}px;
  height: ${sizes.size5}px;
  border-radius: ${sizes.size5 / 2}px;
  border: 1px solid ${colors.borderTertiary};
  align-items: center;
  justify-content: center;
`

export const SelectedDateSide = styled(Box)<{
  color?: CustomColorKey | keyof Colors
}>`
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({color}): string =>
    color ? colors[color] : 'transparent'};
`

export const SelectedDateBackground = styled(Box)<{
  color?: CustomColorKey | keyof Colors
  disabled?: boolean
  isFirst?: boolean
  isLast?: boolean
}>`
  position: absolute;
  left: -1px;
  right: -1px;
  height: 32px;
  background-color: ${({color}): string =>
    color ? colors[color] : 'transparent'};
  margin-left: ${({isFirst}): number => (isFirst ? 50 : 0)}%;
  margin-right: ${({isLast}): number => (isLast ? 50 : 0)}%;
`

export const DateCell = styled(Box)<{
  disabled?: boolean
  selected?: boolean
}>`
  position: relative;
  width: 100%;
  height: ${sizes.sm}px;
  background-color: blue;
  background-color: ${({selected}): string =>
    selected ? colors.bgPrimary : 'transparent'};
`

export const DateTextWrapper = styled(Box)`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const TodayText = styled(Typography)`
  position: absolute;
  bottom: -4px;
  font-size: 8px;
`
