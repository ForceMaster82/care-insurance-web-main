import {Box, InfoBox} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {useModalStore} from '@caredoc/utils-web'
import Card from '../../../components/Card'
import useReceptionSettlementList from '../../../hooks/api/settlement/use-reception-settlement-list'
import {ReceptionSettlementsModalType} from '../../../types'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'
import CaregivingChargeModification from './CaregivingChargeModification'
import SettlementRoundInfo from './SettlementRoundInfo'
import CaregivingChargeInfoHistoryModal from './modals/CaregivingChargeInfoHistoryModal'

interface ISettlementInfoProps {
  receptionId: string
}

const SettlementInfo = (props: ISettlementInfoProps): ReactElement => {
  const {receptionId} = props

  const settlements = useReceptionSettlementList({receptionId})

  const modalStore = useModalStore<ReceptionSettlementsModalType>()

  const isInternalManager = Boolean(getInternalCaregivingManagerIdFromToken())

  const handleOnClickCaregivingChargeModificationHistory = (): void => {
    modalStore.create(
      'CAREGIVING_CHARGE_INFO_HISTORY',
      <CaregivingChargeInfoHistoryModal
        onClickCloseButton={(): void =>
          modalStore.delete('CAREGIVING_CHARGE_INFO_HISTORY')
        }
        receptionId={receptionId}
      />,
    )
  }

  return (
    <Box gap="xs">
      <Card>
        <Card.Header
          borderRadius="md"
          rightSide={
            isInternalManager ? (
              <CaregivingChargeModification
                onClick={handleOnClickCaregivingChargeModificationHistory}
                receptionId={receptionId}
              />
            ) : null
          }
          title="정산 정보"
        />
      </Card>
      {settlements?.length === 0 && (
        <InfoBox size="md" state="warning">
          간병비가 산정된 정산 회차가 존재하지 않습니다.
        </InfoBox>
      )}
      {settlements?.map((settlement) => (
        <SettlementRoundInfo
          data={settlement}
          key={`reception-settlement-item-${settlement.id}`}
        />
      ))}
    </Box>
  )
}

export default SettlementInfo
