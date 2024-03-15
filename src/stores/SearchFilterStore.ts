/* eslint-disable typescript-sort-keys/interface */
import {makeAutoObservable, toJS} from 'mobx'
import {paramCase} from 'change-case'
import {
  BillingProgressingStatus, Cancel,
  CaregivingManagerOrganizationTypeFilterType,
  CaregivingMessageSendingStatus,
  CaregivingProgressingStatus, Completed, Notify,
  PeriodType,
  ReceptionProgressingStatus,
  SearchCategory,
  SettlementProgressingStatus,
  Urgency,
} from '../types'
import {State} from '../components/StateCityPicker'
import {OptionValue as ReceivedPeriodOptionValue} from '../views/receptions/components/ReceivedPreiodSelection'

export interface SearchFilter {
  FROM: string
  UNTIL: string
  DATE: string
  SEARCH_CATEGORY: SearchCategory
  SEARCH_KEYWORD: string
  CANCELED_RECEPTION: Cancel | null
  EXCLUDE_COMPLETED: Completed | null
  ORGANIZATION_TYPE: CaregivingManagerOrganizationTypeFilterType
  URGENCY: Urgency | null
  PERIOD_TYPE: PeriodType | null
  RECEPTION_PROGRESSING_STATUS: ReceptionProgressingStatus[]
  CAREGIVING_PROGRESSING_STATUS: CaregivingProgressingStatus[]
  SETTLEMENT_PROGRESSING_STATUS: SettlementProgressingStatus[]
  BILLING_PROGRESSING_STATUS: BillingProgressingStatus[]
  SENDING_STATUS: CaregivingMessageSendingStatus | null
  EXPECTED_CAREGIVING_START_DATE: string
  TRANSACTION_DATE_FROM: string
  TRANSACTION_DATE_UNTIL: string
  USED_PERIOD_FROM: string
  USED_PERIOD_UNTIL: string
  BILLING_DATE_FROM: string
  BILLING_DATE_UNTIL: string
  ISSUED_AT_FROM: string
  ISSUED_AT_UNTIL: string
  YEAR: number
  MONTH: number
  RECONCILED_YEAR: number
  RECONCILED_MONTH: number
  STATE: State | null
  CITY: string | null
  RECEIVED_PERIOD: ReceivedPeriodOptionValue | null
  NOTIFY_CAREGIVING_PROGRESS: Notify | true
}

class SearchFilterStore<K extends keyof SearchFilter> {
  searchFilter: Pick<SearchFilter, K>

  constructor(data: Pick<SearchFilter, K>) {
    this.searchFilter = data

    makeAutoObservable(this)
  }

  set(key: K, value: SearchFilter[K]): void {
    this.searchFilter[key] = value
  }

  toQueryData(): Record<string, unknown> {
    const map = new Map<string, unknown>()

    for (const [key, value] of Object.entries(toJS(this.searchFilter))) {
      if (typeof value !== 'number' && typeof value !== 'boolean') {
        Boolean(value) && map.set(paramCase(key), value)
      } else {
        map.set(paramCase(key), value)
      }
    }

    return Object.fromEntries(map)
  }
}

export default SearchFilterStore
