/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {SERVER_ERROR_MESSAGE} from '~constants/server-error'
import {ISettlementTransactionCreate} from '~types/dto'
import {IResponse, MutationVariables} from '~types/fetch'
import {fetcher, isLocalServerErrorType} from '~utils/fetcher'

interface IProps {
  settlementId: string
}

const useSettlementTransactionCreate = ({
  settlementId,
}: IProps): UseMutationResult<
  IResponse<unknown>,
  Error,
  MutationVariables<undefined, undefined, ISettlementTransactionCreate>
> => {
  const path = `/api/v1/settlements/${settlementId}/transactions`

  return useMutation<
    IResponse<unknown>,
    Error,
    MutationVariables<undefined, undefined, ISettlementTransactionCreate>
  >({
    mutationFn: ({payload}) =>
      fetcher(path, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'POST',
      }),
    onError: (error) => {
      const errorType = isLocalServerErrorType(error.name)
      errorType && alert(SERVER_ERROR_MESSAGE[errorType])
    },
  })
}

export default useSettlementTransactionCreate
