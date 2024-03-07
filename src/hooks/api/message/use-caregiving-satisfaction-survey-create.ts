/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {ICaregivingSatisfactionSurveyCreate} from '~types/dto'
import {IResponse, MutationVariables} from '~types/fetch'
import {fetcher} from '~utils/fetcher'

const useCaregivingSatisfactionSurveyCreate = (): UseMutationResult<
  IResponse<unknown>,
  Error,
  MutationVariables<undefined, undefined, ICaregivingSatisfactionSurveyCreate[]>
> => {
  const path = `/api/v1/caregiving-satisfaction-surveys`

  return useMutation<
    IResponse<unknown>,
    Error,
    MutationVariables<
      undefined,
      undefined,
      ICaregivingSatisfactionSurveyCreate[]
    >
  >({
    mutationFn: ({payload}) =>
      fetcher(path, {
        body: (payload && JSON.stringify(payload)) || null,
        method: 'POST',
      }),
  })
}

export default useCaregivingSatisfactionSurveyCreate
