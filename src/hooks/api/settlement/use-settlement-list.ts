import {useQuery, UseQueryResult} from '@tanstack/react-query'
import SettlementResource from '~models/dto/settlement/Resource'
import {
  PaginationParams,
  PeriodParams,
  SearchQueryParams,
  SettlementProgressingStatus,
  SortStandardType,
} from '~types'
import {IPaginationResponse, ISettlement} from '~types/dto'
import {fetcher} from '~utils/fetcher'
import {formatSearchQuery, getURLSearchParams} from '~utils/url'

type IProps = {
  progressingStatus: SettlementProgressingStatus
  sort?: SortStandardType | null
  transactionDateFrom?: string
  transactionDateUntil?: string
} & Partial<PaginationParams> &
  SearchQueryParams &
  Partial<PeriodParams>

const useSettlementList = ({
  from,
  progressingStatus,
  searchCategory,
  searchKeyword,
  sort = null,
  until,
  pageNumber,
  pageSize,
  transactionDateFrom,
  transactionDateUntil,
}: IProps): UseQueryResult<IPaginationResponse<SettlementResource>, Error> => {
  const searchQuery = formatSearchQuery(searchCategory, searchKeyword)

  const queryParams = getURLSearchParams([
    ...Object.entries({
      from,
      pageNumber,
      pageSize,
      progressingStatus,
      query: searchQuery,
      sort,
      transactionDateFrom,
      transactionDateUntil,
      until,
    }),
  ])

  return useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<ISettlement>>(
        `/api/v1/settlements?${queryParams.toString()}`,
      ),
    queryKey: [
      'settlement',
      'list',
      {
        from,
        pageNumber,
        pageSize,
        progressingStatus,
        searchQuery,
        sort,
        transactionDateFrom,
        transactionDateUntil,
        until,
      },
    ],
    select: (data) => {
      return {
        ...data.body,
        items: data.body.items.map((item) => new SettlementResource(item)),
      }
    },
  })
}

export default useSettlementList
