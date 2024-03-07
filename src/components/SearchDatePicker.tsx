import {IBox, Input} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {MAX_DATE_VALUE} from '../constraints/input'
import SearchFilterTitleWrapper from './SearchFilterTitleWrapper'

interface ISearchDatePickerProps extends IBox {
  dateString?: string
  onChange: (dateString: string) => void
  required?: boolean
  title: string
}

const SearchDatePicker = (props: ISearchDatePickerProps): ReactElement => {
  const {title, dateString = '', onChange, required = false, ...rest} = props

  const handleOnChange = (value: string): void => {
    if (!value && required) {
      return
    }
    onChange(value)
  }

  return (
    <SearchFilterTitleWrapper title={title} {...rest}>
      <Input
        max={MAX_DATE_VALUE}
        onTextChange={handleOnChange}
        type="date"
        value={dateString}
      />
    </SearchFilterTitleWrapper>
  )
}

export default SearchDatePicker
