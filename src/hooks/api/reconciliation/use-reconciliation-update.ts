/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {IResponse, MutationVariables} from '../../../types/fetch'
import {IReconciliationUpdate} from '../../../types/dto'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'

type Payload = IReconciliationUpdate[]

const useReconciliationUpdate = (): UseMutationResult<
  IResponse<undefined>,
  Error,
  MutationVariables<undefined, undefined, Payload>
> => {
  return useMutation<
    IResponse<undefined>,
    Error,
    MutationVariables<undefined, undefined, Payload>
  >({
    mutationFn: ({payload}) =>
      fetcher('/api/v1/reconciliations', {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'PATCH',
      }),
    onError: (error) => {
      const errorType = isLocalServerErrorType(error.name)
      errorType && alert(error.message)
    },
  })
}

export default useReconciliationUpdate
