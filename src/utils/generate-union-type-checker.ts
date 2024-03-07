export function generateUnionTypeChecker<UnionType extends string>(
  ...values: UnionType[]
) {
  return function (value: unknown): UnionType | false {
    if (typeof value !== 'string') {
      return false
    }
    return values.includes(value as UnionType) ? (value as UnionType) : false
  }
}
