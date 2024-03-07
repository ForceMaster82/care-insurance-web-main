/* eslint-disable no-alert */
import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'
import {IBillingDetail} from '../../../types/dto'
import BillingDetailResource from '../../../models/dto/billing-detail/Resource'

interface IProps {
  billingId: string
  onSuccess?: (data: BillingDetailResource) => void
}

const useBillingDetail = ({
  billingId,
  onSuccess,
}: IProps): UseQueryResult<BillingDetailResource> => {
  return useQuery({
    onError: (error) => {
      if (error instanceof Error) {
        const errorType = isLocalServerErrorType(error.name)
        errorType && alert(error.message)
      }
    },
    onSuccess,
    queryFn: () => fetcher<IBillingDetail>(`/api/v1/billings/${billingId}`),
    queryKey: ['billing', 'detail', {id: billingId}],
    select: (response) => new BillingDetailResource(response.body),
  })
}

export default useBillingDetail
