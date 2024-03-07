import {useQuery} from '@tanstack/react-query'
import {formatSearchQuery, getURLSearchParams} from '../../../utils/url'
import ReconciliationResource from '~models/dto/reconciliation/Resource'
import {
  PaginationParams,
  ReconciliationClosingStatus,
  SearchQueryParams,
} from '~types'
import {IPaginationResponse, IReconciliation} from '~types/dto'
import {fetcher} from '~utils/fetcher'

type IProps = {
  closingStatus: ReconciliationClosingStatus
  issuedAtFrom?: string
  issuedAtUntil?: string
  reconciledMonth?: number
  reconciledYear?: number
} & PaginationParams &
  Partial<SearchQueryParams>

const useReconciliationList = ({
  closingStatus,
  issuedAtFrom,
  issuedAtUntil,
  pageNumber,
  pageSize,
  searchCategory,
  searchKeyword,
  reconciledMonth,
  reconciledYear,
}: IProps): IPaginationResponse<ReconciliationResource> | undefined => {
  const searchQuery =
    (searchCategory &&
      searchKeyword &&
      formatSearchQuery(searchCategory, searchKeyword)) ||
    null

  const queryParams = getURLSearchParams([
    ...Object.entries({
      closingStatus,
      issuedAtFrom,
      issuedAtUntil,
      pageNumber,
      pageSize,
      query: searchQuery,
      reconciledMonth,
      reconciledYear,
    }),
  ])

  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<IReconciliation>>(
        `/api/v1/reconciliations?${queryParams.toString()}`,
      ),
    queryKey: [
      'reconciliation',
      'list',
      {
        closingStatus,
        issuedAtFrom,
        issuedAtUntil,
        pageNumber,
        pageSize,
        query: searchQuery,
        reconciledMonth,
        reconciledYear,
      },
    ],
    select: (data) => {
      return {
        ...data.body,
        items: data.body.items.map((item) => new ReconciliationResource(item)),
      }
    },
  })
  return data
}

export default useReconciliationList
