/* eslint-disable no-alert */
import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {fetcher, isLocalServerErrorType} from '../../../utils/fetcher'
import {ICaregivingCharge} from '../../../types/dto'
import CaregivingChargeResource from '../../../models/dto/caregiving-charge/Resource'

interface IProps {
  caregivingRoundId: string | null
  onSuccess?: (data: CaregivingChargeResource) => void
}

const useCaregivingChargeDetail = ({
  caregivingRoundId,
  onSuccess,
}: IProps): UseQueryResult<CaregivingChargeResource> => {
  return useQuery({
    enabled: Boolean(caregivingRoundId),
    onError: (error) => {
      if (error instanceof Error) {
        const errorType = isLocalServerErrorType(error.name)
        errorType && alert(error.message)
      }
    },
    onSuccess,
    queryFn: () =>
      fetcher<ICaregivingCharge>(
        `/api/v1/caregiving-rounds/${caregivingRoundId}/caregiving-charge`,
      ),
    queryKey: ['caregiving-charge', 'detail', {caregivingRoundId}],
    select: (response) => new CaregivingChargeResource(response.body),
  })
}

export default useCaregivingChargeDetail
