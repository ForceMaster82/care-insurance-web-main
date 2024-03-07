import {DefaultSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
import {IDivider} from '../Divider/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>
type Type = 'td' | 'th'

export interface ITableItem extends IBox, IDefaultProps {
  disabled?: boolean
  highlight?: boolean
  size?: ResponsiveValue<Size>
  type?: ResponsiveValue<Type>
}

export interface ITableItemText extends ITypography {
  highlight?: boolean
  size?: ResponsiveValue<Size>
  type?: ResponsiveValue<Type>
}

export interface ITableItemBar extends IDivider {
  highlight?: boolean
  size?: ResponsiveValue<Size>
}

export interface ITableItemRoot extends ITableItem {}
