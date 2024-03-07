/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {MutationVariables} from '../../../types/fetch'

type PathParams = {
  userId: string
}

const useUserAuthenticationCode = (): UseMutationResult<
  unknown,
  Error,
  MutationVariables<PathParams>,
  unknown
> => {
  return useMutation<unknown, Error, MutationVariables<PathParams>, unknown>(
    ({pathParams}) =>
      fetcher(`/api/v1/users/${pathParams?.userId}/authentication-code`, {
        method: 'PUT',
      }),
    {
      onError: (error) => {
        alert(error.message)
      },
      onSuccess: () => {
        alert('인증 메일이 발송되었습니다.')
      },
    },
  )
}

export default useUserAuthenticationCode
