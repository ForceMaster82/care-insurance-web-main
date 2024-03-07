import {useQuery} from '@tanstack/react-query'
import {PaginationParams} from '../../../types'
import {getURLSearchParams} from '../../../utils/url'
import {fetcher} from '../../../utils/fetcher'
import {
  IPaginationResponse,
  IReceptionCaregivingRoundModificationHistoryItem,
} from '../../../types/dto'
import {getInternalCaregivingManagerIdFromToken} from '../../../utils/manage-token'

type IProps = {
  receptionId: string
} & PaginationParams

const useReceptionCaregivingRoundModificationHistory = (
  props: IProps,
):
  | IPaginationResponse<IReceptionCaregivingRoundModificationHistoryItem>
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
        IPaginationResponse<IReceptionCaregivingRoundModificationHistoryItem>
      >(
        `/api/v1/receptions/${receptionId}/caregiving-round-modification-history?${queryParams.toString()}`,
      ),
    queryKey: [
      'reception-caregiving-round-modification-history',
      {pageNumber, pageSize, receptionId},
    ],
    select: (response) => response.body,
  })

  return data
}

export default useReceptionCaregivingRoundModificationHistory
