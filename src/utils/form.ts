import type {FieldError, FieldErrors} from 'react-hook-form'
import _ from 'lodash'

export const getFirstFormError = (
  errors: FieldErrors,
): FieldError | undefined => {
  for (const [, value] of Object.entries(errors)) {
    const hasMessage = _.has(value, 'message')
    const hasType = _.has(value, 'type')

    if (hasMessage && hasType) {
      return value as FieldError
    }
    return getFirstFormError(value as FieldErrors)
  }
}
