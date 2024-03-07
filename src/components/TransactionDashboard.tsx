import {Box, Divider, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import RevenueText from './RevenueText'

interface ITransactionDashboardProps {
  depositAmount: number
  withdrawalAmount: number
}

const TransactionDashboard = (
  props: ITransactionDashboardProps,
): ReactElement => {
  const {depositAmount, withdrawalAmount} = props

  return (
    <Box backgroundColor="bgPrimary" borderRadius="sm">
      <Box alignItems="center" flexDirection="row" gap="xs" py="sm">
        <Box alignItems="center" flex={1}>
          <Typography variant="body3">입금</Typography>
        </Box>
        <Box alignItems="center" flex={1}>
          <Typography variant="body3">출금</Typography>
        </Box>
      </Box>
      <Divider color="borderSecondary" />
      <Box alignItems="center" flexDirection="row" gap="xs" py="sm">
        <Box alignItems="center" flex={1}>
          <RevenueText variant="subtitle1">{depositAmount}</RevenueText>
        </Box>
        <Box alignItems="center" flex={1}>
          <RevenueText variant="subtitle1">
            {(withdrawalAmount > 0 && withdrawalAmount * -1) ||
              withdrawalAmount}
          </RevenueText>
        </Box>
      </Box>
    </Box>
  )
}

export default TransactionDashboard
