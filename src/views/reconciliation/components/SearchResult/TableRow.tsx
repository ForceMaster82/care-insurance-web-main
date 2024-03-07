import React, {ReactElement} from 'react'
import {Checkbox, Typography} from '@caredoc/ui-web'
import OutlinedTableCell from '../../../../components/table/OutlinedTableCell'
import ReconciliationResource from '../../../../models/dto/reconciliation/Resource'
import {formatStaticNumberWithComma} from '../../../../utils/formatter'
import useReceptionDetail from '../../../../hooks/api/reception/use-reception-detail'
import useExternalCaregivingOrganization from '../../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import useCaregivingRoundInfo from '../../../../hooks/api/caregiving-round/use-caregiving-round-info'
import {EMPTY_VALUE_TEXT} from '../../../../constants'
import {GRID_TEMPLATE} from '.'
import TableGrid from '~components/table/TableGrid'
import RevenueText from '~components/RevenueText'

interface ITableRowProps {
  data: ReconciliationResource
  isSelected: boolean
  onSelect: () => void
}

const TableRow = (props: ITableRowProps): ReactElement => {
  const {data, isSelected, onSelect} = props

  const {data: receptionData} = useReceptionDetail({
    receptionId: data.receptionId,
  })
  const externalCaregivingOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      receptionData?.caregivingManagerInfo?.organizationId,
  })
  const caregivingRoundData = useCaregivingRoundInfo({
    caregivingRoundId: data.caregivingRoundId,
  })

  return (
    <TableGrid
      backgroundColor="borderSecondary"
      gap={1}
      gridTemplate={GRID_TEMPLATE}
    >
      <OutlinedTableCell>
        <Checkbox
          color="primary"
          onClick={onSelect}
          size="md"
          value={isSelected}
        />
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body4">
          {receptionData?.accidentInfo.accidentNumber}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body4">
          {receptionData?.patientInfo.name}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography variant="body4">
          {caregivingRoundData?.caregivingRoundNumber}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell alignItems="end">
        <Typography variant="body4">
          {formatStaticNumberWithComma(data.billingAmount, {
            signDisplay:
              data.issuedType === 'ADDITIONAL' ? 'exceptZero' : 'auto',
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
            {caregivingRoundData?.caregiverInfo.name}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography variant="body4">
            {formatStaticNumberWithComma(data.settlementAmount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography variant="body4">
            {formatStaticNumberWithComma(data.settlementWithdrawalAmount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography variant="body4">
            {formatStaticNumberWithComma(data.settlementDepositAmount)}
          </Typography>
        </OutlinedTableCell>
      </OutlinedTableCell>
      <OutlinedTableCell
        backgroundColor="borderSecondary"
        flexDirection="row"
        isWrapper
      >
        <OutlinedTableCell alignItems="end">
          <RevenueText>{data.profit}</RevenueText>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <RevenueText>{data.caredocProfit}</RevenueText>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body4">
            {receptionData?.caregivingManagerInfo?.organizationType ===
            'AFFILIATED'
              ? externalCaregivingOrganization?.name
              : EMPTY_VALUE_TEXT}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <RevenueText>{data.distributedProfit}</RevenueText>
        </OutlinedTableCell>
      </OutlinedTableCell>
    </TableGrid>
  )
}

export default TableRow
