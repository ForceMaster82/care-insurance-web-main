import React, {ReactElement} from 'react'
import {Box, Button, Checkbox, ComboBox, Typography} from '@caredoc/ui-web'
import {ReceptionsPageSearchFilterKey, SearchCategory} from '../../types'
import {IPaginationResponse} from '../../types/dto'
import Pagination from '../../components/Pagination'
import ReceptionListResource from '../../models/dto/reception/ListResource'
import SearchPeriodPicker from '../../components/SearchPeriodPicker'
import {
  caregivingManagerOrganizationTypeFilters,
  receptionSearchCategories,
  SEARCH_COMBOBOX_WIDTH,
} from '../../constants'
import SearchBox from '../../components/SearchBox'
import {SearchFilter} from '../../stores/SearchFilterStore'
import SearchFilterTitleWrapper from '../../components/SearchFilterTitleWrapper'
import SearchResult from './components/SearchResult'
import ReceivedPreiodSelection, {
  OptionValue,
  Period,
} from './components/ReceivedPreiodSelection'
import SearchResultCount from '~components/SearchResultCount'

interface IProps {
  data: IPaginationResponse<ReceptionListResource>
  onChangePageNumber: (pageNumber: number) => void
  onChangeSearchFilter: <K extends ReceptionsPageSearchFilterKey>(
    key: K,
  ) => (value: SearchFilter[K]) => void
  onClickListItem: (receptionId: string) => void
  onClickRegister: () => void
  searchFilter: Pick<SearchFilter, ReceptionsPageSearchFilterKey>
}

const ReceptionsView = (props: IProps): ReactElement => {
  const {
    onClickListItem,
    onClickRegister,
    data,
    onChangePageNumber,
    searchFilter,
    onChangeSearchFilter,
  } = props

  const handleOnTogglePeriodTypeFilter = (): void => {
    onChangeSearchFilter('PERIOD_TYPE')(
      searchFilter.PERIOD_TYPE ? null : 'SHORT',
    )
  }

  const handleOnToggleUrgencyFilter = (): void => {
    onChangeSearchFilter('URGENCY')(searchFilter.URGENCY ? null : 'URGENT')
  }

  const handleOnToggleExclueCompleted = (): void => {
    onChangeSearchFilter('EXCLUDE_COMPLETED')(searchFilter.EXCLUDE_COMPLETED ? null : 'COMPLETED')
  }

  const handleOnToggleCanceledReception = (): void => {
    onChangeSearchFilter('CANCELED_RECEPTION')(searchFilter.CANCELED_RECEPTION ? null : 'CANCEL')
  }

  const handleOnClickSearch = (
    category: SearchCategory,
    keyword: string,
  ): void => {
    onChangeSearchFilter('SEARCH_CATEGORY')(category)
    onChangeSearchFilter('SEARCH_KEYWORD')(keyword)
  }

  const handleOnChangeReceivedPeriod = (
    option: OptionValue,
    period: Period,
  ): void => {
    onChangeSearchFilter('RECEIVED_PERIOD')(option)
    onChangeSearchFilter('FROM')(period.startDate)
    onChangeSearchFilter('UNTIL')(period.endDate)
  }

  const handleOnChangeFromUntil =
    (key: 'FROM' | 'UNTIL') =>
    (value: string): void => {
      onChangeSearchFilter(key)(value)
      onChangeSearchFilter('RECEIVED_PERIOD')(null)
    }

  return (
    <Box gap="lg" px="sm" py="lg">
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box gap="xs">
          <Box alignItems="center" flexDirection="row" gap="xs">
            <SearchPeriodPicker
              endDateString={searchFilter.UNTIL}
              onChangeEndDate={handleOnChangeFromUntil('UNTIL')}
              onChangeStartDate={handleOnChangeFromUntil('FROM')}
              required
              startDateString={searchFilter.FROM}
              title="접수일자"
            />
            <ReceivedPreiodSelection
              onChange={handleOnChangeReceivedPeriod}
              value={searchFilter.RECEIVED_PERIOD}
            />
          </Box>
          <SearchFilterTitleWrapper title="구분">
            <Box alignItems="center" flexDirection="row" gap="md">
              <Box width={SEARCH_COMBOBOX_WIDTH}>
                <ComboBox
                  items={caregivingManagerOrganizationTypeFilters}
                  onSelect={onChangeSearchFilter('ORGANIZATION_TYPE')}
                  size="sm"
                  value={searchFilter.ORGANIZATION_TYPE}
                />
              </Box>
              <Box alignItems="center" flexDirection="row" gap="sm">
                <Checkbox
                  color="primary"
                  onClick={handleOnToggleUrgencyFilter}
                  size="sm"
                  value={searchFilter.URGENCY === 'URGENT'}
                >
                  <Typography textColor="fontPrimary" variant="body3">
                    긴급
                  </Typography>
                </Checkbox>
                <Checkbox
                  color="primary"
                  onClick={handleOnTogglePeriodTypeFilter}
                  size="sm"
                  value={searchFilter.PERIOD_TYPE === 'SHORT'}
                >
                  <Typography textColor="fontPrimary" variant="body3">
                    단기
                  </Typography>
                </Checkbox>
                <Checkbox
                  color="primary"
                  onClick={handleOnToggleCanceledReception}
                  size="sm"
                  value={searchFilter.CANCELED_RECEPTION === 'CANCEL'}
                >
                  <Typography textColor="fontPrimary" variant="body3">
                    취소
                  </Typography>
                </Checkbox>
                <Checkbox
                    color="primary"
                    onClick={handleOnToggleExclueCompleted}
                    size="sm"
                    value={searchFilter.EXCLUDE_COMPLETED === 'COMPLETED'}
                >
                  <Typography textColor="fontPrimary" variant="body3">
                    완료
                  </Typography>
                </Checkbox>
              </Box>
            </Box>
          </SearchFilterTitleWrapper>
        </Box>
        <SearchBox
          categoryOptions={receptionSearchCategories}
          defaultCategory={searchFilter.SEARCH_CATEGORY}
          defaultKeyword={searchFilter.SEARCH_KEYWORD}
          onClickSearch={handleOnClickSearch}
        />
      </Box>
      <Box gap="sm">
        <Box gap="xs">
          <Box
            alignItems="flex-end"
            flexDirection="row"
            justifyContent="space-between"
          >
            <SearchResultCount searchResultTotalCount={data.totalItemCount} />
            <Button
              color="primary"
              onClick={onClickRegister}
              size="sm"
              variant="primary"
            >
              접수 등록
            </Button>
          </Box>
          <SearchResult data={data} onClickListItem={onClickListItem} />
        </Box>
        {data.totalItemCount > 0 && (
          <Box alignSelf="center">
            <Pagination
              currentPageNumber={data.currentPageNumber}
              lastPageNumber={data.lastPageNumber}
              onClick={onChangePageNumber}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ReceptionsView
