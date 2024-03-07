import {Box} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import CaregivingRoundInfoBox from '../../components/CaregivingRoundInfoBox'
import {INFO_CARD_WIDTH} from '../../constants'
import SubPageTabBar from '../../components/SubPageTabBar'
import {RECEPTIONS_SUB_PAGE_TABS} from '../../constants/sub-page-tabs'
import SettlementInfo from './components/SettlementInfo'

interface IProps {
  receptionId?: string | null
}

const ReceptionsSettlementsView = (props: IProps): ReactElement => {
  const {receptionId} = props

  return (
    <Box pb="xl" pt="lg" px="sm">
      <Box alignSelf="center" gap="lg" width={INFO_CARD_WIDTH}>
        <CaregivingRoundInfoBox receptionId={receptionId} />
        <SubPageTabBar
          currentPage="SETTLEMENTS"
          replacePage
          tabs={RECEPTIONS_SUB_PAGE_TABS}
        />
        {receptionId && <SettlementInfo receptionId={receptionId} />}
      </Box>
    </Box>
  )
}

export default ReceptionsSettlementsView
