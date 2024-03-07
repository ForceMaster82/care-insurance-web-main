import {useQuery} from '@tanstack/react-query'
import {IBillingTransaction, IPaginationResponse} from '../../../types/dto'
import {fetcher} from '../../../utils/fetcher'
import BillingTransactionResource from '../../../models/dto/billing-transaction/Resource'
import {PaginationParams} from '../../../types'
import {getURLSearchParams} from '../../../utils/url'

type IProps = {
  billingId: string
} & PaginationParams

const useBillingTransactionList = ({
  billingId,
  pageNumber,
  pageSize,
}: IProps): IPaginationResponse<BillingTransactionResource> | undefined => {
  const queryParams = getURLSearchParams({
    pageNumber,
    pageSize,
  })
  const queryKeys = {
    billingId,
    pageNumber,
    pageSize,
  }

  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<IBillingTransaction>>(
        `/api/v1/billings/${billingId}/transactions?${queryParams.toString()}`,
      ),
    queryKey: ['billing-transaction', 'list', queryKeys],
    select: (response) => ({
      ...response.body,
      items: response.body.items.map(
        (item) => new BillingTransactionResource(item),
      ),
    }),
  })

  return data
}

export default useBillingTransactionList
