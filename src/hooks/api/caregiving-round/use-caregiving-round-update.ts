/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {SERVER_ERROR_MESSAGE} from '~constants/server-error'
import {IReceptionCaregivingRoundUpdate} from '~types/dto'
import {IResponse, MutationVariables} from '~types/fetch'
import {fetcher, isLocalServerErrorType} from '~utils/fetcher'

const useCaregivingRoundUpdate = (): UseMutationResult<
  IResponse<undefined>,
  Error,
  MutationVariables<
    {
      caregivingRoundId: string
    },
    undefined,
    IReceptionCaregivingRoundUpdate
  >,
  unknown
> => {
  return useMutation<
    IResponse<undefined>,
    Error,
    MutationVariables<
      {caregivingRoundId: string},
      undefined,
      IReceptionCaregivingRoundUpdate
    >
  >({
    mutationFn: ({pathParams, payload}) =>
      fetcher(`/api/v1/caregiving-rounds/${pathParams?.caregivingRoundId}`, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'PUT',
      }),
    onError: (error) => {
      const errorType = isLocalServerErrorType(error.name)
      errorType && alert(SERVER_ERROR_MESSAGE[errorType])
    },
  })
}

export default useCaregivingRoundUpdate
