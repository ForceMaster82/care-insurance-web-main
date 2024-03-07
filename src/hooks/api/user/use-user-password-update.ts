/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'
import {IPasswordUpdate} from '../../../types/dto'
import {
  PASSWORD_CHANGE_SERVER_ERROR_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from '../../../constants/server-error'
import {MutationVariables} from '../../../types/fetch'

type PathParams = {
  userId: string
}

const useUserPasswordUpdate = (): UseMutationResult<
  unknown,
  unknown,
  MutationVariables<PathParams, unknown, IPasswordUpdate>,
  unknown
> => {
  return useMutation<
    unknown,
    Error,
    MutationVariables<PathParams, unknown, IPasswordUpdate>,
    unknown
  >(
    ({payload, pathParams}) =>
      fetcher(`/api/v1/users/${pathParams?.userId}/password`, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'PUT',
      }),
    {
      onError: (error) => {
        const errorName = isLocalServerErrorType(error.name)
        const errorMessage =
          (errorName &&
            (PASSWORD_CHANGE_SERVER_ERROR_MESSAGE[errorName] ||
              SERVER_ERROR_MESSAGE[errorName])) ||
          error.message

        alert(errorMessage)
      },
    },
  )
}

export default useUserPasswordUpdate
