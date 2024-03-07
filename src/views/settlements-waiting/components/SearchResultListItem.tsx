import React, {ReactElement} from 'react'
import {Link} from '@caredoc/ui-web'
import SettlementResource from '../../../models/dto/settlement/Resource'
import ListItem from '../../../components/list/ListItem'
import EllipsisText from '../../../components/list/EllipsisText'
import getItemOrder from '../../../utils/get-item-order'
import {DEFAULT_PAGE_SIZE} from '../../../constants/data'
import {formatStaticNumberWithComma} from '../../../utils/formatter'
import {formatDate} from '../../../utils/date'
import {ListItemOrderProps} from '../../../types'
import useCaregivingRoundInfo from '../../../hooks/api/caregiving-round/use-caregiving-round-info'
import useExternalCaregivingOrganization from '../../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import {EMPTY_VALUE_TEXT, ORGANIZATION_TYPE} from '../../../constants'

type IProps = {
  data: SettlementResource
  gridTemplate: string
  isSelected: boolean
  onClickAccidentNumber: (receptionId: string) => void
  onSelect: (settlementId: string) => void
} & ListItemOrderProps

const SearchResultListItem = (props: IProps): ReactElement => {
  const {
    gridTemplate,
    data,
    onSelect,
    isSelected,
    listItemIndex,
    totalItemCount,
    currentPageNumber,
    onClickAccidentNumber,
  } = props

  const caregivingRound = useCaregivingRoundInfo({
    caregivingRoundId: data.caregivingRoundId,
  })
  const caregiverOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId:
      caregivingRound?.caregiverInfo.caregiverOrganizationId,
  })

  return (
    <ListItem
      gridTemplate={gridTemplate}
      isSelected={isSelected}
      onSelect={(): void => onSelect(data.id)}
      useSelection
    >
      <EllipsisText>
        {getItemOrder(
          totalItemCount,
          currentPageNumber,
          DEFAULT_PAGE_SIZE,
          listItemIndex,
        )}
      </EllipsisText>
      <Link
        color="information"
        onClick={(): void => onClickAccidentNumber(data.receptionId)}
      >
        {data.accidentNumber}
      </Link>
      <EllipsisText>{data.patientName}</EllipsisText>
      <EllipsisText>
        {caregivingRound
          ? caregiverOrganization?.name || ORGANIZATION_TYPE.INTERNAL
          : EMPTY_VALUE_TEXT}
      </EllipsisText>
      <EllipsisText>{data.caregivingRoundNumber}</EllipsisText>
      <EllipsisText>
        {formatStaticNumberWithComma(data.totalAmount)}
      </EllipsisText>
      <EllipsisText>{formatDate(data.expectedSettlementDate)}</EllipsisText>
      <EllipsisText>{formatDate(data.lastCalculationDateTime)}</EllipsisText>
    </ListItem>
  )
}

export default SearchResultListItem
