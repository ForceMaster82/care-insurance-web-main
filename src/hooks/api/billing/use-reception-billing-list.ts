import {useQuery} from '@tanstack/react-query'
import {IReceptionBilling} from '../../../types/dto'
import {fetcher} from '../../../utils/fetcher'
import ReceptionBillingResource from '../../../models/dto/reception-billing/Resource'

interface IProps {
  receptionId?: string | null
}

const useReceptionBillingList = ({
  receptionId,
}: IProps): ReceptionBillingResource[] => {
  const {data} = useQuery({
    enabled: Boolean(receptionId),
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IReceptionBilling[]>(
        `/api/v1/receptions/${receptionId}/billings`,
      ),
    queryKey: ['reception-billing', 'list', {receptionId}],
    select: (response) =>
      response.body.map((item) => new ReceptionBillingResource(item)),
    suspense: true,
  })

  return data || []
}

export default useReceptionBillingList
