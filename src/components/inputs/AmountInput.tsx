import {IInput, Input} from '@caredoc/ui-web'
import React, {ReactElement, useMemo} from 'react'

interface IProps
  extends Pick<IInput, 'readonly' | 'disabled' | 'size' | 'style' | 'prefix'> {
  onChange?: (value: string) => void
  value?: string
}

const DEFAULT_VALUE = '0'

const insertComma = (value: string): string => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const AmountInput = (props: IProps): ReactElement => {
  const {value, onChange, ...rest} = props

  const valueText = useMemo(
    () => (value && insertComma(value)) || DEFAULT_VALUE,
    [value],
  )

  const handleOnChangeText = (value: string): void => {
    const isEmptyAmount = value === ''

    if (isEmptyAmount) {
      onChange?.(DEFAULT_VALUE)
      return
    }
    const rawAmount = value.replaceAll(',', '')

    const newValue = rawAmount
      .replace(/^[+-]$/, '0')
      .replace(/^(0)([+-])$/, (_, p1, p2) => `${p2}${p1}`)
      .replace(/^(0)([1-9])$/, (_, p1, p2) => `${p2}`)
      .replace(/^([+-])(0)([1-9])$/, (_, p1, p2, p3) => `${p1}${p3}`)

    const validAmountRegex = /^[+-]?\d+$/
    if (!validAmountRegex.test(newValue)) {
      return
    }

    onChange?.(newValue)
  }

  return <Input onTextChange={handleOnChangeText} value={valueText} {...rest} />
}

export default AmountInput
