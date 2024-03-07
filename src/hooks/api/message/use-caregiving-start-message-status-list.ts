/* eslint-disable no-alert */
import {useQuery} from '@tanstack/react-query'
import {formatSearchQuery, getURLSearchParams} from '../../../utils/url'
import {SERVER_ERROR_MESSAGE} from '~constants/server-error'
import {
  CaregivingMessageSendingStatus,
  PaginationParams,
  SearchQueryParams,
} from '~types'
import {ICaregivingStartMessageStatus, IPaginationResponse} from '~types/dto'
import {fetcher, isLocalServerErrorType} from '~utils/fetcher'

type IProps = {
  date: string
  onSuccess?: (data: IPaginationResponse<ICaregivingStartMessageStatus>) => void
  sendingStatus: CaregivingMessageSendingStatus | null
} & PaginationParams &
  SearchQueryParams

const useCaregivingStartMessageStatusList = ({
  date,
  sendingStatus,
  searchCategory,
  searchKeyword,
  pageNumber,
  pageSize,
  onSuccess,
}: IProps): IPaginationResponse<ICaregivingStartMessageStatus> | undefined => {
  const searchQuery = formatSearchQuery(searchCategory, searchKeyword)
  const queryKeys = {
    date,
    pageNumber,
    pageSize,
    query: searchQuery,
    sendingStatus,
  }

  const queryParams = getURLSearchParams(queryKeys)

  const {data} = useQuery({
    keepPreviousData: true,
    onError: (error) => {
      if (error instanceof Error) {
        const errorType = isLocalServerErrorType(error.name)
        errorType && alert(SERVER_ERROR_MESSAGE[errorType])
      }
    },
    onSuccess,
    queryFn: () =>
      fetcher<IPaginationResponse<ICaregivingStartMessageStatus>>(
        `/api/v1/caregiving-start-message-statuses?${queryParams.toString()}`,
      ),
    queryKey: ['caregiving-start-message-status', 'list', queryKeys],
    select: (data) => data.body,
  })

  return data
}

export default useCaregivingStartMessageStatusList
