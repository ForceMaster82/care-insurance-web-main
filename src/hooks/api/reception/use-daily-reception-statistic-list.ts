import {useQuery} from '@tanstack/react-query'
import DailyReceptionStatisticResource from '~models/dto/daily-reception-statistic/Resource'
import {IDailyReceptionStatistic} from '~types/dto'
import {fetcher} from '~utils/fetcher'

interface IProps {
  from: string
  until: string
}

const useDailyReceptionStatisticList = ({
  from,
  until,
}: IProps): DailyReceptionStatisticResource[] | undefined => {
  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IDailyReceptionStatistic[]>(
        `/api/v1/daily-reception-statistics?from=${from}&until=${until}`,
      ),
    queryKey: ['daily-reception-statistic', 'list', {from, until}],
    select: (response) =>
      response.body.length > 0
        ? response.body.map((item) => new DailyReceptionStatisticResource(item))
        : [],
  })
  return data
}

export default useDailyReceptionStatisticList
