import {Box, Icon, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {formatDateTime} from '../utils/date'

interface IRecentModificationInfoProps {
  lastModifiedDateTime: Date
  lastModifierName: string
  modificationCount: number
  onClick?: () => void
}

const RecentModificationInfo = (
  props: IRecentModificationInfoProps,
): ReactElement => {
  const {onClick, lastModifiedDateTime, lastModifierName, modificationCount} =
    props

  return (
    <Box alignItems="center" flexDirection="row" gap="sm" onClick={onClick}>
      <Box>
        <Typography textColor="fontSecondary" variant="caption4">
          최근 수정일자: {formatDateTime(lastModifiedDateTime)}
        </Typography>
        <Typography textColor="fontSecondary" variant="caption4">
          수정자: {lastModifierName}
        </Typography>
      </Box>
      <Box alignItems="center" flexDirection="row" gap="xxs">
        <Icon fill="fontSecondary" name="short-time--outlined" />
        <Typography textColor="fontSecondary" variant="caption3">
          {modificationCount}회 수정
        </Typography>
      </Box>
    </Box>
  )
}

export default RecentModificationInfo
