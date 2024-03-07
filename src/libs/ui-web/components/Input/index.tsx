import {IconType} from '@caredoc/ui-master'
import React, {ChangeEvent, FC, useCallback, useMemo, useState} from 'react'
import Box from '../Box'
import {
  InputCaption,
  InputContent,
  InputIcon,
  InputMaxLength,
  InputWrapper,
  Root,
  Textarea,
  TextInput,
} from './styles'
import {IInput, Status} from './types'

const Input: FC<React.PropsWithChildren<IInput>> = (props) => {
  const {
    analysis,
    autoFocus = false,
    hint,
    dirty: propDirty = false,
    disabled = false,
    ellipsis = false,
    size = 'sm',
    type,
    value,
    readonly,
    prefix,
    affix,
    errors = [],
    maxLength = 0,
    placeholder = '',
    isValidated,
    forcedInput = false,
    hideMaxLengthText = false,
    onClickPrefixIcon,
    onClickAffixIcon,
    onTextChange = () => null,
    onKeyPress = () => null,
    onFocus,
    onBlur,
    pattern,
    register,
    min,
    max,
    ...rest
  } = props

  const [dirty, setDirty] = useState(propDirty)
  const [focused, setFocused] = useState(autoFocus)

  const status: Status | undefined = useMemo(
    () =>
      (disabled && 'disabled') ||
      (dirty && errors.length > 0 && 'error') ||
      (isValidated && 'validated') ||
      undefined,
    [disabled, dirty, errors.length, isValidated],
  )

  const handleOnFocus = useCallback((): void => {
    if (disabled || readonly) {
      return
    }

    setFocused(true)

    onFocus && onFocus()
  }, [disabled, onFocus, readonly])

  const logEvent = () => {
    if (!analysis) {
      return
    }

    const {
      channels,
      targetAction = 'click',
      targetType = 'button',
      target,
      parameters,
      namespace,
      platform = 'web',
    } = analysis

    const event = new CustomEvent('ANALYSIS_TRIGGER', {
      detail: [
        channels,
        targetAction,
        targetType,
        target,
        parameters,
        namespace,
        platform,
      ],
    })
    window.dispatchEvent(event)
  }

  const handleOnBlur = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
      if (disabled || readonly) {
        return
      }

      logEvent()
      setFocused(false)
      onBlur && onBlur()
      register?.onBlur(event)
    },
    [disabled, logEvent, onBlur, readonly, register],
  )

  const handleOnTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const {
      target: {value: targetValue},
    } = event

    if (maxLength && targetValue.length > maxLength) {
      return
    }

    onTextChange(targetValue)
    setDirty(true)

    register?.onChange(event)
  }

  const handleResizeHeight = (
    event: ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    const {target} = event

    target.style.height = 'auto'
    target.style.height = target.scrollHeight + 'px'
  }

  const inputProps = {
    autoFocus,
    disabled,
    focused,
    inputSize: size,
    onBlur: handleOnBlur,
    onChange: handleOnTextChange,
    onFocus: handleOnFocus,
    onKeyPress,
    placeholder,
    status,
    value,
  }

  const renderIcon = useCallback(
    (name: IconType) => {
      if (!name) {
        return null
      }

      return (
        <InputIcon focused={focused} name={name} size={size} status={status} />
      )
    },
    [focused, size, status],
  )

  const renderCaption = useCallback(() => {
    const errorMessages = dirty
      ? (Array.isArray(errors) && errors.length > 0 && errors) ||
        (!Array.isArray(errors) && [errors]) ||
        []
      : []

    const messages = (errorMessages.length > 0 ? errorMessages : [hint]).filter(
      (s) => Boolean(s),
    )

    if (messages.length > 0) {
      return (
        <Box gap="xxs">
          {messages.map((message, index) => (
            <InputCaption
              inputSize={size}
              key={`input-caption-message-${index}`}
              status={status}
            >
              {message}
            </InputCaption>
          ))}
        </Box>
      )
    }

    return null
  }, [dirty, errors, hint, size, status])

  return (
    <Root disabled={disabled} gap="xxs" {...rest}>
      <InputWrapper
        borderRadius="sm"
        gap="sm"
        inputSize={size}
        maxLength={maxLength}
        py="xs"
        status={status}
        variant={disabled ? 'filled' : 'outlined'}
      >
        <InputContent alignItems="center" flex={1} flexDirection="row" gap="xs">
          {prefix && (
            <Box onClick={onClickPrefixIcon}>{renderIcon(prefix)}</Box>
          )}
          <Box flex={1}>
            {!forcedInput && maxLength > 0 ? (
              <Textarea
                onInput={handleResizeHeight}
                {...register}
                {...inputProps}
              />
            ) : (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              <TextInput
                ellipsis={ellipsis}
                max={max}
                min={min}
                pattern={pattern}
                readOnly={readonly}
                type={type || 'text'}
                {...register}
                {...inputProps}
              />
            )}
          </Box>
          {affix && <Box onClick={onClickAffixIcon}>{renderIcon(affix)}</Box>}
        </InputContent>
        {!hideMaxLengthText && maxLength > 0 && (
          <Box alignItems="flex-end">
            <InputMaxLength
              focused={focused}
              inputSize={size}
              status={status}
              textAlign="end"
            >
              {`${(value || '').length} / ${maxLength}`}
            </InputMaxLength>
          </Box>
        )}
      </InputWrapper>
      {renderCaption()}
    </Root>
  )
}

export default Input
