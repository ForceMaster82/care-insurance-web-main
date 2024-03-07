import {useQuery} from '@tanstack/react-query'
import MonthlyReconciliationStatisticResource from '~models/dto/monthly-reconciliation-statistic/Resource'
import {IMonthlyReconciliationStatistic} from '~types/dto'
import {fetcher} from '~utils/fetcher'

interface IProps {
  month: number
  year: number
}

const useMonthlyReconciliationStatistic = ({
  year,
  month,
}: IProps): MonthlyReconciliationStatisticResource | undefined => {
  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IMonthlyReconciliationStatistic[]>(
        `/api/v1/monthly-reconciliation-statistics?year=${year}&month=${month}`,
      ),
    queryKey: ['monthly-reconciliation-statistic', {month, year}],
    select: (response) =>
      response.body.length > 0
        ? new MonthlyReconciliationStatisticResource(response.body[0])
        : undefined,
  })

  return data
}

export default useMonthlyReconciliationStatistic
