/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'
import {IReceptionCreate} from '../../../types/dto'
import {IResponse, MutationVariables} from '../../../types/fetch'
import {SERVER_ERROR_MESSAGE} from '../../../constants/server-error'

const useReceptionCreate = (): UseMutationResult<
  IResponse<unknown>,
  Error,
  MutationVariables<undefined, undefined, IReceptionCreate>
> => {
  return useMutation<
    IResponse<unknown>,
    Error,
    MutationVariables<undefined, undefined, IReceptionCreate>
  >({
    mutationFn: ({payload}) =>
      fetcher('/api/v1/receptions', {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'POST',
      }),
    onError: (error) => {
      const errorType = isLocalServerErrorType(error.name)
      errorType && alert(SERVER_ERROR_MESSAGE[errorType])
    },
  })
}

export default useReceptionCreate
