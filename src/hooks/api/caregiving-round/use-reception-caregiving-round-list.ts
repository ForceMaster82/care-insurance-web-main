import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {IReceptionCaregivingRound} from '../../../types/dto'
import ReceptionCaregivingRoundResource from '../../../models/dto/reception-caregiving-round/Resource'

interface IProps {
  receptionId?: string | null
}

const useReceptionCaregivingRoundList = ({
  receptionId,
}: IProps): ReceptionCaregivingRoundResource[] | undefined => {
  const {data} = useQuery({
    enabled: Boolean(receptionId),
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IReceptionCaregivingRound[]>(
        `/api/v1/receptions/${receptionId}/caregiving-rounds`,
      ),
    queryKey: ['reception-caregiving-round', 'list', {receptionId}],
    select: (response) =>
      response.body.map((item) => new ReceptionCaregivingRoundResource(item)),
    suspense: true,
  })

  return data
}

export default useReceptionCaregivingRoundList
