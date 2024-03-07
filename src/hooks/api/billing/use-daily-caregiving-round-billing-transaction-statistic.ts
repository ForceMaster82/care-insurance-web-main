import {useQuery} from '@tanstack/react-query'
import DailyCaregivingRoundBillingTransactionStatisticResource from '~models/dto/daily-caregiving-round-billing-transaction-statistic/Resource'
import {PaginationParams} from '~types'
import {
  IDailyCaregivingRoundTransactionStatistic,
  IPaginationResponse,
} from '~types/dto'
import {fetcher} from '~utils/fetcher'

interface IProps extends PaginationParams {
  date: string
}

const useDailyCaregivingRoundBillingTransactionStatisticList = ({
  date,
  pageNumber,
  pageSize,
}: IProps):
  | IPaginationResponse<DailyCaregivingRoundBillingTransactionStatisticResource>
  | undefined => {
  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<IDailyCaregivingRoundTransactionStatistic>>(
        `/api/v1/daily-caregiving-round-billing-transaction-statistics?date=${date}&page-number=${pageNumber}&page-size=${pageSize}`,
      ),
    queryKey: [
      'daily-caregiving-round-billing-transaction-statistic',
      'list',
      {date, pageNumber, pageSize},
    ],
    select: (response) => {
      return {
        ...response.body,
        items: response.body.items.map(
          (item) =>
            new DailyCaregivingRoundBillingTransactionStatisticResource(item),
        ),
      }
    },
  })

  return data
}

export default useDailyCaregivingRoundBillingTransactionStatisticList
