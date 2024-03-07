/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {ICaregivingStartMessageCreate} from '~types/dto'
import {IResponse, MutationVariables} from '~types/fetch'
import {fetcher} from '~utils/fetcher'

const useCaregivingStartMessageCreate = (): UseMutationResult<
  IResponse<unknown>,
  Error,
  MutationVariables<undefined, undefined, ICaregivingStartMessageCreate[]>
> => {
  const path = `/api/v1/caregiving-start-messages`

  return useMutation<
    IResponse<unknown>,
    Error,
    MutationVariables<undefined, undefined, ICaregivingStartMessageCreate[]>
  >({
    mutationFn: ({payload}) =>
      fetcher(path, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'POST',
      }),
  })
}

export default useCaregivingStartMessageCreate
