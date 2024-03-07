/* eslint-disable no-alert */
import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {IInternalCaregivingManager} from '../../../types/dto'

interface IProps {
  internalCaregivingManagerId?: string | null
}

const useInternalCaregivingManagerDetail = ({
  internalCaregivingManagerId,
}: IProps): UseQueryResult<IInternalCaregivingManager> => {
  return useQuery({
    enabled: Boolean(internalCaregivingManagerId),
    queryFn: () =>
      fetcher<IInternalCaregivingManager>(
        `/api/v1/internal-caregiving-managers/${internalCaregivingManagerId}`,
      ),
    queryKey: [
      'internal-caregiving-manager',
      'detail',
      {id: internalCaregivingManagerId},
    ],
    select: (response) => response.body,
  })
}

export default useInternalCaregivingManagerDetail
