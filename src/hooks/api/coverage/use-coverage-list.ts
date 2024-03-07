import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {getURLSearchParams} from '../../../utils/url'
import {ICoverageListData, IPaginationResponse} from '../../../types/dto'
import CoverageListResource from '../../../models/dto/coverage/ListResource'

const PAGE_NUMBER = 1
const PAGE_SIZE = 999

const useCoverageList = (): CoverageListResource[] => {
  const queryKeys = {
    pageNumber: PAGE_NUMBER,
    pageSize: PAGE_SIZE,
  }
  const queryParams = getURLSearchParams(queryKeys)

  const {data} = useQuery({
    queryFn: () =>
      fetcher<IPaginationResponse<ICoverageListData>>(
        `/api/v1/coverages?${queryParams.toString()}`,
      ),
    queryKey: ['coverage', 'list', queryKeys],
    select: (response) =>
      response.body.items.map((item) => new CoverageListResource(item)),
  })

  return data || []
}

export default useCoverageList
