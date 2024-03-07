import React, {ReactElement} from 'react'
import {Link} from '@caredoc/ui-web'
import {ICaregivingProgressMessageStatus} from '../../../types/dto'
import EllipsisText from '../../../components/list/EllipsisText'
import CaregivingMessageSendingStatusChip from '../../../components/chips/CaregivingMessageSendingStatusChip'
import ListItem from '../../../components/list/ListItem'
import useReceptionDetail from '../../../hooks/api/reception/use-reception-detail'
import useCaregivingRoundInfo from '../../../hooks/api/caregiving-round/use-caregiving-round-info'
import {formatDate} from '../../../utils/date'
import {EMPTY_VALUE_TEXT} from '../../../constants'

interface IProps {
  data: ICaregivingProgressMessageStatus
  gridTemplate: string
  isSelected: boolean
  onClickAccidentNumber: (receptionId: string) => void
  onSelect: (caregivingRoundId: string) => void
}

const SearchResultListItem = (props: IProps): ReactElement => {
  const {data, gridTemplate, onSelect, isSelected, onClickAccidentNumber} =
    props

  const {data: receptionData} = useReceptionDetail({
    receptionId: data.receptionId,
  })
  const caregivingRoundData = useCaregivingRoundInfo({
    caregivingRoundId: data.caregivingRoundId,
  })

  return (
    <ListItem
      gridTemplate={gridTemplate}
      isSelected={isSelected}
      onSelect={(): void => onSelect(data.caregivingRoundId)}
      useSelection
    >
      <Link
        color="information"
        onClick={(): void => onClickAccidentNumber(data.receptionId)}
      >
        {receptionData?.accidentInfo.accidentNumber}
      </Link>
      <EllipsisText>{receptionData?.patientInfo.name}</EllipsisText>
      <EllipsisText>{caregivingRoundData?.caregivingRoundNumber}</EllipsisText>
      <EllipsisText>
        {(caregivingRoundData?.startDateTime &&
          formatDate(new Date(caregivingRoundData.startDateTime))) ||
          EMPTY_VALUE_TEXT}
      </EllipsisText>
      <CaregivingMessageSendingStatusChip status={data.sendingStatus} />
      <EllipsisText>
        {(data.sentDate && formatDate(new Date(data.sentDate))) ||
          EMPTY_VALUE_TEXT}
      </EllipsisText>
    </ListItem>
  )
}

export default SearchResultListItem
