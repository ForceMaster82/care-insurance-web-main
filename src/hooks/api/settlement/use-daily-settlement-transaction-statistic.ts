import {useQuery} from '@tanstack/react-query'
import DailySettlementTransactionStatisticResource from '~models/dto/daily-settlement-transaction-statistic/Resource'
import {IDailyTransactionStatistic} from '~types/dto'
import {fetcher} from '~utils/fetcher'

interface IProps {
  date: string,
  searchCategory: string,
  searchKeyword: string,
}

const useDailySettlementTransactionStatistic = ({
  date,
  searchKeyword,
  searchCategory,
}: IProps): DailySettlementTransactionStatisticResource | undefined => {
  const qt = searchKeyword ? `query=${searchCategory}:${searchKeyword}` : '';

  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IDailyTransactionStatistic[]>(
        `/api/v1/daily-settlement-transaction-statistics?date=${date}&${qt}`,
      ),
    queryKey: ['daily-settlement-transaction-statistic', {date}],
    select: (response) =>
      response.body.length > 0
        ? new DailySettlementTransactionStatisticResource(response.body[0])
        : undefined,
  })

  return data
}

export default useDailySettlementTransactionStatistic
