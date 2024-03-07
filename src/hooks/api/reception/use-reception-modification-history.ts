import {useQuery} from '@tanstack/react-query'
import {PaginationParams} from '../../../types'
import {getURLSearchParams} from '../../../utils/url'
import {fetcher} from '../../../utils/fetcher'
import {
  IPaginationResponse,
  IReceptionModificationHistoryItem,
} from '../../../types/dto'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'

type IProps = {
  receptionId: string
} & PaginationParams

const useReceptionModificationHistory = (
  props: IProps,
): IPaginationResponse<IReceptionModificationHistoryItem> | undefined => {
  const {receptionId, pageNumber, pageSize} = props

  const queryParams = getURLSearchParams({
    pageNumber,
    pageSize,
  })

  const {data} = useQuery({
    enabled: Boolean(getInternalCaregivingManagerIdFromToken()),
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<IReceptionModificationHistoryItem>>(
        `/api/v1/receptions/${receptionId}/reception-modification-history?${queryParams.toString()}`,
      ),
    queryKey: [
      'reception-modification-history',
      {pageNumber, pageSize, receptionId},
    ],
    select: (response) => response.body,
  })

  return data
}

export default useReceptionModificationHistory
