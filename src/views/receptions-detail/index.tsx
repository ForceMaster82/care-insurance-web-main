import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import CaregivingRoundInfoBox from '../../components/CaregivingRoundInfoBox'
import SubPageTabBar from '../../components/SubPageTabBar'
import {RECEPTIONS_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import {INFO_CARD_WIDTH} from '../../constants'
import ReceptionInfo from './components/ReceptionInfo'
import CaregivingInfo from './components/CaregivingInfo'

interface IProps {
  receptionId?: string | null
}

const ReceptionsDetailView = ({receptionId}: IProps): ReactElement => {
  return (
    <Box pb="xl" pt="lg" px="sm">
      <Box alignSelf="center" gap="lg" width={INFO_CARD_WIDTH}>
        <CaregivingRoundInfoBox receptionId={receptionId} />
        <SubPageTabBar
          currentPage="DETAIL"
          replacePage
          tabs={RECEPTIONS_SUB_PAGE_TABS}
        />
        {receptionId && (
          <Box gap="xl">
            <ReceptionInfo receptionId={receptionId} />
            <CaregivingInfo receptionId={receptionId} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ReceptionsDetailView
