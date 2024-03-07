import {useQuery} from '@tanstack/react-query'
import {getURLSearchParams} from '../../../utils/url'
import {fetcher} from '../../../utils/fetcher'
import {
  IInternalCaregivingManagerListData,
  IPaginationResponse,
} from '../../../types/dto'

const PAGE_NUMBER = 1
const PAGE_SIZE = 999

interface IProps {
  enabled: boolean
}

const useInternalCaregivingManagerList = ({
  enabled,
}: IProps): IInternalCaregivingManagerListData[] => {
  const queryKeys = {
    pageNumber: PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  }
  const queryParams = getURLSearchParams(queryKeys)

  const {data} = useQuery({
    enabled,
    queryFn: () =>
      fetcher<IPaginationResponse<IInternalCaregivingManagerListData>>(
        `/api/v1/internal-caregiving-managers?${queryParams.toString()}`,
      ),
    queryKey: ['internal-caregiving-manager', 'list', queryKeys],
    select: (response) => response.body.items,
  })

  return data || []
}

export default useInternalCaregivingManagerList
