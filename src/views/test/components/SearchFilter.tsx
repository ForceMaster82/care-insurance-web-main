import React, {ReactElement, useCallback} from 'react'
import {Box, Typography} from '@caredoc/ui-web'
import {colors, sizes} from '@caredoc/ui-master'
import SearchFilterTitleWrapper from '../../../components/SearchFilterTitleWrapper'
import {IOption} from '../../../types'

interface IFilterItemProps {
  onClick: () => void
  selected: boolean
  text: string
}

const FilterItem = ({
  text,
  selected,
  onClick,
}: IFilterItemProps): ReactElement => (
  <Box
    backgroundColor={(selected && 'primary') || 'bgPrimary'}
    borderRadius="size7"
    height={sizes.xs}
    justifyContent="center"
    onClick={onClick}
    px="xs"
    style={{boxShadow: selected ? undefined : `0 0 0 1px ${colors.n300} inset`}}
  >
    <Typography
      textColor={(selected && 'fontWhite') || 'fontPrimary'}
      variant="body3"
    >
      {text}
    </Typography>
  </Box>
)

interface IProps<T> {
  maxCount?: number
  minCount?: number
  onChange: (values: T[]) => void
  options: IOption<T>[]
  title: string
  values: T[]
}

const SearchFilter = <T,>(props: IProps<T>): ReactElement => {
  const {options, title, minCount, maxCount, onChange, values} = props

  const handleOnSelect = useCallback(
    (value: T) => () => {
      const isAlreadySelected = values.includes(value)

      if (
        isAlreadySelected &&
        (minCount === undefined || values.length > minCount)
      ) {
        const newSelectedValues = values.filter((item) => item !== value)

        onChange(newSelectedValues)
      }

      if (
        !isAlreadySelected &&
        (maxCount === undefined || values.length < maxCount)
      ) {
        const newSelectedValues = [...values, value]

        onChange(newSelectedValues)
      }
    },
    [maxCount, minCount, onChange, values],
  )

  return (
    <SearchFilterTitleWrapper title={title}>
      <Box alignItems="center" flexDirection="row" gap="xs">
        {options.map((option) => (
          <FilterItem
            key={`filter-item-${option.value}`}
            onClick={handleOnSelect(option.value)}
            selected={values.includes(option.value)}
            text={option.text}
          />
        ))}
      </Box>
    </SearchFilterTitleWrapper>
  )
}

export default SearchFilter
