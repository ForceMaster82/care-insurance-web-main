import React, {useEffect, useState} from 'react'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Loading} from '@caredoc/templates-web'
import {observer} from 'mobx-react-lite'
import {stringify} from 'qs'
import {reaction, toJS} from 'mobx'
import {isServer} from '@caredoc/utils-web'
import Layout from '../../templates/layouts/Layout'
import usePagination from '../../hooks/use-pagination'
import useReceptionList from '../../hooks/api/reception/use-reception-list'
import {DEFAULT_PAGE_SIZE} from '../../constants/data'
import {
    Cancel,
    CaregivingManagerOrganizationTypeFilterType, Completed,
    PeriodType,
    ReceptionsPageSearchFilterKey,
    SearchCategory,
    Urgency,
} from '../../types'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import SearchFilterStore, {SearchFilter} from '../../stores/SearchFilterStore'
import {formatDate, getToday} from '../../utils/date'
import {OptionValue as ReceivedPeriodOptionValue} from '../../views/receptions/components/ReceivedPreiodSelection'
import ReceptionsView from '~views/receptions'

const ReceptionsPage: NextPage = observer(() => {
  const pageQuery = isServer() ? null : new URL(document.URL).searchParams
  const pageNumberQueryValue = pageQuery?.get('page-number')
  const organizationTypeQueryValue = pageQuery?.get('organization-type') as
    | CaregivingManagerOrganizationTypeFilterType
    | undefined
  const periodTypeQueryValue = pageQuery?.get('period-type') as
    | PeriodType
    | undefined
  const searchCategoryQueryValue = pageQuery?.get('search-category') as
    | SearchCategory
    | undefined
  const urgencyQueryValue = pageQuery?.get('urgency') as Urgency | undefined
  const cancelQueryValue = pageQuery?.get('canceled-reception') as Cancel | undefined
  const completedQueryValue = pageQuery?.get('exclude-completed') as Completed | undefined
  const receivedPeriod = pageQuery?.get('received-period') as
    | ReceivedPeriodOptionValue
    | undefined

  const router = useRouter()

  const {pageNumber, setPageNumber, resetPageNumber} = usePagination(
    pageNumberQueryValue ? Number(pageNumberQueryValue) : null,
  )

  const [searchFilterStore] = useState(
    () =>
      new SearchFilterStore<ReceptionsPageSearchFilterKey>({
        /*CANCELED_RECEPTION:
          pageQuery?.get('canceled-reception') !==
          'false',
        EXCLUDE_COMPLETED:
          pageQuery?.get('exclude-completed') !==
          'false',*/
        CANCELED_RECEPTION: cancelQueryValue || null,
        EXCLUDE_COMPLETED: completedQueryValue || null,
        FROM: pageQuery?.get('from') || formatDate(getToday()),
        ORGANIZATION_TYPE: organizationTypeQueryValue || null,
        PERIOD_TYPE: periodTypeQueryValue || null,
        RECEIVED_PERIOD: receivedPeriod || null,
        SEARCH_CATEGORY: searchCategoryQueryValue || 'patientName',
        SEARCH_KEYWORD: pageQuery?.get('search-keyword') || '',
        UNTIL: pageQuery?.get('until') || formatDate(getToday()),
        URGENCY: urgencyQueryValue || null,
      }),
  )

  const receptionListData = useReceptionList({
    caregivingManagerAssigned:
      searchFilterStore.searchFilter.ORGANIZATION_TYPE === null
        ? null
        : searchFilterStore.searchFilter.ORGANIZATION_TYPE !==
          'CAREGIVING_MANAGER_NOT_ASSIGNED',
    from: searchFilterStore.searchFilter.FROM,
    organizationType:
      searchFilterStore.searchFilter.ORGANIZATION_TYPE ===
      'CAREGIVING_MANAGER_NOT_ASSIGNED'
        ? null
        : searchFilterStore.searchFilter.ORGANIZATION_TYPE,
    pageNumber,
    pageSize: DEFAULT_PAGE_SIZE,
    periodType: searchFilterStore.searchFilter.PERIOD_TYPE,
    progressingStatusFilter:
      (searchFilterStore.searchFilter.CANCELED_RECEPTION && searchFilterStore.searchFilter.EXCLUDE_COMPLETED &&[
          'CANCELED',
          'CANCELED_BY_PERSONAL_CAREGIVER',
          'CANCELED_BY_MEDICAL_REQUEST',
          'CANCELED_WHILE_MATCHING',
          'COMPLETED',
      ]) ||
      (searchFilterStore.searchFilter.CANCELED_RECEPTION && [
        'CANCELED',
        'CANCELED_BY_PERSONAL_CAREGIVER',
        'CANCELED_BY_MEDICAL_REQUEST',
        'CANCELED_WHILE_MATCHING',
      ]) ||
      (searchFilterStore.searchFilter.EXCLUDE_COMPLETED && [
          'COMPLETED',
      ]) ||
      [],
    searchCategory: searchFilterStore.searchFilter.SEARCH_CATEGORY,
    searchKeyword: searchFilterStore.searchFilter.SEARCH_KEYWORD,
    until: searchFilterStore.searchFilter.UNTIL,
    urgency: searchFilterStore.searchFilter.URGENCY,
  })

  const handleOnClickRegister = (): void => {
    router.push(RECEPTIONS_PATH.REGISTRATION())
  }

  const handleOnClickSearchResultListItem = (receptionId: string): void => {
    const query = stringify(
      {
        ...searchFilterStore.toQueryData(),
        'page-number': pageNumber,
      },
      {arrayFormat: 'repeat'},
    )

    router.replace({query}, undefined, {shallow: true})
    router.push(RECEPTIONS_PATH.DETAIL(receptionId))
  }

  const handleOnChangeSearchFilter =
    <K extends ReceptionsPageSearchFilterKey>(key: K) =>
    (value: SearchFilter[K]) => {
      searchFilterStore.set(key, value)
    }

  useEffect(() => {
    const dispose = reaction(
      () => toJS(searchFilterStore.searchFilter),
      () => {
        resetPageNumber()
      },
    )

    return () => {
      dispose()
    }
  }, [resetPageNumber, searchFilterStore.searchFilter])

  return (
    <Layout currentPage="RECEPTION">
      {receptionListData ? (
        <ReceptionsView
          data={receptionListData}
          onChangePageNumber={setPageNumber}
          onChangeSearchFilter={handleOnChangeSearchFilter}
          onClickListItem={handleOnClickSearchResultListItem}
          onClickRegister={handleOnClickRegister}
          searchFilter={toJS(searchFilterStore.searchFilter)}
        />
      ) : (
        <Loading />
      )}
    </Layout>
  )
})

export default ReceptionsPage
