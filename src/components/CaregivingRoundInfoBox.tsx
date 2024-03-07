import {Box, InfoBox} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {StateVariants} from '@caredoc/ui-master'
import useReceptionDetail from '../hooks/api/reception/use-reception-detail'
import useReceptionCaregivingRoundList from '../hooks/api/caregiving-round/use-reception-caregiving-round-list'

interface ICaregivingRoundInfoProps {
  receptionId?: string | null
}

const CaregivingRoundInfoBox = (
  props: ICaregivingRoundInfoProps,
): ReactElement | null => {
  const {receptionId} = props

  const {data: reception} = useReceptionDetail({receptionId, suspense: true})
  const caregivingRounds = useReceptionCaregivingRoundList({receptionId})

  if (!reception || !caregivingRounds) {
    return null
  }

  const isCaregivingStarted =
    reception.progressingStatus === 'CAREGIVING_IN_PROGRESS' ||
    reception.progressingStatus === 'COMPLETED'

  const infoBoxState: StateVariants =
    (isCaregivingStarted && 'success') || 'warning'

  return (
    <Box borderRadius="sm" elevation="elevation-1" variant="shadow">
      <InfoBox size="md" state={infoBoxState}>
        사고번호 {reception.accidentInfo.accidentNumber}의{' '}
        {(isCaregivingStarted &&
          `총 간병차수는 ${caregivingRounds.length} 입니다.`) ||
          `간병이 시작되지 않았습니다.`}
      </InfoBox>
    </Box>
  )
}

export default CaregivingRoundInfoBox
