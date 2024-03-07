import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form'
import React, {ChangeEvent, ReactElement} from 'react'
import {IInput, Input} from '@caredoc/ui-web'
import {Constraints} from '@caredoc/utils-web'
import {MAX_LENGTH} from '~constraints/input'

interface renderParameters<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TFieldName>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<TFieldValues>
}

export interface IBasicInputProps<TFieldValues extends FieldValues>
  extends Omit<
    IInput,
    'forcedInput' | 'hideMaxLengthText' | 'register' | 'value'
  > {
  constraints: Constraints<TFieldValues>
  control: Control<TFieldValues>
  fieldName: Path<TFieldValues>
  isTextArea?: boolean
  onEnterSubmit?: () => void
}
interface IFormattingInputProps<TFieldValues extends FieldValues>
  extends IBasicInputProps<TFieldValues> {
  defaultValue?: string
  formatter: (text: string) => string
}

const FormattingInput = <TFieldValues extends FieldValues>({
  control,
  fieldName,
  formatter,
  maxLength,
  isTextArea = false,
  constraints,
  defaultValue = '',
  ...rest
}: IFormattingInputProps<TFieldValues>): ReactElement => {
  const _maxLength =
    maxLength || (isTextArea ? MAX_LENGTH.TEXTAREA : MAX_LENGTH.DEFAULT)

  const renderControlledComponent = ({
    field,
  }: renderParameters<TFieldValues, Path<TFieldValues>>): ReactElement => {
    const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
      const targetValue = event.target?.value
      if (targetValue.length > _maxLength) {
        return
      }
      field.onChange(targetValue ? formatter(targetValue) : defaultValue)
    }
    const customFieled: ControllerRenderProps<
      TFieldValues,
      Path<TFieldValues>
    > = {
      ...field,
      onChange,
    }

    return (
      <Input
        forcedInput={!isTextArea}
        hideMaxLengthText={!isTextArea}
        maxLength={_maxLength}
        {...customFieled}
        {...rest}
      />
    )
  }

  return (
    <Controller
      control={control}
      name={fieldName}
      render={renderControlledComponent}
      rules={constraints[fieldName]}
    />
  )
}

export default FormattingInput
