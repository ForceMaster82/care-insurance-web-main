import {useQuery, UseQueryResult} from '@tanstack/react-query'
import {IFilteredUser} from '../../../types/dto'
import {fetcher} from '../../../utils/fetcher'

interface IProps {
  email?: string
}

const useUserFiltered = ({
  email,
}: IProps): UseQueryResult<IFilteredUser | undefined, Error> => {
  return useQuery({
    enabled: false,
    queryFn: () => fetcher<IFilteredUser[]>(`/api/v1/users?email=${email}`),
    queryKey: ['user', 'filtered', {email: email}],
    select: (response) => response.body.at(0),
  })
}

export default useUserFiltered
