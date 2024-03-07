import {useQuery} from '@tanstack/react-query'
import DailyBillingTransactionStatisticResource from '~models/dto/daily-billing-transaction-statistic/Resource'

import {IDailyTransactionStatistic} from '~types/dto'
import {fetcher} from '~utils/fetcher'

interface IProps {
  date: string
}

const useDailyBillingTransactionStatistic = ({
  date,
}: IProps): DailyBillingTransactionStatisticResource | undefined => {
  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IDailyTransactionStatistic[]>(
        `/api/v1/daily-billing-transaction-statistics?date=${date}`,
      ),
    queryKey: ['daily-billing-transaction-statistic', {date}],
    select: (response) =>
      response.body.length > 0
        ? new DailyBillingTransactionStatisticResource(response.body[0])
        : undefined,
  })

  return data
}

export default useDailyBillingTransactionStatistic
