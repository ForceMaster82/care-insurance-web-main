import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {IReceptionApplication} from '../../../types/dto'

interface IProps {
  receptionId: string
}

const useReceptionApplication = ({
  receptionId,
}: IProps): UseQueryResult<IReceptionApplication> => {
  return useQuery({
    queryFn: () =>
      fetcher<IReceptionApplication>(
        `/api/v1/receptions/${receptionId}/application`,
      ),
    queryKey: ['reception-application', {receptionId}],
    select: (response) => response.body,
  })
}

export default useReceptionApplication
