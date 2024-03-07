import {useQuery} from '@tanstack/react-query'
import {getURLSearchParams} from '../../../utils/url'
import {fetcher} from '../../../utils/fetcher'
import {
  IExternalCaregivingManagerListData,
  IPaginationResponse,
} from '../../../types/dto'

const PAGE_NUMBER = 1
const PAGE_SIZE = 999

interface IProps {
  externalCaregivingOrganizationId?: string | null
}

const useExternalCaregivingManagerList = ({
  externalCaregivingOrganizationId,
}: IProps): IExternalCaregivingManagerListData[] => {
  const queryKeys = {
    externalCaregivingOrganizationId,
    pageNumber: PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  }
  const queryParams = getURLSearchParams(queryKeys)

  const {data} = useQuery({
    enabled: Boolean(externalCaregivingOrganizationId),
    queryFn: () =>
      fetcher<IPaginationResponse<IExternalCaregivingManagerListData>>(
        `/api/v1/external-caregiving-managers?${queryParams.toString()}`,
      ),
    queryKey: ['external-caregiving-manager', 'list', queryKeys],
    select: (response) => response.body.items,
  })

  return data || []
}

export default useExternalCaregivingManagerList
