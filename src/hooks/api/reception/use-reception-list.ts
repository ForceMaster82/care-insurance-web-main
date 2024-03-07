import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {
  OrganizationType,
  PaginationParams,
  PeriodParams,
  PeriodType,
  ReceptionProgressingStatus,
  SearchQueryParams,
  Urgency,
} from '../../../types'
import {
  formatSearchQuery,
  getURLSearchParams,
  transformProgressingStatusFilterToQueryData,
} from '../../../utils/url'
import {IPaginationResponse, IReceptionListData} from '../../../types/dto'
import ReceptionListResource from '../../../models/dto/reception/ListResource'

type IProps = {
  caregivingManagerAssigned?: boolean | null
  organizationType: OrganizationType | null
  periodType: PeriodType | null
  progressingStatusFilter: ReceptionProgressingStatus[]
  urgency: Urgency | null
} & PaginationParams &
  PeriodParams &
  SearchQueryParams

const useReceptionList = (
  props: IProps,
): IPaginationResponse<ReceptionListResource> | undefined => {
  const {
    organizationType,
    periodType,
    progressingStatusFilter,
    urgency,
    pageNumber,
    pageSize,
    from,
    until,
    searchCategory,
    searchKeyword,
    caregivingManagerAssigned,
  } = props

  const path = '/api/v1/receptions'

  const searchQuery = formatSearchQuery(searchCategory, searchKeyword)
  const searchFilterQueryData = transformProgressingStatusFilterToQueryData({
    PROGRESSING_STATUS: progressingStatusFilter,
  })

  const queryParams = getURLSearchParams([
    ...Object.entries({
      caregivingManagerAssigned,
      from,
      organizationType,
      pageNumber,
      pageSize,
      periodType,
      query: searchQuery,
      until,
      urgency,
    }),
    ...searchFilterQueryData,
  ])

  const queryKeys = {
    caregivingManagerAssigned,
    from,
    organizationType,
    pageNumber,
    pageSize,
    periodType,
    progressingStatusFilter,
    query: searchQuery,
    until,
    urgency,
  }

  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<IReceptionListData>>(
        `${path}?${queryParams.toString()}`,
      ),
    queryKey: ['reception', 'list', queryKeys],
    select: (response) => ({
      ...response.body,
      items: response.body.items.map((item) => new ReceptionListResource(item)),
    }),
  })

  return data
}

export default useReceptionList
