/* eslint-disable no-alert */
import {useQuery} from '@tanstack/react-query'
import {formatSearchQuery, getURLSearchParams} from '../../../utils/url'
import {SERVER_ERROR_MESSAGE} from '~constants/server-error'
import {
  CaregivingMessageSendingStatus,
  PaginationParams,
  SearchQueryParams,
} from '~types'
import {ICaregivingProgressMessageStatus, IPaginationResponse} from '~types/dto'
import {fetcher, isLocalServerErrorType} from '~utils/fetcher'

type IProps = {
  date: string
  onSuccess?: (
    data: IPaginationResponse<ICaregivingProgressMessageStatus>,
  ) => void
  sendingStatus: CaregivingMessageSendingStatus | null
} & PaginationParams &
  SearchQueryParams

const useCaregivingProgressMessageStatusList = ({
  date,
  sendingStatus,
  searchCategory,
  searchKeyword,
  pageNumber,
  onSuccess,
  pageSize,
}: IProps):
  | IPaginationResponse<ICaregivingProgressMessageStatus>
  | undefined => {
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
      fetcher<IPaginationResponse<ICaregivingProgressMessageStatus>>(
        `/api/v1/caregiving-progress-message-statuses?${queryParams.toString()}`,
      ),
    queryKey: ['caregiving-progress-message-status', 'list', queryKeys],
    select: (data) => data.body,
  })

  return data
}

export default useCaregivingProgressMessageStatusList
