import {Colors, DefaultSizes} from '@caredoc/ui-master'
import {ResponsiveValue} from 'styled-system'
import {IBox} from '../Box/types'
import {ITypography} from '../Typography/types'
import IDefaultProps from '../../types'
import {IDropdownItemData} from './DropdownItem'

type Size = keyof Pick<DefaultSizes, 'xs' | 'sm' | 'md' | 'lg'>
export interface IDropdown<T = string> extends IDefaultProps {
  childrenWidth?: ResponsiveValue<string | number>
  disabled?: boolean
  isMenuUp?: boolean
  items: IDropdownItemData<T>[]
  label?: string
  onSelect: (value: T) => void
  selectionText?: string
  size?: ResponsiveValue<Size>
  title?: string
  value?: T
}

export interface IDropdownItem extends IBox {
  alt?: string
  badge?: string
  disabled?: boolean
  isFirst?: boolean
  isHeader?: boolean
  isSelected?: boolean
  size?: ResponsiveValue<Size>
}

export interface IDropdownLabel extends IBox {
  activeColor?: {
    background: keyof Colors
    border?: keyof Colors
    text: keyof Colors
  }
  alt?: string
  disabled?: boolean
  isActive: boolean
  isSelected?: boolean
  label?: string
  size?: ResponsiveValue<Size>
}

export interface IDropdownActionSheet extends IBox {
  close: () => void
  title?: string
}

export interface IDropdownLabel extends IBox {
  size?: ResponsiveValue<Size>
}

export interface IDropdownItem extends IBox {
  size?: ResponsiveValue<Size>
}

export interface IDropdownItems extends IBox {
  size?: ResponsiveValue<Size>
}

export interface IDropdownItemText extends ITypography {
  size?: ResponsiveValue<Size>
}

export interface IDropdownLabelText extends ITypography {
  size?: ResponsiveValue<Size>
}

export interface IDropdownRoot extends IDropdown {
  size?: ResponsiveValue<Size>
}
