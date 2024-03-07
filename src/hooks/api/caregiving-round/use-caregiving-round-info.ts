import {useQuery} from '@tanstack/react-query'
import CaregivingRoundInfoResource from '~models/dto/caregiving-round-info/Resource'
import {ICaregivingRoundInfo} from '~types/dto'
import {fetcher} from '~utils/fetcher'

interface IProps {
  caregivingRoundId: string
  onSuccess?: (data: CaregivingRoundInfoResource) => void
}

const useCaregivingRoundInfo = ({
  caregivingRoundId,
  onSuccess,
}: IProps): CaregivingRoundInfoResource | undefined => {
  const {data} = useQuery({
    onSuccess,
    queryFn: () =>
      fetcher<ICaregivingRoundInfo>(
        `/api/v1/caregiving-rounds/${caregivingRoundId}`,
      ),
    queryKey: ['caregiving-round-info', {caregivingRoundId}],
    select: (response) => new CaregivingRoundInfoResource(response.body),
  })
  return data
}

export default useCaregivingRoundInfo
