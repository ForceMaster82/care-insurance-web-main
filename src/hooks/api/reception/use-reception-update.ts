/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {IResponse, MutationVariables} from '../../../types/fetch'
import {IReceptionUpdate} from '../../../types/dto'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'
import {SERVER_ERROR_MESSAGE} from '~constants/server-error'

const useReceptionUpdate = (): UseMutationResult<
  IResponse<undefined>,
  Error,
  MutationVariables<
    {
      receptionId: string
    },
    undefined,
    IReceptionUpdate
  >,
  unknown
> => {
  return useMutation<
    IResponse<undefined>,
    Error,
    MutationVariables<{receptionId: string}, undefined, IReceptionUpdate>
  >({
    mutationFn: ({pathParams, payload}) =>
      fetcher(`/api/v1/receptions/${pathParams?.receptionId}`, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'PUT',
      }),
    onError: (error) => {
      const errorType = isLocalServerErrorType(error.name)
      errorType && alert(SERVER_ERROR_MESSAGE[errorType])
    },
  })
}

export default useReceptionUpdate
