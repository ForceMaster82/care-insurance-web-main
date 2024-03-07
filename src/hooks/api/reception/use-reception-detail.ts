/* eslint-disable no-alert */
import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'
import {IReception} from '../../../types/dto'
import ReceptionResource from '../../../models/dto/reception/Resource'
import {SERVER_ERROR_MESSAGE} from '../../../constants/server-error'
import {getURLSearchParams} from '../../../utils/url'

type UnmaskedProperty =
  | 'PATIENT_NAME'
  | 'PATIENT_PRIMARY_PHONE_NUMBER'
  | 'PATIENT_SECONDARY_PHONE_NUMBER'

interface IProps {
  enabled?: boolean
  onSuccess?: (data: ReceptionResource) => void
  receptionId?: string | null
  suspense?: boolean
  unmaskedProperty?: UnmaskedProperty[]
}

const useReceptionDetail = ({
  receptionId,
  unmaskedProperty,
  suspense = false,
  enabled,
  onSuccess,
}: IProps): UseQueryResult<ReceptionResource | undefined> => {
  const unmaskedPropertyQueryData: ['unmasked-property', UnmaskedProperty][] =
    unmaskedProperty?.map((item) => ['unmasked-property', item]) || []
  const queryParams =
    unmaskedPropertyQueryData && getURLSearchParams(unmaskedPropertyQueryData)

  return useQuery({
    enabled: Boolean(receptionId) && enabled,
    onError: (error) => {
      if (error instanceof Error) {
        const errorType = isLocalServerErrorType(error.name)
        errorType && alert(SERVER_ERROR_MESSAGE[errorType])
      }
    },
    onSuccess,
    queryFn: () =>
      fetcher<IReception>(
        `/api/v1/receptions/${receptionId}?${queryParams.toString()}`,
      ),
    queryKey: ['reception', 'detail', {id: receptionId, unmaskedProperty}],
    select: (response) => new ReceptionResource(response.body),
    suspense,
  })
}

export default useReceptionDetail
