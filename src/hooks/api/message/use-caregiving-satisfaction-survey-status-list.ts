/* eslint-disable no-alert */
import {useQuery} from '@tanstack/react-query'
import {formatSearchQuery, getURLSearchParams} from '../../../utils/url'
import {SERVER_ERROR_MESSAGE} from '~constants/server-error'
import {PaginationParams, SearchQueryParams} from '~types'
import {
  ICaregivingSatisfactionSurveyStatus,
  IPaginationResponse,
} from '~types/dto'
import {fetcher, isLocalServerErrorType} from '~utils/fetcher'

type IProps = {
  date: string
  onSuccess?: (
    data: IPaginationResponse<ICaregivingSatisfactionSurveyStatus>,
  ) => void
} & PaginationParams &
  SearchQueryParams

const useCaregivingSatisfactionSurveyStatusList = ({
  date,
  searchCategory,
  searchKeyword,
  pageNumber,
  pageSize,
  onSuccess,
}: IProps):
  | IPaginationResponse<ICaregivingSatisfactionSurveyStatus>
  | undefined => {
  const searchQuery = formatSearchQuery(searchCategory, searchKeyword)
  const queryKeys = {
    date,
    pageNumber,
    pageSize,
    query: searchQuery,
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
      fetcher<IPaginationResponse<ICaregivingSatisfactionSurveyStatus>>(
        `/api/v1/caregiving-satisfaction-survey-statuses?${queryParams.toString()}`,
      ),
    queryKey: ['caregiving-satisfaction-survey-status', 'list', queryKeys],
    select: (data) => data.body,
  })

  return data
}

export default useCaregivingSatisfactionSurveyStatusList
