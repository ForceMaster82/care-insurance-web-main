import type {FieldPath, FieldValues, RegisterOptions} from 'react-hook-form'

export type Constraints<TFieldValues extends FieldValues> = Partial<{
  [key in FieldPath<TFieldValues>]: RegisterOptions<TFieldValues, key>
}>
