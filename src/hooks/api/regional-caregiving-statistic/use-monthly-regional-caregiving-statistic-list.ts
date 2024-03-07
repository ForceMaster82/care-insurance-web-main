import {useQuery} from '@tanstack/react-query'
import {getURLSearchParams} from '../../../utils/url'
import MonthlyRegionalCaregivingStatisticResource from '~models/dto/monthly-regional-caregiving-statistic/Resource'
import {PaginationParams} from '~types'
import {
  IMonthlyRegionalCaregivingStatistic,
  IPaginationResponse,
} from '~types/dto'
import {fetcher} from '~utils/fetcher'

type IProps = {
  city?: string | null
  month: number
  state?: string | null
  year: number
} & PaginationParams

const useMonthlyRegionalCaregivingStatistics = ({
  year,
  month,
  city,
  state,
  pageNumber,
  pageSize,
}: IProps):
  | IPaginationResponse<MonthlyRegionalCaregivingStatisticResource>
  | undefined => {
  const queryParams = getURLSearchParams({
    city,
    month,
    pageNumber,
    pageSize,
    state,
    year,
  })

  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<IMonthlyRegionalCaregivingStatistic>>(
        `/api/v1/monthly-regional-caregiving-statistics?${queryParams.toString()}`,
      ),
    queryKey: [
      'monthly-regional-caregiving-statistic',
      'list',
      {
        city,
        month,
        pageNumber,
        pageSize,
        state,
        year,
      },
    ],
    select: (response) => {
      return {
        ...response.body,
        items: response.body.items.map(
          (item) => new MonthlyRegionalCaregivingStatisticResource(item),
        ),
      }
    },
  })
  return data
}

export default useMonthlyRegionalCaregivingStatistics
