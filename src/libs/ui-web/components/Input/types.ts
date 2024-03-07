import {DefaultSizes, IconType} from '@caredoc/ui-master'
import {UseFormRegisterReturn} from 'react-hook-form'
import {ResponsiveValue} from 'styled-system'
import IDefaultProps from '../../types'
import {IIcon} from '../Icon/types'
import {ITypography} from '../Typography/types'

type Size = keyof Pick<DefaultSizes, 'sm' | 'md' | 'lg'>
export type Status = 'error' | 'hint' | 'validated' | 'disabled' | 'none'
export type IAutoHeight = {height: 'auto' | number}

export interface IHTMLInput {
  focused?: boolean
  status?: Status
}

export interface IInput
  extends IDefaultProps,
    IHTMLInput,
    Pick<Partial<HTMLInputElement>, 'type' | 'pattern'> {
  affix?: IconType
  autoFocus?: boolean
  /**
   * @deprecated autofucus is deprecated . Use autofocus instead.
   */
  autofocus?: boolean
  /**
   * @deprecated autofucus is deprecated . Use autofocus instead.
   */
  autofucus?: boolean
  dirty?: boolean
  disabled?: boolean
  ellipsis?: boolean
  errors?: string | undefined | string[] | undefined[]
  forcedInput?: boolean
  hideMaxLengthText?: boolean
  hint?: string
  isValidated?: boolean
  max?: string | number
  maxLength?: number
  min?: string | number
  onBlur?: () => void
  onClickAffixIcon?: () => void
  onClickPrefixIcon?: () => void
  onFocus?: () => void
  onKeyPress?: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >
  onTextChange?: (text: string) => void
  placeholder?: string
  prefix?: IconType
  readonly?: boolean
  register?: UseFormRegisterReturn
  size?: ResponsiveValue<Size>
  value?: string
}
export interface IInputIcon extends IIcon, IHTMLInput {}

export interface IHTMLTextarea extends ITypography, IHTMLInput {}

export interface IInputMaxLength extends ITypography, IHTMLInput {
  inputSize: ResponsiveValue<Size>
}
export interface IInputCaption extends ITypography, IHTMLInput {
  inputSize: ResponsiveValue<Size>
}

export interface IInputWrapper
  extends Omit<
    IInput,
    | 'affix'
    | 'prefix'
    | 'hint'
    | 'placeholder'
    | 'onBlur'
    | 'onClickAffixIcon'
    | 'onClickPrefixIcon'
    | 'onFocus'
    | 'onTextChange'
  > {
  inputSize: ResponsiveValue<Size>
  status?: Status
}

export interface IInputRoot extends IInput {}
