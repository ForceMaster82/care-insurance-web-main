import {useQuery} from '@tanstack/react-query'
import DailySettlementTransactionStatisticResource from '~models/dto/daily-settlement-transaction-statistic/Resource'
import {IDailyTransactionStatistic} from '~types/dto'
import {fetcher} from '~utils/fetcher'
import {SearchCategory} from "types";
import {formatSearchQuery, getURLSearchParams} from "utils/url";

interface IProps {
  date: string,
  searchCategory: SearchCategory,
  searchKeyword: string,
}

const useDailySettlementTransactionStatistic = (
  props: IProps
): DailySettlementTransactionStatisticResource | undefined => {
  const {
    date,
    searchCategory,
    searchKeyword,
  } = props

  const searchQuery = formatSearchQuery(searchCategory, searchKeyword)

  const queryParams = getURLSearchParams([
    ...Object.entries({
      date,
      query: searchQuery,
    }),
  ])

  const {data} = useQuery({
    keepPreviousData: true,
    queryFn: () =>
      fetcher<IDailyTransactionStatistic[]>(
        `/api/v1/daily-settlement-transaction-statistics?${queryParams}`,
      ),
    queryKey: ['daily-settlement-transaction-statistic', {date},],
    select: (response) =>
      response.body.length > 0
        ? new DailySettlementTransactionStatisticResource(response.body[0])
        : undefined,
  })

  return data
}

export default useDailySettlementTransactionStatistic
