import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {IReceptionCaregivingRoundModification} from '../../../types/dto'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'

interface IProps {
  receptionId: string
}

const useReceptionCaregivingRoundModification = ({
  receptionId,
}: IProps): IReceptionCaregivingRoundModification | undefined => {
  const {data} = useQuery({
    enabled: Boolean(getInternalCaregivingManagerIdFromToken()),
    queryFn: () =>
      fetcher<IReceptionCaregivingRoundModification>(
        `/api/v1/receptions/${receptionId}/caregiving-round-modification`,
      ),
    queryKey: ['reception-caregiving-round-modification', {receptionId}],
    select: (response) => response.body,
  })

  return data
}

export default useReceptionCaregivingRoundModification
