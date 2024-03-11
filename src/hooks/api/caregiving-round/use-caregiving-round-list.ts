import {useQuery} from '@tanstack/react-query'
import UserResource from '../../../models/dto/user/Resource'
import {fetcher} from '../../../utils/fetcher'
import {ICaregivingRound, IPaginationResponse} from '../../../types/dto'
import {
  CaregivingSearchFilter,
  PaginationParams,
  PeriodParams,
  SearchQueryParams,
} from '../../../types'
import {
  formatSearchQuery,
  getURLSearchParams,
  transformProgressingStatusFilterToQueryData,
} from '../../../utils/url'
import CaregivingRoundResource from '../../../models/dto/caregiving-round/Resource'

type IProps = {
  expectedCaregivingStartDate: string
  searchFilter: CaregivingSearchFilter
  user?: UserResource
} & PaginationParams &
  PeriodParams &
  SearchQueryParams

const useCaregivingRoundList = (
  props: IProps,
): IPaginationResponse<CaregivingRoundResource> | undefined => {
  const {
    user,
    expectedCaregivingStartDate,
    searchFilter,
    pageNumber,
    pageSize = 50,
    from,
    until,
    searchCategory,
    searchKeyword,
  } = props

  const path =
    (user?.organizationId &&
      `/api/v1/organizations/${user.organizationId}/caregiving-rounds`) ||
    '/api/v1/caregiving-rounds'

  const searchFilterQueryData =
    transformProgressingStatusFilterToQueryData(searchFilter)
  const searchQuery = formatSearchQuery(searchCategory, searchKeyword)


  const queryParams = getURLSearchParams([
    ...Object.entries({
      expectedCaregivingStartDate,
      from,
      pageNumber,
      pageSize: 50,
      query: searchQuery,
      until,
    }),
    ...searchFilterQueryData,
  ])

  const queryKeys = {
    expectedCaregivingStartDate,
    from,
    pageNumber,
    pageSize,
    query: searchQuery,
    searchFilter,
    until,
  }

  const {data} = useQuery({
    enabled: Boolean(user),
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<ICaregivingRound>>(
        `${path}?${queryParams.toString()}`,
      ),
    queryKey: ['caregiving-round', 'list', queryKeys],
    select: (response) => ({
      ...response.body,
      items: response.body.items.map(
        (item) => new CaregivingRoundResource(item),
      ),
    }),
  })

  return data
}

export default useCaregivingRoundList
