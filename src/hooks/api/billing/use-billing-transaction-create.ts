/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'
import {IBillingTransactionCreate} from '../../../types/dto'
import {IResponse, MutationVariables} from '../../../types/fetch'
import {SERVER_ERROR_MESSAGE} from '../../../constants/server-error'

type PathParams = {billingId: string}

const useBillingTransactionCreate = (): UseMutationResult<
  IResponse<unknown>,
  Error,
  MutationVariables<PathParams, undefined, IBillingTransactionCreate>
> => {
  return useMutation<
    IResponse<unknown>,
    Error,
    MutationVariables<PathParams, undefined, IBillingTransactionCreate>
  >({
    mutationFn: ({pathParams, payload}) =>
      fetcher(`/api/v1/billings/${pathParams?.billingId}/transactions`, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'POST',
      }),
    onError: (error) => {
      const errorType = isLocalServerErrorType(error.name)
      errorType && alert(SERVER_ERROR_MESSAGE[errorType])
    },
  })
}

export default useBillingTransactionCreate
