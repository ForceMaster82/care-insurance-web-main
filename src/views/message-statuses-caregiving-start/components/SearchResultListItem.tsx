import {Link} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import EllipsisText from '../../../components/list/EllipsisText'
import {formatDate} from '../../../utils/date'
import {ICaregivingStartMessageStatus} from '../../../types/dto'
import ListItem from '../../../components/list/ListItem'
import useReceptionDetail from '../../../hooks/api/reception/use-reception-detail'
import useCaregivingRoundInfo from '../../../hooks/api/caregiving-round/use-caregiving-round-info'
import {EMPTY_VALUE_TEXT} from '../../../constants'
import CaregivingMessageSendingStatusChip from '../../../components/chips/CaregivingMessageSendingStatusChip'

interface IProps {
  data: ICaregivingStartMessageStatus
  gridTemplate: string
  isSelected: boolean
  onClickAccidentNumber: (receptionId: string) => void
  onSelect: (receptionId: string) => void
}

const SearchResultListItem = (props: IProps): ReactElement => {
  const {data, gridTemplate, isSelected, onSelect, onClickAccidentNumber} =
    props

  const {data: receptionData} = useReceptionDetail({
    receptionId: data.receptionId,
  })
  const firstCaregivingRoundData = useCaregivingRoundInfo({
    caregivingRoundId: data.firstCaregivingRoundId,
  })

  return (
    <ListItem
      gridTemplate={gridTemplate}
      isSelected={isSelected}
      key={data.receptionId}
      onSelect={(): void => onSelect(data.receptionId)}
      useSelection
    >
      <Link
        color="information"
        onClick={(): void => onClickAccidentNumber(data.receptionId)} // toDo: 접수 ID로 변경 필요
      >
        {receptionData?.accidentInfo.accidentNumber}
      </Link>
      <EllipsisText>{receptionData?.patientInfo.name}</EllipsisText>
      <EllipsisText>
        {receptionData && formatDate(receptionData.receivedDateTime)}
      </EllipsisText>
      <EllipsisText>
        {firstCaregivingRoundData?.startDateTime &&
          formatDate(firstCaregivingRoundData.startDateTime)}
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
