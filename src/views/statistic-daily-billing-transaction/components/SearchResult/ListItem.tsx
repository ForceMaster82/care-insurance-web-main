/* eslint-disable no-magic-numbers */
import {Link} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {formatStaticNumberWithComma} from '../../../../utils/formatter'
import OutlinedTableCell from '~components/table/OutlinedTableCell'
import EllipsisText from '~components/list/EllipsisText'
import ListItem from '~components/list/ListItem'
import getItemOrder from '~utils/get-item-order'
import useCaregivingRoundInfo from '~hooks/api/caregiving-round/use-caregiving-round-info'
import DailyCaregivingRoundBillingTransactionStatisticResource from '~models/dto/daily-caregiving-round-billing-transaction-statistic/Resource'
interface IProps {
  currentPageNumber: number
  index: number
  item: DailyCaregivingRoundBillingTransactionStatisticResource
  onClickAccidentNumber: (receptionId: string) => void
  totalItemCount: number
}

const GRID_TEMPLATE =
  'minmax(160px , 2fr) minmax(320px , 4fr) minmax(160px , 2fr) minmax(160px , 2fr) minmax(320px , 4fr) minmax(320px , 4fr) '

const SearchResultListItem = ({
  item,
  onClickAccidentNumber,
  index,
  currentPageNumber,
  totalItemCount,
}: IProps): ReactElement => {
  const caregivingRoundInfo = useCaregivingRoundInfo({
    caregivingRoundId: item.caregivingRoundId,
  })

  return (
    <ListItem
      backgroundColor="borderSecondary"
      gap={1}
      gridTemplate={GRID_TEMPLATE}
      p="none"
    >
      <OutlinedTableCell>
        <EllipsisText>
          {getItemOrder(totalItemCount, currentPageNumber, 20, index)}
        </EllipsisText>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <Link
          color="information"
          onClick={(): void => onClickAccidentNumber(item.receptionId)} // toDo: 접수 ID 필요
        >
          {caregivingRoundInfo?.receptionInfo.accidentNumber}
        </Link>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <EllipsisText>
          {caregivingRoundInfo?.receptionInfo.patientName}
        </EllipsisText>
      </OutlinedTableCell>
      <OutlinedTableCell>
        <EllipsisText>
          {caregivingRoundInfo?.caregivingRoundNumber}
        </EllipsisText>
      </OutlinedTableCell>
      <OutlinedTableCell alignItems="end">
        <EllipsisText textAlign="end">
          {formatStaticNumberWithComma(item.totalDepositAmount)}
        </EllipsisText>
      </OutlinedTableCell>
      <OutlinedTableCell alignItems="end">
        <EllipsisText textAlign="end">
          {(item.totalWithdrawalAmount > 0 &&
            `-${formatStaticNumberWithComma(item.totalWithdrawalAmount)}`) ||
            formatStaticNumberWithComma(item.totalWithdrawalAmount)}
        </EllipsisText>
      </OutlinedTableCell>
    </ListItem>
  )
}

export default SearchResultListItem
