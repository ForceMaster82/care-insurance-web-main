import {
  Control,
  FieldErrors,
  FieldPath,
  FieldValues,
  useFormState,
  useWatch,
} from 'react-hook-form'

interface IUseCheckValidField<TFieldValues extends FieldValues> {
  errors: FieldErrors<TFieldValues>
  isValidField: (fieldName: FieldPath<TFieldValues>) => boolean
}

export const useCheckValidField = <TFieldValues extends FieldValues>(
  control: Control<TFieldValues>,
): IUseCheckValidField<TFieldValues> => {
  const {errors} = useFormState({control})
  const fieldValues = useWatch({control})

  const checkIsValidField = (fieldName: FieldPath<TFieldValues>): boolean => {
    return Boolean(fieldValues[fieldName]) && !errors[fieldName]
  }

  return {errors, isValidField: checkIsValidField}
}
