import {Box, Input, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {MAX_DATE_VALUE} from '../constraints/input'
import SearchFilterTitleWrapper from './SearchFilterTitleWrapper'

interface ISearchPeriodPickerProps {
  endDateString?: string
  onChangeEndDate?: (dateString: string) => void
  onChangeStartDate?: (dateString: string) => void
  required?: boolean
  startDateString?: string
  title: string
}

const SearchPeriodPicker = (props: ISearchPeriodPickerProps): ReactElement => {
  const {
    startDateString = '',
    endDateString = '',
    title,
    onChangeEndDate,
    onChangeStartDate,
    required = false,
  } = props

  const handleOnChangeStartDate = (value: string): void => {
    if (!value && required) {
      return
    }
    onChangeStartDate?.(value)
  }

  const handleOnChangeEndDate = (value: string): void => {
    if (!value && required) {
      return
    }
    onChangeEndDate?.(value)
  }

  return (
    <SearchFilterTitleWrapper title={title}>
      <Box alignItems="center" flexDirection="row" gap="xs">
        <Input
          max={MAX_DATE_VALUE}
          onTextChange={handleOnChangeStartDate}
          type="date"
          value={startDateString}
        />
        <Typography textColor="fontTertiary" variant="body4">
          ~
        </Typography>
        <Input
          max={MAX_DATE_VALUE}
          onTextChange={handleOnChangeEndDate}
          type="date"
          value={endDateString}
        />
      </Box>
    </SearchFilterTitleWrapper>
  )
}

export default SearchPeriodPicker
