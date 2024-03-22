import {isToday} from 'date-fns'
import {
  BillingProgressingStatus,
  CaregivingProgressingStatus,
  Period,
  SettlementProgressingStatus,
} from '../../../types'
import {ICaregivingRound} from '../../../types/dto'
import {getDateDistance} from '../../../utils/date'
import CaregivingRoundReceptionInfoResource from '../caregiving-round-reception-info/Resource'

class CaregivingRoundResource {
  #id: string

  #receptionInfo: CaregivingRoundReceptionInfoResource

  #caregivingRoundNumber: number

  #caregiverName: string | null

  #caregiverPhoneNumber: string | null

  #caregiverSex: string | null

  #caregiverBirthDate: string | null

  #caregivingProgressingStatus: CaregivingProgressingStatus

  #settlementProgressingStatus: SettlementProgressingStatus

  #billingProgressingStatus: BillingProgressingStatus

  #startDateTime: string | null

  #endDateTime: string | null

  constructor(data: {
    startDateTime: string;
    receptionInfo: CaregivingRoundReceptionInfoResource
    billingProgressingStatus: BillingProgressingStatus;
    caregivingRoundNumber: number;
    caregivingProgressingStatus: CaregivingProgressingStatus;
    id: string;
    settlementProgressingStatus: SettlementProgressingStatus;
    caregiverName: string
    caregiverPhoneNumber: string
    caregiverSex: string
    caregiverBirthDate: string
    endDateTime: string
  }) {
    const {
      id,
      receptionInfo,
      caregivingRoundNumber,
      caregiverName,
      caregiverPhoneNumber,
      caregiverSex,
      caregiverBirthDate,
      caregivingProgressingStatus,
      settlementProgressingStatus,
      billingProgressingStatus,
      startDateTime,
      endDateTime,
    } = data

    this.#id = id
    this.#receptionInfo = receptionInfo
    this.#caregivingRoundNumber = caregivingRoundNumber
    this.#caregiverName = caregiverName
    this.#caregiverPhoneNumber = caregiverPhoneNumber
    this.#caregiverSex = caregiverSex
    this.#caregiverBirthDate = caregiverBirthDate
    this.#caregivingProgressingStatus = caregivingProgressingStatus
    this.#settlementProgressingStatus = settlementProgressingStatus
    this.#billingProgressingStatus = billingProgressingStatus
    this.#startDateTime = startDateTime
    this.#endDateTime = endDateTime
  }

  get id(): string {
    return this.#id
  }

  get receptionInfo(): CaregivingRoundReceptionInfoResource {
    return this.#receptionInfo
  }

  get caregivingRoundNumber(): number {
    return this.#caregivingRoundNumber
  }

  get caregiverName(): string | null {
    return this.#caregiverName
  }

  get caregiverPhoneNumber(): string | null {
    return this.#caregiverPhoneNumber
  }

  get caregiverSex(): string | null {
    return this.#caregiverSex
  }

  get caregiverBirthDate(): string | null {
    return this.#caregiverBirthDate
  }

  get caregivingProgressingStatus(): CaregivingProgressingStatus {
    return this.#caregivingProgressingStatus
  }

  get settlementProgressingStatus(): SettlementProgressingStatus {
    return this.#settlementProgressingStatus
  }

  get billingProgressingStatus(): BillingProgressingStatus {
    return this.#billingProgressingStatus
  }

  get startDateTime(): Date | null {
    return (this.#startDateTime && new Date(this.#startDateTime)) || null
  }

  get endDateTime(): Date | null {
    return (this.#endDateTime && new Date(this.#endDateTime)) || null
  }

  get expectedCaregivingPeriod(): Period | null {
    if (!this.startDateTime) {
      return null
    }

    if (isToday(this.startDateTime)) {
      return {
        days: 1,
        hours: 0,
      }
    }

    return getDateDistance(this.endDateTime || new Date(), this.startDateTime)
  }
}

export default CaregivingRoundResource
