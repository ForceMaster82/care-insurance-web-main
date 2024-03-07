import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {IExternalCaregivingManager} from '../../../types/dto'

interface IProps {
  externalCaregivingManagerId?: string | null
}

const useExternalCaregivingManagerDetail = ({
  externalCaregivingManagerId,
}: IProps): IExternalCaregivingManager | undefined => {
  const {data} = useQuery({
    enabled: Boolean(externalCaregivingManagerId),
    queryFn: () =>
      fetcher<IExternalCaregivingManager>(
        `/api/v1/external-caregiving-managers/${externalCaregivingManagerId}`,
      ),
    queryKey: [
      'external-caregiving-manager',
      'detail',
      {id: externalCaregivingManagerId},
    ],
    select: (response) => response.body,
  })

  return data
}

export default useExternalCaregivingManagerDetail
