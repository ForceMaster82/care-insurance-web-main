import {DefaultSizes} from '@caredoc/ui-master'
import {ReactNode} from 'react'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>

export interface IListItem extends IDefaultProps {
  affix?: ReactNode | number | string
  disabled?: boolean
  onClick?: () => void
  prefix?: ReactNode | number | string
  size?: ResponsiveValue<Size>
}

export interface IListItemText {
  listItemSize: ResponsiveValue<Size>
}

export interface IListItemRoot extends Omit<IListItem, 'affix'> {}
