import {isToday} from 'date-fns'
import {
  BillingProgressingStatus,
  CaregivingProgressingStatus,
  CaregivingRoundClosingReasonType,
  Period,
  SettlementProgressingStatus,
} from '../../../types'
import {IReceptionCaregivingRound} from '../../../types/dto'
import {getDateDistance} from '../../../utils/date'
import CaregiverInfoResource from '../caregiver-info/Resource'
import CaregivingRoundReceptionInfoResource from '../caregiving-round-reception-info/Resource'

class ReceptionCaregivingRoundResource {
  #id: string

  #caregivingRoundNumber: number

  #caregivingProgressingStatus: CaregivingProgressingStatus

  #receptionInfo: CaregivingRoundReceptionInfoResource

  #startDateTime: string | null

  #endDateTime: string | null

  #cancelDateTime: string | null

  #caregivingRoundClosingReasonType: CaregivingRoundClosingReasonType | null

  #caregivingRoundClosingReasonDetail: string | null

  #settlementProgressingStatus: SettlementProgressingStatus

  #billingProgressingStatus: BillingProgressingStatus

  #caregiverInfo: CaregiverInfoResource | null

  #remarks: string

  #expectedSettlementDate: string | null

  constructor(data: IReceptionCaregivingRound) {
    const {
      id,
      caregivingRoundNumber,
      caregivingProgressingStatus,
      receptionInfo,
      startDateTime,
      endDateTime,
      cancelDateTime,
      caregivingRoundClosingReasonType,
      caregivingRoundClosingReasonDetail,
      settlementProgressingStatus,
      billingProgressingStatus,
      caregiverInfo,
      remarks,
      expectedSettlementDate,
    } = data

    this.#id = id
    this.#caregivingRoundNumber = caregivingRoundNumber
    this.#caregivingProgressingStatus = caregivingProgressingStatus
    this.#receptionInfo = new CaregivingRoundReceptionInfoResource(
      receptionInfo,
    )
    this.#startDateTime = startDateTime
    this.#endDateTime = endDateTime
    this.#cancelDateTime = cancelDateTime
    this.#caregivingRoundClosingReasonType = caregivingRoundClosingReasonType
    this.#caregivingRoundClosingReasonDetail =
      caregivingRoundClosingReasonDetail
    this.#settlementProgressingStatus = settlementProgressingStatus
    this.#billingProgressingStatus = billingProgressingStatus
    this.#caregiverInfo =
      (caregiverInfo && new CaregiverInfoResource(caregiverInfo)) || null
    this.#remarks = remarks
    this.#expectedSettlementDate = expectedSettlementDate
  }

  get id(): string {
    return this.#id
  }

  get caregivingRoundNumber(): number {
    return this.#caregivingRoundNumber
  }

  get caregivingProgressingStatus(): CaregivingProgressingStatus {
    return this.#caregivingProgressingStatus
  }

  get receptionInfo(): CaregivingRoundReceptionInfoResource {
    return this.#receptionInfo
  }

  get startDateTime(): Date | null {
    return (this.#startDateTime && new Date(this.#startDateTime)) || null
  }

  get endDateTime(): Date | null {
    return (this.#endDateTime && new Date(this.#endDateTime)) || null
  }

  get cancelDateTime(): Date | null {
    return (this.#cancelDateTime && new Date(this.#cancelDateTime)) || null
  }

  get caregivingRoundClosingReasonType(): CaregivingRoundClosingReasonType | null {
    return this.#caregivingRoundClosingReasonType
  }

  get caregivingRoundClosingReasonDetail(): string {
    return this.#caregivingRoundClosingReasonDetail || ''
  }

  get settlementProgressingStatus(): SettlementProgressingStatus {
    return this.#settlementProgressingStatus
  }

  get billingProgressingStatus(): BillingProgressingStatus {
    return this.#billingProgressingStatus
  }

  get caregiverInfo(): CaregiverInfoResource | null {
    return this.#caregiverInfo
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

  get caregivingPeriod(): Period | null {
    if (!this.startDateTime || !this.endDateTime) {
      return null
    }

    return getDateDistance(this.endDateTime, this.startDateTime)
  }

  get remarks(): string {
    return this.#remarks
  }

  get expectedSettlementDate(): Date | null {
    return (this.#expectedSettlementDate && new Date(this.#expectedSettlementDate)) || null
  }
}

export default ReceptionCaregivingRoundResource
