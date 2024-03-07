/* eslint-disable no-magic-numbers */
import {useQuery} from '@tanstack/react-query'
import {IExternalCaregivingOrganization} from '../../../types/dto'
import {fetcher} from '../../../utils/fetcher'

interface IProps {
  externalCaregivingOrganizationId?: string | null
}

const useExternalCaregivingOrganization = ({
  externalCaregivingOrganizationId,
}: IProps): IExternalCaregivingOrganization | undefined => {
  const {data: response} = useQuery({
    enabled:
      Boolean(externalCaregivingOrganizationId) &&
      externalCaregivingOrganizationId !== 'CAREDOC',
    queryFn: () =>
      fetcher<IExternalCaregivingOrganization>(
        `/api/v1/external-caregiving-organizations/${externalCaregivingOrganizationId}`,
      ),
    queryKey: [
      'external-caregiving-organizations',
      'detail',
      {id: externalCaregivingOrganizationId},
    ],
  })

  return response?.body
}

export default useExternalCaregivingOrganization
