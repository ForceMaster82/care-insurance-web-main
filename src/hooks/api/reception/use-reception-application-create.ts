import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import {IResponse, MutationVariables} from '../../../types/fetch'
import {binaryfetcher} from '../../../utils/fetcher'

type PathParams = {
  receptionId: string
}

const useReceptionApplicationCreate = (): UseMutationResult<
  IResponse<undefined>,
  Error,
  MutationVariables<PathParams, undefined, FormData>,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation<
    IResponse<undefined>,
    Error,
    MutationVariables<PathParams, undefined, FormData>
  >({
    mutationFn: ({pathParams, payload}) => {
      return binaryfetcher(
        `/api/v1/receptions/${pathParams?.receptionId}/application`,
        {
          body: payload,
          method: 'POST',
        },
      )
    },
    onSuccess(data, variables) {
      queryClient.invalidateQueries({
        queryKey: [
          'reception-application',
          {receptionId: variables.pathParams?.receptionId},
        ],
      })
    },
  })
}

export default useReceptionApplicationCreate
