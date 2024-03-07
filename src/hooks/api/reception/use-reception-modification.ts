import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {IReceptionModification} from '../../../types/dto'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'

interface IProps {
  receptionId: string
}

const useReceptionModification = ({
  receptionId,
}: IProps): IReceptionModification | undefined => {
  const {data} = useQuery({
    enabled: Boolean(getInternalCaregivingManagerIdFromToken()),
    queryFn: () =>
      fetcher<IReceptionModification>(
        `/api/v1/receptions/${receptionId}/reception-modification`,
      ),
    queryKey: ['reception-modification', {receptionId}],
    select: (response) => response.body,
  })

  return data
}

export default useReceptionModification
