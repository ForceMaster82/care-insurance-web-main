import {Box, Divider, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'

interface IProps {
  bottomDividerVisible?: boolean
}

const EmptySearchResult = ({
  bottomDividerVisible = false,
}: IProps): ReactElement => {
  return (
    <>
      <Box alignItems="center" backgroundColor="bgPrimary" py="xxl">
        <Typography variant="body4">검색 결과가 없습니다.</Typography>
      </Box>
      {bottomDividerVisible && <Divider color="borderSecondary" />}
    </>
  )
}

export default EmptySearchResult
