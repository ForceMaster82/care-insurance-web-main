import {ButtonVariants} from '@caredoc/ui-master'
import {Box, Button, ComboBox, IComboBoxItemData, Input} from '@caredoc/ui-web'
import React, {KeyboardEvent, ReactElement, useCallback, useState} from 'react'
import {SEARCH_COMBOBOX_WIDTH} from '../constants'
import {SearchCategory} from '../types'

const INPUT_WIDTH = 240
const BUTTON_WIDTH = 80

interface ISearchBoxProps {
  categoryOptions: IComboBoxItemData<SearchCategory>[]
  defaultCategory: SearchCategory
  defaultKeyword?: string
  onClickSearch: (category: SearchCategory, keyword: string) => void
  searchButtonVariant?: ButtonVariants
}

const SearchBox = (props: ISearchBoxProps): ReactElement => {
  const {
    searchButtonVariant = 'secondary',
    categoryOptions,
    defaultCategory,
    defaultKeyword = '',
    onClickSearch,
  } = props

  const [category, setCategory] = useState(defaultCategory)
  const [keyword, setKeyword] = useState(defaultKeyword)

  const handleOnClickSearch = useCallback(() => {
    onClickSearch(category, keyword)
  }, [category, keyword, onClickSearch])

  const handleOnClickClearKeyword = (): void => {
    setKeyword('')
  }

  const handleOnPressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onClickSearch(category, keyword)
    }
  }

  return (
    <Box alignItems="center" flexDirection="row" gap="xs">
      <Box width={SEARCH_COMBOBOX_WIDTH}>
        <ComboBox
          items={categoryOptions}
          onSelect={setCategory}
          size="sm"
          value={category}
        />
      </Box>
      <Box width={INPUT_WIDTH} id="searchBoxBoxId">
        <Input
          affix={keyword ? 'close-circle' : undefined}
          onClickAffixIcon={handleOnClickClearKeyword}
          onKeyPress={handleOnPressEnter}
          onTextChange={setKeyword}
          size="sm"
          value={keyword}
        />
      </Box>
      <Box width={BUTTON_WIDTH}>
        <Button
          color="primary"
          onClick={handleOnClickSearch}
          size="sm"
          variant={searchButtonVariant}
        >
          검색
        </Button>
      </Box>
    </Box>
  )
}

export default SearchBox
