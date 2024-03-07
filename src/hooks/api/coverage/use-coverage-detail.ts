import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import {ICoverage} from '../../../types/dto'
import CoverageResource from '../../../models/dto/coverage/Resource'

interface IProps {
  coverageId?: string | null
}

const useCoverageDetail = ({
  coverageId,
}: IProps): CoverageResource | undefined => {
  const {data} = useQuery({
    enabled: Boolean(coverageId),
    queryFn: () => fetcher<ICoverage>(`/api/v1/coverages/${coverageId}`),
    queryKey: ['coverage', 'detail', {id: coverageId}],
    select: (response) => new CoverageResource(response.body),
  })

  return data
}

export default useCoverageDetail
