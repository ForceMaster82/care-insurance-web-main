import {useRouter} from 'next/router'

const useReceptionIdFromRouterQuery = (): string | null => {
  const router = useRouter()
  const receptionId =
    (typeof router.query.id === 'string' && router.query.id) || null

  return receptionId
}

export default useReceptionIdFromRouterQuery
