import {Box, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
interface IProps {
  searchResultTotalCount?: number
}

const DEFAULT_COUNT = 0

const SearchResultCount = (props: IProps): ReactElement => {
  const {searchResultTotalCount = DEFAULT_COUNT} = props

  return (
    <Box flexDirection="row" gap="xxs">
      <Typography variant="body4">검색 결과</Typography>
      <Typography variant="body3">{searchResultTotalCount + '건'}</Typography>
    </Box>
  )
}
export default SearchResultCount
