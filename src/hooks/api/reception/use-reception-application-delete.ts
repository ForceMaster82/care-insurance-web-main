import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query'
import {IResponse, MutationVariables} from '../../../types/fetch'
import {fetcher} from '../../../utils/fetcher'

type PathParams = {
  receptionId: string
}

const useReceptionApplicationDelete = (): UseMutationResult<
  IResponse<undefined>,
  Error,
  MutationVariables<PathParams>,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation<
    IResponse<undefined>,
    Error,
    MutationVariables<PathParams>
  >({
    mutationFn: ({pathParams}) => {
      return fetcher(
        `/api/v1/receptions/${pathParams?.receptionId}/application`,
        {
          method: 'DELETE',
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

export default useReceptionApplicationDelete
