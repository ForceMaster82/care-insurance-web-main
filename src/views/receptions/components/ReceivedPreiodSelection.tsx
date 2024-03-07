import {Box, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren, ReactElement} from 'react'
import {colors, sizes} from '@caredoc/ui-master'
import sub from 'date-fns/sub'
import {IOption} from '../../../types'
import {formatDate} from '../../../utils/date'

export type Period = {
  endDate: string
  startDate: string
}

export type OptionValue = 'today' | '1w' | '1m' | '6m' | '1y'

const OPTIONS: IOption<OptionValue>[] = [
  {text: '당일', value: 'today'},
  {text: '1주', value: '1w'},
  {text: '1개월', value: '1m'},
  {text: '6개월', value: '6m'},
  {text: '1년', value: '1y'},
]

interface IProps {
  onChange?: (option: OptionValue, period: Period) => void
  value?: OptionValue | null
}

const ReceivedPreiodSelection = (props: IProps): ReactElement => {
  const {value, onChange} = props

  const handleOnChange = (option: OptionValue) => () => {
    const today = new Date()

    switch (option) {
      case 'today':
        onChange?.(option, {
          endDate: formatDate(today),
          startDate: formatDate(today),
        })
        break
      case '1w':
        onChange?.(option, {
          endDate: formatDate(today),
          startDate: formatDate(sub(today, {weeks: 1})),
        })
        break
      case '1m':
        onChange?.(option, {
          endDate: formatDate(today),
          startDate: formatDate(sub(today, {months: 1})),
        })
        break
      case '6m':
        onChange?.(option, {
          endDate: formatDate(today),
          startDate: formatDate(sub(today, {months: 6})),
        })
        break
      case '1y':
        onChange?.(option, {
          endDate: formatDate(today),
          startDate: formatDate(sub(today, {years: 1})),
        })
        break
    }
  }

  return (
    <Box alignItems="center" flexDirection="row" gap="xxs">
      {OPTIONS.map((option) => (
        <Option
          isSelected={option.value === value}
          key={`received-period-selection-option-${option.value}`}
          onClick={handleOnChange(option.value)}
        >
          {option.text}
        </Option>
      ))}
    </Box>
  )
}

export default ReceivedPreiodSelection

interface IOptionProps {
  isSelected?: boolean
  onClick?: () => void
}

const Option = (props: PropsWithChildren<IOptionProps>): ReactElement => {
  const {isSelected, children, onClick} = props

  return (
    <Box
      backgroundColor={(isSelected && 'primary') || 'bgPrimary'}
      borderRadius="size7"
      height={sizes.xs}
      justifyContent="center"
      onClick={onClick}
      px="xs"
      style={{
        boxShadow: isSelected ? undefined : `0 0 0 1px ${colors.n300} inset`,
      }}
    >
      <Typography
        textColor={(isSelected && 'fontWhite') || 'fontPrimary'}
        variant="body3"
      >
        {children}
      </Typography>
    </Box>
  )
}
