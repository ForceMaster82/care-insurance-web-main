/* eslint-disable unicorn/filename-case */
import React, {ReactElement} from 'react'
import {Typography} from '@caredoc/ui-web'
import {formatStaticNumberWithComma} from '../../../../utils/formatter'
import TableGrid from '~components/table/TableGrid'
import OutlinedTableCell from '~components/table/OutlinedTableCell'
import DailyReceptionStatisticResource from '~models/dto/daily-reception-statistic/Resource'
import {formatDate, getDayString} from '~utils/date'

interface ITableRowProps {
  data: DailyReceptionStatisticResource
  gridTemplate: string
}

const TableRow = (props: ITableRowProps): ReactElement => {
  const {data, gridTemplate} = props
  return (
    <TableGrid
      backgroundColor="borderSecondary"
      gap={1}
      gridTemplate={gridTemplate}
      minWidth="fit-content"
    >
      <OutlinedTableCell>
        <Typography textAlign="center" variant="body4">
          {formatDate(data.receivedDate)}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography textAlign="center" variant="body4">
          {getDayString(data.receivedDate)}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography textAlign="center" variant="body4">
          {formatStaticNumberWithComma(data.receptionCount)}
        </Typography>
      </OutlinedTableCell>

      <OutlinedTableCell>
        <Typography textAlign="center" variant="body4">
          {formatStaticNumberWithComma(data.dispatchedCount)}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography textAlign="center" variant="body4">
          {formatStaticNumberWithComma(
            data.canceledReceptionCountsByReason.CANCELED_BY_PERSONAL_CAREGIVER,
          )}
        </Typography>
      </OutlinedTableCell>

      <OutlinedTableCell>
        <Typography textAlign="center" variant="body4">
          {formatStaticNumberWithComma(
            data.canceledReceptionCountsByReason.CANCELED_BY_MEDICAL_REQUEST,
          )}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Typography textAlign="center" variant="body4">
          {formatStaticNumberWithComma(data.canceledReceptionCount)}
        </Typography>
      </OutlinedTableCell>
      <OutlinedTableCell flex={1} flexDirection="row" isWrapper>
        <OutlinedTableCell>
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.requestedBillingCount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.requestedBillingAmount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.depositCount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.depositAmount)}
          </Typography>
        </OutlinedTableCell>
      </OutlinedTableCell>

      <OutlinedTableCell flexDirection="row" isWrapper>
        <OutlinedTableCell>
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.withdrawalCount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell alignItems="end">
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.withdrawalAmount)}
          </Typography>
        </OutlinedTableCell>
      </OutlinedTableCell>

      <OutlinedTableCell>
        <Typography textAlign="center" variant="body4">
          {formatStaticNumberWithComma(data.claimCount)}
        </Typography>
      </OutlinedTableCell>

      <OutlinedTableCell flexDirection="row" isWrapper overflow="hidden">
        <OutlinedTableCell>
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.sameDayAssignmentReceptionCount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(
              data.startedSameDayAssignmentReceptionCount,
            )}
          </Typography>
        </OutlinedTableCell>
      </OutlinedTableCell>
      <OutlinedTableCell flexDirection="row" isWrapper>
        <OutlinedTableCell>
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.shortTermReceptionCount)}
          </Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography textAlign="center" variant="body4">
            {formatStaticNumberWithComma(data.startedShortTermReceptionCount)}
          </Typography>
        </OutlinedTableCell>
      </OutlinedTableCell>
    </TableGrid>
  )
}
export default TableRow
