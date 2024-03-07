import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {IReceptionCaregivingChargeModification} from '../../../types/dto'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'

interface IProps {
  receptionId: string
}

const useReceptionCaregivingChargeModification = ({
  receptionId,
}: IProps): IReceptionCaregivingChargeModification | undefined => {
  const {data} = useQuery({
    enabled: Boolean(getInternalCaregivingManagerIdFromToken()),
    queryFn: () =>
      fetcher<IReceptionCaregivingChargeModification>(
        `/api/v1/receptions/${receptionId}/caregiving-charge-modification`,
      ),
    queryKey: ['reception-caregiving-charge-modification', {receptionId}],
    select: (response) => response.body,
  })

  return data
}

export default useReceptionCaregivingChargeModification
