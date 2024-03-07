/* eslint-disable no-alert */
import {useQuery} from '@tanstack/react-query'
import {SERVER_ERROR_MESSAGE} from '~constants/server-error'
import SettlementTransactionResource from '~models/dto/settlement-transaction/Resource'
import {PaginationParams} from '~types'
import {IPaginationResponse, ISettlementTransaction} from '~types/dto'
import {fetcher, isLocalServerErrorType} from '~utils/fetcher'

type IProps = {
  settlementId: string
} & PaginationParams

const useSettlementTransactionList = ({
  settlementId,
  pageNumber,
  pageSize,
}: IProps): IPaginationResponse<SettlementTransactionResource> | undefined => {
  const {data} = useQuery({
    keepPreviousData: true,
    onError: (error) => {
      if (error instanceof Error) {
        const errorType = isLocalServerErrorType(error.name)
        errorType && alert(SERVER_ERROR_MESSAGE[errorType])
      }
    },
    queryFn: () =>
      fetcher<IPaginationResponse<ISettlementTransaction>>(
        `/api/v1/settlements/${settlementId}/transactions?page-number=${pageNumber}&page-size=${pageSize}`,
      ),
    queryKey: [
      'settlement-transaction',
      'list',
      {
        pageNumber,
        pageSize,
        settlementId,
      },
    ],
    select: (data) => {
      return {
        ...data.body,
        items: data.body.items.map(
          (item) => new SettlementTransactionResource(item),
        ),
      }
    },
  })

  return data
}

export default useSettlementTransactionList
