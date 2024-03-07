import {paramCase} from 'change-case'
import {
  BillingProgressingStatus,
  CaregivingProgressingStatus,
  ReceptionProgressingStatus,
  SearchCategory,
  SearchFilterQueryData,
  SettlementProgressingStatus,
} from '../types'

export const getURLSearchParams = (
  _queryParams:
    | Record<string, string | number | boolean | null | undefined>
    | [string, number | string | boolean | null | undefined][],
): URLSearchParams => {
  const queryParams = (
    Array.isArray(_queryParams) ? _queryParams : Object.entries(_queryParams)
  )
    .filter(([, value]) =>
      typeof value !== 'number' && typeof value !== 'boolean'
        ? Boolean(value)
        : true,
    )
    .map(([key, value]) => [paramCase(key), String(value)])

  return new URLSearchParams(queryParams)
}

export const formatSearchQuery = (
  searchCategory: SearchCategory,
  searchKeyword: string,
): string => {
  return (Boolean(searchKeyword) && `${searchCategory}:${searchKeyword}`) || ''
}

type ProgressingStatusFilterKey =
  | 'PROGRESSING_STATUS'
  | 'RECEPTION_PROGRESSING_STATUS'
  | 'CAREGIVING_PROGRESSING_STATUS'
  | 'SETTLEMENT_PROGRESSING_STATUS'
  | 'BILLING_PROGRESSING_STATUS'

export const transformProgressingStatusFilterToQueryData = (
  searchFilter: Partial<
    Record<
      ProgressingStatusFilterKey,
      (
        | ReceptionProgressingStatus
        | CaregivingProgressingStatus
        | BillingProgressingStatus
        | SettlementProgressingStatus
      )[]
    >
  >,
): SearchFilterQueryData[] => {
  const searchFilterQueryData: SearchFilterQueryData[] = []

  for (const [key, statusList] of Object.entries(searchFilter)) {
    for (const status of statusList) {
      searchFilterQueryData.push([key as ProgressingStatusFilterKey, status])
    }
  }

  return searchFilterQueryData
}
