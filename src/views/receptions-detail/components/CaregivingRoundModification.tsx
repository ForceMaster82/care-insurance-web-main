import React, {ReactElement} from 'react'
import RecentModificationInfo from '../../../components/RecentModificationInfo'
import useReceptionCaregivingRoundModification from '../../../hooks/api/reception/use-reception-caregiving-round-modification'
import useUserDetail from '../../../hooks/api/user/use-user-detail'

interface IProps {
  onClick?: () => void
  receptionId: string
}

const CaregivingRoundModification = ({
  onClick,
  receptionId,
}: IProps): ReactElement | null => {
  const caregivingRoundModification = useReceptionCaregivingRoundModification({
    receptionId,
  })
  const lastModifier = useUserDetail({
    userId: caregivingRoundModification?.lastModifierId,
  })
  const lastModifiedDateTime =
    (caregivingRoundModification?.lastModifiedDateTime &&
      new Date(caregivingRoundModification.lastModifiedDateTime)) ||
    null

  if (!caregivingRoundModification || !lastModifier || !lastModifiedDateTime) {
    return null
  }

  return (
    <RecentModificationInfo
      lastModifiedDateTime={lastModifiedDateTime}
      lastModifierName={lastModifier.name}
      modificationCount={caregivingRoundModification.modificationCount}
      onClick={onClick}
    />
  )
}

export default CaregivingRoundModification
