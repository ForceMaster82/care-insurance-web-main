import {useQuery} from '@tanstack/react-query'
import {PaginationParams} from '../../../types'
import {getURLSearchParams} from '../../../utils/url'
import {fetcher} from '../../../utils/fetcher'
import {
  IPaginationResponse,
  IReceptionCaregivingChargeModificationHistoryItem,
} from '../../../types/dto'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'

type IProps = {
  receptionId: string
} & PaginationParams

const useReceptionCaregivingChargeModificationHistory = (
  props: IProps,
):
  | IPaginationResponse<IReceptionCaregivingChargeModificationHistoryItem>
  | undefined => {
  const {receptionId, pageNumber, pageSize} = props

  const queryParams = getURLSearchParams({
    pageNumber,
    pageSize,
  })

  const {data} = useQuery({
    enabled: Boolean(getInternalCaregivingManagerIdFromToken()),
    keepPreviousData: true,
    queryFn: () =>
      fetcher<
        IPaginationResponse<IReceptionCaregivingChargeModificationHistoryItem>
      >(
        `/api/v1/receptions/${receptionId}/caregiving-charge-modification-history?${queryParams.toString()}`,
      ),
    queryKey: [
      'reception-caregiving-charge-modification-history',
      {pageNumber, pageSize, receptionId},
    ],
    select: (response) => response.body,
  })

  return data
}

export default useReceptionCaregivingChargeModificationHistory
