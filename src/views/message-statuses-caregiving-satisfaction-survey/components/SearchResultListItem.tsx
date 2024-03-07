import React, {ReactElement} from 'react'
import {Link} from '@caredoc/ui-web'
import ListItem from '../../../components/list/ListItem'
import EllipsisText from '../../../components/list/EllipsisText'
import CaregivingSatisfactionSurveyReservationStatusChip from '../../../components/chips/CaregivingSatisfactionSurveyReservationStatusChip'
import {ICaregivingSatisfactionSurveyStatus} from '../../../types/dto'
import useReceptionDetail from '../../../hooks/api/reception/use-reception-detail'
import useCaregivingRoundInfo from '../../../hooks/api/caregiving-round/use-caregiving-round-info'
import {formatDate} from '../../../utils/date'
import {EMPTY_VALUE_TEXT} from '../../../constants'

interface IProps {
  data: ICaregivingSatisfactionSurveyStatus
  gridTemplate: string
  isSelected: boolean
  onClickAccidentNumber: (receptionId: string) => void
  onSelect: (caregivingRoundId: string) => void
}

const SearchResultListItem = (props: IProps): ReactElement => {
  const {data, isSelected, onSelect, gridTemplate, onClickAccidentNumber} =
    props

  const {data: receptionData} = useReceptionDetail({
    receptionId: data.receptionId,
  })
  const caregivingRoundData = useCaregivingRoundInfo({
    caregivingRoundId: data.lastCaregivingRoundId,
  })

  return (
    <ListItem
      backgroundColor="bgPrimary"
      gridTemplate={gridTemplate}
      isSelected={isSelected}
      onSelect={(): void => onSelect(data.receptionId)}
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
        {(caregivingRoundData?.endDateTime &&
          formatDate(caregivingRoundData.endDateTime)) ||
          EMPTY_VALUE_TEXT}
      </EllipsisText>
      <CaregivingSatisfactionSurveyReservationStatusChip
        status={data.reservationStatus}
      />
    </ListItem>
  )
}

export default SearchResultListItem
