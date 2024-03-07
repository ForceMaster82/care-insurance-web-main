import {Colors, DefaultSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import {IBox} from '../Box/types'
import {ITypography} from '../Typography/types'
import IDefaultProps from '../../types'
import {IComboBoxItemData} from './ComboBoxItem'

type Size = keyof Pick<DefaultSizes, 'xs' | 'sm' | 'md' | 'lg'>
export interface IComboBox<T = string> extends IDefaultProps {
  childrenWidth?: ResponsiveValue<string | number>
  disabled?: boolean
  error?: string | string[] | null
  initialState?: boolean
  isMenuUp?: boolean
  items: IComboBoxItemData<T>[]
  label?: string
  onSelect: (value: T) => void
  selectionText?: string
  size?: ResponsiveValue<Size>
  title?: string
  value?: T
}

export interface IComboBoxItem extends IBox {
  alt?: string
  badge?: string
  disabled?: boolean
  isFirst?: boolean
  isHeader?: boolean
  isSelected?: boolean
  size?: ResponsiveValue<Size>
}

export interface IComboBoxLabel extends IBox {
  activeColor?: {
    background: keyof Colors
    border?: keyof Colors
    text: keyof Colors
  }
  alt?: string
  disabled?: boolean
  error?: string[] | null
  isActive: boolean
  isSelected?: boolean
  label?: string
  size?: ResponsiveValue<Size>
}

export interface IComboBoxActionSheet extends IBox {
  close: () => void
  title?: string
}

export interface IComboBoxLabel extends IBox {
  size?: ResponsiveValue<Size>
}

export interface IComboBoxItem extends IBox {
  size?: ResponsiveValue<Size>
}

export interface IComboBoxItems extends IBox {
  size?: ResponsiveValue<Size>
}

export interface IComboBoxItemText extends ITypography {
  size?: ResponsiveValue<Size>
}

export interface IComboBoxLabelText extends ITypography {
  size?: ResponsiveValue<Size>
}

export interface IComboBoxRoot extends IComboBox {
  size?: ResponsiveValue<Size>
}

export {type IComboBoxItemData} from './ComboBoxItem'
