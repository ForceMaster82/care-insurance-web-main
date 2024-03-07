import {IResponse} from '../../types/fetch'
import {fetcher} from '../fetcher'

export const fetchBillingCertificates = (
  billingIds: string[],
): Promise<IResponse<Blob>[]> => {
  const fetchers = billingIds.map((billingId) =>
    fetcher<Blob>(`/api/v1/billings/${billingId}/certificate`),
  )
  return Promise.all(fetchers)
}
