import {useQuery} from '@tanstack/react-query'
import BillingResource from '~models/dto/billing/Resource'
import {
  BillingProgressingStatus,
  PaginationParams,
  SearchQueryParams,
  SortStandardType,
} from '~types'
import {IBilling, IPaginationResponse} from '~types/dto'
import {fetcher} from '~utils/fetcher'
import {
  formatSearchQuery,
  getURLSearchParams,
  transformProgressingStatusFilterToQueryData,
} from '~utils/url'

type IProps = {
  billingDateFrom?: string
  billingDateUntil?: string
  progressingStatus: BillingProgressingStatus[]
  sort?: SortStandardType
  transactionDateFrom?: string
  transactionDateUntil?: string
  usedPeriodFrom?: string
  usedPeriodUntil?: string
} & PaginationParams &
  SearchQueryParams

const useBillingList = ({
  billingDateFrom,
  billingDateUntil,
  pageNumber,
  pageSize,
  progressingStatus,
  usedPeriodFrom,
  usedPeriodUntil,
  searchCategory,
  searchKeyword,
  transactionDateFrom,
  transactionDateUntil,
  sort,
}: IProps): IPaginationResponse<BillingResource> | undefined => {
  const searchQuery = formatSearchQuery(searchCategory, searchKeyword)
  const searchFilterQueryData = transformProgressingStatusFilterToQueryData({
    PROGRESSING_STATUS: progressingStatus,
  })
  const queryParams = getURLSearchParams([
    ...Object.entries({
      billingDateFrom,
      billingDateUntil,
      pageNumber,
      pageSize,
      query: searchQuery,
      sort,
      transactionDateFrom,
      transactionDateUntil,
      usedPeriodFrom,
      usedPeriodUntil,
    }),
    ...searchFilterQueryData,
  ])
  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<IBilling>>(
        `/api/v1/billings?${queryParams.toString()}`,
      ),
    queryKey: [
      'billing',
      'list',
      {
        billingDateFrom,
        billingDateUntil,
        pageNumber,
        pageSize,
        progressingStatus,
        query: searchQuery,
        sort,
        transactionDateFrom,
        transactionDateUntil,
        usedPeriodFrom,
        usedPeriodUntil,
      },
    ],
    select: (data) => {
      return {
        ...data.body,
        items: data.body.items.map((item) => new BillingResource(item)),
      }
    },
  })
  return data
}

export default useBillingList
