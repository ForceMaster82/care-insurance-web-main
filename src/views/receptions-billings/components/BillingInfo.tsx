import {Box, InfoBox} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import useReceptionBillingList from '../../../hooks/api/billing/use-reception-billing-list'
import Card from '../../../components/Card'
import BillingRoundInfo from './BillingRoundInfo'

interface IBillingInfoProps {
  receptionId: string
}

const BillingInfo = (props: IBillingInfoProps): ReactElement => {
  const {receptionId} = props

  const billings = useReceptionBillingList({receptionId})

  return (
    <Box gap="xs">
      <Card>
        <Card.Header borderRadius="md" title="청구 정보" />
      </Card>
      {billings.length === 0 && (
        <InfoBox size="md" state="warning">
          청구 완료된 청구 회차가 존재하지 않습니다.
        </InfoBox>
      )}
      {billings.map((billing) => (
        <BillingRoundInfo
          data={billing}
          key={`reception-billing-item-${billing.id}`}
          receptionId={receptionId}
        />
      ))}
    </Box>
  )
}

export default BillingInfo
