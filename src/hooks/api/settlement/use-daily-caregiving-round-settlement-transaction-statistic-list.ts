import {useQuery} from '@tanstack/react-query'
import DailyCaregivingRoundSettlementTransactionStatisticResource from '~models/dto/daily-caregiving-round-settlement-transaction-statistic/Resource'
import {PaginationParams, SearchCategory} from '~types'
import {
    IDailyCaregivingRoundTransactionStatistic,
    IPaginationResponse,
} from '~types/dto'
import {fetcher} from '~utils/fetcher'
import {formatSearchQuery, getURLSearchParams} from "utils/url";

interface IProps extends PaginationParams {
    date: string,
    searchCategory: SearchCategory,
    searchKeyword: string,
}

const useDailyCaregivingRoundSettlementTransactionStatisticList = (
   /*date,
   pageNumber,
   pageSize,
   searchKeyword,
   searchCategory,*/
   props: IProps
): IPaginationResponse<DailyCaregivingRoundSettlementTransactionStatisticResource> | undefined => {
    const {
        date,
        pageNumber,
        pageSize,
        searchCategory,
        searchKeyword,
    } = props

    const searchQuery = formatSearchQuery(searchCategory, searchKeyword)
    //const qt = searchKeyword ? `query=${searchCategory}:${searchKeyword}` : '';

    const queryParams = getURLSearchParams([
        ...Object.entries({
            date,
            pageNumber,
            pageSize,
            query: searchQuery,
        }),
    ])

    const {data} = useQuery({
        keepPreviousData: true,
        queryFn: () =>
            fetcher<IPaginationResponse<IDailyCaregivingRoundTransactionStatistic>>(
                //`/api/v1/daily-caregiving-round-settlement-transaction-statistics?date=${date}&page-number=${pageNumber}&page-size=${pageSize}&${searchQuery}`,
                `/api/v1/daily-caregiving-round-settlement-transaction-statistics?${queryParams}`,
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
