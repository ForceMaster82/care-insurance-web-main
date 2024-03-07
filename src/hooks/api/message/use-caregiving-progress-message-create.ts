/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {ICaregivingProgressMessageCreate} from '~types/dto'
import {IResponse, MutationVariables} from '~types/fetch'
import {fetcher} from '~utils/fetcher'

const useCaregivingProgressMessageCreate = (): UseMutationResult<
  IResponse<unknown>,
  Error,
  MutationVariables<undefined, undefined, ICaregivingProgressMessageCreate[]>
> => {
  const path = `/api/v1/caregiving-progress-messages`

  return useMutation<
    IResponse<unknown>,
    Error,
    MutationVariables<undefined, undefined, ICaregivingProgressMessageCreate[]>
  >({
    mutationFn: ({payload}) =>
      fetcher(path, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'POST',
      }),
  })
}

export default useCaregivingProgressMessageCreate
