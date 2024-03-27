import {useQuery, UseQueryResult} from '@tanstack/react-query'
import SettlementResource from '~models/dto/settlement/Resource'
import {
  PaginationParams,
  PeriodParams,
  SearchQueryParams,
} from '~types'
import {IPaginationResponse, ISettlement} from '~types/dto'
import {fetcher} from '~utils/fetcher'
import {formatSearchQuery, getURLSearchParams} from '~utils/url'

type IProps = {
  transactionDateFrom?: string
  transactionDateUntil?: string
} & Partial<PaginationParams> &
    SearchQueryParams &
    Partial<PeriodParams>

const useSettlementTransactionLog = ({
                             from,
                             searchCategory,
                             searchKeyword,
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
      query: searchQuery,
      transactionDateFrom,
      transactionDateUntil,
      until,
    }),
  ])

  return useQuery({
    keepPreviousData: true,
    queryFn: () =>
        fetcher<IPaginationResponse<ISettlement>>(
            `/api/v2/settlement/logTransaction?${queryParams.toString()}`,
        ),
    queryKey: [
      'settlement',
      'list',
      {
        from,
        pageNumber,
        pageSize,
        searchQuery,
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

export default useSettlementTransactionLog
