import {useQuery} from '@tanstack/react-query'
import DailyCaregivingRoundSettlementTransactionStatisticResource from '~models/dto/daily-caregiving-round-settlement-transaction-statistic/Resource'
import {PaginationParams} from '~types'
import {
  IDailyCaregivingRoundTransactionStatistic,
  IPaginationResponse,
} from '~types/dto'
import {fetcher} from '~utils/fetcher'

interface IProps extends PaginationParams {
  date: string
}

const useDailyCaregivingRoundSettlementTransactionStatisticList = ({
  date,
  pageNumber,
  pageSize,
}: IProps):
  | IPaginationResponse<DailyCaregivingRoundSettlementTransactionStatisticResource>
  | undefined => {
  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IPaginationResponse<IDailyCaregivingRoundTransactionStatistic>>(
        `/api/v1/daily-caregiving-round-settlement-transaction-statistics?date=${date}&page-number=${pageNumber}&page-size=${pageSize}`,
      ),
    queryKey: [
      'daily-caregiving-round-settlement-transaction-statistic',
      'list',
      {date, pageNumber, pageSize},
    ],
    select: (response) => {
      return {
        ...response.body,
        items: response.body.items.map(
          (item) =>
            new DailyCaregivingRoundSettlementTransactionStatisticResource(
              item,
            ),
        ),
      }
    },
  })

  return data
}

export default useDailyCaregivingRoundSettlementTransactionStatisticList
