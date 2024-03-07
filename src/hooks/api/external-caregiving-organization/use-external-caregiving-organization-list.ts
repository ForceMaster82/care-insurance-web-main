import {useQuery} from '@tanstack/react-query'
import {ExternalCaregivingOrganizationType} from '../../../types'
import {getURLSearchParams} from '../../../utils/url'
import {fetcher} from '../../../utils/fetcher'
import {
  IExternalCaregivingOrganizationListData,
  IPaginationResponse,
} from '../../../types/dto'

const PAGE_NUMBER = 1
const PAGE_SIZE = 999

interface IProps {
  externalCaregivingOrganizationType?: ExternalCaregivingOrganizationType | null
}

const useExternalCaregivingOrganizationList = ({
  externalCaregivingOrganizationType,
}: IProps): IExternalCaregivingOrganizationListData[] => {
  const queryKeys = {
    externalCaregivingOrganizationType,
    pageNumber: PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  }
  const queryParams = getURLSearchParams(queryKeys)

  const {data} = useQuery({
    queryFn: () =>
      fetcher<IPaginationResponse<IExternalCaregivingOrganizationListData>>(
        `/api/v1/external-caregiving-organizations?${queryParams.toString()}`,
      ),
    queryKey: ['external-caregiving-organization', 'list', queryKeys],
    select: (response) => response.body.items,
  })

  return data || []
}

export default useExternalCaregivingOrganizationList
