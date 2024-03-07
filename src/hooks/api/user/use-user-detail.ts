/* eslint-disable no-magic-numbers */
import {useQuery} from '@tanstack/react-query'
import {fetcher} from '../../../utils/fetcher'
import UserResource from '../../../models/dto/user/Resource'
import {IUser} from '../../../types/dto'

interface IProps {
  userId?: string | null
}

const useUserDetail = ({userId}: IProps): UserResource | undefined => {
  const {data: user} = useQuery({
    enabled: Boolean(userId),
    queryFn: () => fetcher<IUser>(`/api/v1/users/${userId}`),
    queryKey: ['user', 'detail', {id: userId}],
    select: (response) => new UserResource(response.body),
  })

  return user
}

export default useUserDetail
