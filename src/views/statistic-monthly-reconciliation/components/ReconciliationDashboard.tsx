/* eslint-disable no-magic-numbers */
import {Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import ListContainer from '../../../components/list/ListContainer'
import {formatStaticNumberWithComma} from '../../../utils/formatter'
import EmptySearchResult from '~components/EmptySearchResult'
import OutlinedTableCell from '~components/table/OutlinedTableCell'
import TableGrid from '~components/table/TableGrid'
import MonthlyReconciliationStatisticResource from '~models/dto/monthly-reconciliation-statistic/Resource'

const GRID_TEMPLATE =
  'minmax(120px,3fr) minmax(120px,3fr) minmax(120px,3fr) minmax(120px,3fr) minmax(160px,4fr) minmax(160px,4fr) minmax(160px,4fr)  minmax(120px,3fr) minmax(320px,8fr)'
interface IProps {
  monthlyReconciliationStatisticData?: MonthlyReconciliationStatisticResource
}

const ReconciliationDashboard = (props: IProps): ReactElement => {
  const {monthlyReconciliationStatisticData} = props

  return (
    <ListContainer backgroundColor="borderSecondary">
      {/* title */}
      <TableGrid
        backgroundColor="borderSecondary"
        gap={1}
        gridTemplate={GRID_TEMPLATE}
        minWidth="fit-content"
      >
        <OutlinedTableCell>
          <Typography variant="body3">돌봄환자</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body3">케어기버</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body3">돌봄 일 수</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body3">건당 평균 일 수</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body3">청구 금액</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body3">간병비 지출액</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body3">매출액</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell>
          <Typography variant="body3">수익율</Typography>
        </OutlinedTableCell>
        <OutlinedTableCell isWrapper>
          <OutlinedTableCell>
            <Typography variant="caption1">분배수익</Typography>
          </OutlinedTableCell>
          <OutlinedTableCell flexDirection="row" isWrapper>
            <OutlinedTableCell>
              <Typography variant="body3">케어닥 수익</Typography>
            </OutlinedTableCell>
            <OutlinedTableCell>
              <Typography variant="body3">제휴사 수익</Typography>
            </OutlinedTableCell>
          </OutlinedTableCell>
        </OutlinedTableCell>
      </TableGrid>

      {/* results */}
      {monthlyReconciliationStatisticData ? (
        <TableGrid
          backgroundColor="borderSecondary"
          gap={1}
          gridTemplate={GRID_TEMPLATE}
          minWidth="fit-content"
        >
          <OutlinedTableCell>
            <Typography variant="body4">
              {monthlyReconciliationStatisticData.receptionCount}
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body4">
              {monthlyReconciliationStatisticData.caregiverCount}
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body4">
              {monthlyReconciliationStatisticData.totalCaregivingPeriod}
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell>
            <Typography variant="body4">
              {(
                monthlyReconciliationStatisticData.totalCaregivingPeriod /
                monthlyReconciliationStatisticData.receptionCount
              ).toFixed(1)}
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell alignItems="end">
            <Typography variant="body4">
              {formatStaticNumberWithComma(
                monthlyReconciliationStatisticData.totalBillingAmount,
              )}
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell alignItems="end">
            <Typography variant="body4">
              {formatStaticNumberWithComma(
                monthlyReconciliationStatisticData.totalSettlementAmount,
              )}
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell alignItems="end">
            <Typography variant="body4">
              {formatStaticNumberWithComma(
                monthlyReconciliationStatisticData.totalProfit,
              )}
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell alignItems="end">
            <Typography variant="body4">
              {(
                (monthlyReconciliationStatisticData.totalProfit /
                  monthlyReconciliationStatisticData.totalBillingAmount) *
                100
              ).toFixed(2) + '%'}
            </Typography>
          </OutlinedTableCell>
          <OutlinedTableCell flexDirection="row" isWrapper>
            <OutlinedTableCell alignItems="end">
              <Typography variant="body4">
                {formatStaticNumberWithComma(
                  monthlyReconciliationStatisticData.totalProfit -
                    monthlyReconciliationStatisticData.totalDistributedProfit,
                )}
              </Typography>
            </OutlinedTableCell>
            <OutlinedTableCell alignItems="end">
              <Typography variant="body4">
                {formatStaticNumberWithComma(
                  monthlyReconciliationStatisticData.totalDistributedProfit,
                )}
              </Typography>
            </OutlinedTableCell>
          </OutlinedTableCell>
        </TableGrid>
      ) : (
        <EmptySearchResult />
      )}
    </ListContainer>
  )
}
export default ReconciliationDashboard
