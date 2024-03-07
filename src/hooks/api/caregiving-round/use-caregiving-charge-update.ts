/* eslint-disable no-alert */
import {useMutation, UseMutationResult} from '@tanstack/react-query'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'
import {IResponse, MutationVariables} from '../../../types/fetch'
import {ICaregivingChargeUpdate} from '../../../types/dto'

const useCaregivingChargeUpdate = (): UseMutationResult<
  IResponse<undefined>,
  Error,
  MutationVariables<
    {
      caregivingRoundId: string
    },
    undefined,
    ICaregivingChargeUpdate
  >,
  unknown
> => {
  return useMutation<
    IResponse<undefined>,
    Error,
    MutationVariables<
      {caregivingRoundId: string},
      undefined,
      ICaregivingChargeUpdate
    >
  >({
    mutationFn: ({pathParams, payload}) =>
      fetcher(
        `/api/v1/caregiving-rounds/${pathParams?.caregivingRoundId}/caregiving-charge`,
        {
          body: (payload && JSON.stringify(payload)) || null,
          method: 'PUT',
        },
      ),
    onError: (error) => {
      const errorType = isLocalServerErrorType(error.name)
      errorType && alert(error.message)
    },
  })
}

export default useCaregivingChargeUpdate
