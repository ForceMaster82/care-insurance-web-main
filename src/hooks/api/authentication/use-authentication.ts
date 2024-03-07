import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {IToken, IUserCredential} from '../../../types/dto'
import {IResponse, MutationVariables} from '../../../types/fetch'
import {saveToken} from '../../../utils/manage-token'
import {fetcher} from '../../../utils/fetcher'

const useAuthentication = (): UseMutationResult<
  IResponse<IToken>,
  Error,
  MutationVariables<undefined, undefined, IUserCredential>,
  unknown
> => {
  return useMutation<
    IResponse<IToken>,
    Error,
    MutationVariables<undefined, undefined, IUserCredential>
  >({
    mutationFn: ({payload}) =>
      fetcher<IToken>(`/api/v1/authentications`, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'POST',
      }),
    onSuccess: (response) => {
      saveToken(response.body)
    },
  })
}

export default useAuthentication
