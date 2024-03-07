import {useQuery} from '@tanstack/react-query'
import {IReceptionSettlement} from '../../../types/dto'
import {fetcher} from '../../../utils/fetcher'
import ReceptionSettlementResource from '../../../models/dto/reception-settlement/Resource'

interface IProps {
  receptionId?: string | null
}

const useReceptionSettlementList = ({
  receptionId,
}: IProps): ReceptionSettlementResource[] | undefined => {
  const {data} = useQuery({
    enabled: Boolean(receptionId),
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IReceptionSettlement[]>(
        `/api/v1/receptions/${receptionId}/settlements`,
      ),
    queryKey: ['reception-settlement', 'list', {receptionId}],
    select: (response) =>
      response.body.map((item) => new ReceptionSettlementResource(item)),
    suspense: true,
  })

  return data
}

export default useReceptionSettlementList
