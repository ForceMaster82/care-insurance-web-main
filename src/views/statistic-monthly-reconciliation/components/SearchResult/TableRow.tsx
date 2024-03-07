/* eslint-disable no-magic-numbers */
/* eslint-disable unicorn/filename-case */
import React, {PropsWithChildren, ReactElement} from 'react'
import {Typography} from '@caredoc/ui-web'
import OutlinedTableCell from '../../../../components/table/OutlinedTableCell'
import ReconciliationResource from '../../../../models/dto/reconciliation/Resource'
import {formatStaticNumberWithComma} from '../../../../utils/formatter'
import useExternalCaregivingOrganization from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import {EMPTY_VALUE_TEXT} from '../../../../constants'
import {GRID_TEMPLATE} from '.'
import TableGrid from '~components/table/TableGrid'
import RevenueText from '~components/RevenueText'
import getItemOrder from '~utils/get-item-order'
import useCaregivingRoundInfo from '~hooks/api/caregiving-round/use-caregiving-round-info'
import {ListItemOrderProps} from '~types'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
type IProps = {
  reconciliationData: ReconciliationResource
} & ListItemOrderProps

const TableRow = (props: PropsWithChildren<IProps>): ReactElement => {
  const {reconciliationData, totalItemCount, currentPageNumber, listItemIndex} =
    props

  const caregivingRoundDetailData = useCaregivingRoundInfo({
    caregivingRoundId: reconciliationData.caregivingRoundId,
  })
  const externalOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      caregivingRoundDetailData?.receptionInfo.caregivingManagerInfo
        ?.organizationId,
  })

  return (
    <TableGrid
      backgroundColor="borderSecondary"
      gap={1}
      gridTemplate={GRID_TEMPLATE}
    >
      <OutlinedTableCell>
        <Typography variant="body4">
          {getItemOrder(
            totalItemCount,
            currentPageNumber,
            DEFAULT_PAGE_SIZE,
            listItemIndex,
          )}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body4">
          {caregivingRoundDetailData?.receptionInfo.accidentNumber}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body4">
          {caregivingRoundDetailData?.receptionInfo.patientName}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body4">
          {caregivingRoundDetailData?.caregivingRoundNumber}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell alignItems="end">
        <Typography variant="body4">
          {formatStaticNumberWithComma(reconciliationData.billingAmount, {
            signDisplay:
              reconciliationData.issuedType === 'ADDITIONAL'
                ? 'exceptZero'
                : 'auto',
          })}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell
        backgroundColor="borderSecondary"
        flexDirection="row"
        isWrapper
      >
        <OutlinedTableCell>
          <Typography variant="body4">
            {caregivingRoundDetailData?.caregiverInfo.name}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography variant="body4">
            {formatStaticNumberWithComma(reconciliationData.settlementAmount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography variant="body4">
            {formatStaticNumberWithComma(
              reconciliationData.settlementWithdrawalAmount,
            )}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography variant="body4">
            {formatStaticNumberWithComma(
              reconciliationData.settlementDepositAmount,
            )}
          </Typography>
        </OutlinedTableCell>
      </OutlinedTableCell>
      <OutlinedTableCell
        backgroundColor="borderSecondary"
        flexDirection="row"
        isWrapper
      >
        <OutlinedTableCell alignItems="end">
          <RevenueText>{reconciliationData.profit}</RevenueText>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <RevenueText>{reconciliationData.caredocProfit}</RevenueText>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body4">
            {externalOrganization?.name || EMPTY_VALUE_TEXT}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <RevenueText>{reconciliationData.distributedProfit}</RevenueText>
        </OutlinedTableCell>
      </OutlinedTableCell>
    </TableGrid>
  )
}

export default TableRow
