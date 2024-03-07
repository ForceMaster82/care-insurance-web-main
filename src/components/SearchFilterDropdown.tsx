import React, {ReactElement} from 'react'
import {Box, ComboBox, IComboBox} from '@caredoc/ui-web'
import {SEARCH_COMBOBOX_WIDTH} from '../constants'
import SearchFilterTitleWrapper from './SearchFilterTitleWrapper'

interface IProps<T> extends IComboBox<T> {
  title?: string
}

const SearchFilterDropdown = <T,>(props: IProps<T>): ReactElement => {
  const {title, items, onSelect, value} = props

  return (
    <SearchFilterTitleWrapper title={title}>
      <Box width={SEARCH_COMBOBOX_WIDTH}>
        <ComboBox<T> items={items} onSelect={onSelect} value={value} />
      </Box>
    </SearchFilterTitleWrapper>
  )
}

export default SearchFilterDropdown
