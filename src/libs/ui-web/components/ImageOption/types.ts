import {DefaultSizes} from '@caredoc/ui-master'
import {ReactNode} from 'react'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {IBox} from '../Box/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>

export interface IImageOptionText extends ITypography {
  imageOptionSize?: ResponsiveValue<Size>
  selected?: boolean
}

export interface IImageOption extends IBox, IDefaultProps {
  onSelect?: (selected: boolean) => void
  renderImage: (color: string) => ReactNode
  selected?: boolean
  size?: ResponsiveValue<Size>
}

export interface IImageOptionRoot
  extends Omit<IImageOption, 'renderImage' | 'onSelect'> {}
