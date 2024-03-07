import React, {ReactElement} from 'react'
import useReceptionCaregivingChargeModification from '../../../hooks/api/reception/use-reception-caregiving-charge-modification'
import useUserDetail from '../../../hooks/api/user/use-user-detail'
import RecentModificationInfo from '../../../components/RecentModificationInfo'

interface IProps {
  onClick?: () => void
  receptionId: string
}

const CaregivingChargeModification = ({
  onClick,
  receptionId,
}: IProps): ReactElement | null => {
  const caregivingChargeModification = useReceptionCaregivingChargeModification(
    {
      receptionId,
    },
  )
  const lastModifier = useUserDetail({
    userId: caregivingChargeModification?.lastModifierId,
  })
  const lastModifiedDateTime =
    (caregivingChargeModification?.lastModifiedDateTime &&
      new Date(caregivingChargeModification.lastModifiedDateTime)) ||
    null

  if (!caregivingChargeModification || !lastModifier || !lastModifiedDateTime) {
    return null
  }

  return (
    <RecentModificationInfo
      lastModifiedDateTime={lastModifiedDateTime}
      lastModifierName={lastModifier.name}
      modificationCount={caregivingChargeModification.modificationCount}
      onClick={onClick}
    />
  )
}

export default CaregivingChargeModification
