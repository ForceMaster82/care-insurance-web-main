/* eslint-disable no-magic-numbers */
import {Link} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {formatStaticNumberWithComma} from '../../../../utils/formatter'
import OutlinedTableCell from '~components/table/OutlinedTableCell'
import EllipsisText from '~components/list/EllipsisText'
import ListItem from '~components/list/ListItem'
import getItemOrder from '~utils/get-item-order'
import DailyCaregivingRoundSettlementTransactionResource from '~models/dto/daily-caregiving-round-settlement-transaction-statistic/Resource'
import {DEFAULT_PAGE_SIZE} from '~constants/data'
import useCaregivingRoundInfo from '~hooks/api/caregiving-round/use-caregiving-round-info'
interface IProps {
  currentPageNumber: number
  index: number
  item: DailyCaregivingRoundSettlementTransactionResource
  onClickAccidentNumber: (receptionId: string) => void
  totalItemCount: number
}

const GRID_TEMPLATE =
  'minmax(160px , 2fr) minmax(320px , 4fr) minmax(160px , 2fr) minmax(160px , 2fr) minmax(320px , 4fr) minmax(320px , 4fr) '

const SearchResultListItem = ({
  item,
  onClickAccidentNumber,
  index,
  totalItemCount,
  currentPageNumber,
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
          {getItemOrder(
            totalItemCount,
            currentPageNumber,
            DEFAULT_PAGE_SIZE,
            index,
          )}
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
