import React, {ReactElement} from 'react'
import RecentModificationInfo from '../../../components/RecentModificationInfo'
import useReceptionModification from '../../../hooks/api/reception/use-reception-modification'
import useUserDetail from '../../../hooks/api/user/use-user-detail'

interface IProps {
  onClick?: () => void
  receptionId: string
}

const ReceptionModification = ({
  receptionId,
  onClick,
}: IProps): ReactElement | null => {
  const receptionModification = useReceptionModification({receptionId})
  const lastModifier = useUserDetail({
    userId: receptionModification?.lastModifierId,
  })
  const lastModifiedDateTime =
    (receptionModification?.lastModifiedDateTime &&
      new Date(receptionModification.lastModifiedDateTime)) ||
    null

  if (!receptionModification || !lastModifier || !lastModifiedDateTime) {
    return null
  }

  return (
    <RecentModificationInfo
      lastModifiedDateTime={lastModifiedDateTime}
      lastModifierName={lastModifier.name}
      modificationCount={receptionModification.modificationCount}
      onClick={onClick}
    />
  )
}

export default ReceptionModification
