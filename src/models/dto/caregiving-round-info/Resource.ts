import {getDateDistance} from '../../../utils/date'
import CaregiverInfoResource from '../caregiver-info/Resource'
import CaregivingRoundReceptionInfoResource from '../caregiving-round-reception-info/Resource'
import {
  BillingProgressingStatus,
  CaregivingProgressingStatus,
  CaregivingRoundClosingReasonType,
  Period,
  SettlementProgressingStatus,
} from '~types'
import {ICaregivingRoundInfo} from '~types/dto'

class CaregivingRoundInfoResource {
  #id: string

  #caregivingRoundNumber: number

  #caregivingProgressingStatus: CaregivingProgressingStatus

  #receptionInfo: CaregivingRoundReceptionInfoResource

  #startDateTime: string | null

  #endDateTime: string | null

  #cancelDateTime: string | null

  #caregivingRoundClosingReasonType: CaregivingRoundClosingReasonType

  #caregivingRoundClosingReasonDetail: string

  #settlementProgressingStatus: SettlementProgressingStatus

  #caregiverInfo: CaregiverInfoResource

  #remarks: string

  #billingProgressingStatus: BillingProgressingStatus

  constructor(data: ICaregivingRoundInfo) {
    this.#id = data.id
    this.#caregivingRoundNumber = data.caregivingRoundNumber
    this.#caregivingProgressingStatus = data.caregivingProgressingStatus
    this.#receptionInfo = new CaregivingRoundReceptionInfoResource(
      data.receptionInfo,
    )
    this.#startDateTime = data.startDateTime
    this.#endDateTime = data.endDateTime
    this.#cancelDateTime = data.cancelDateTime
    this.#caregivingRoundClosingReasonType =
      data.caregivingRoundClosingReasonType
    this.#caregivingRoundClosingReasonDetail =
      data.caregivingRoundClosingReasonDetail
    this.#settlementProgressingStatus = data.settlementProgressingStatus
    this.#billingProgressingStatus = data.billingProgressingStatus
    this.#caregiverInfo = new CaregiverInfoResource(data.caregiverInfo)
    this.#remarks = data.remarks
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

  get caregivingRoundClosingReasonType(): CaregivingRoundClosingReasonType {
    return this.#caregivingRoundClosingReasonType
  }

  get caregivingRoundClosingReasonDetail(): string {
    return this.#caregivingRoundClosingReasonDetail
  }

  get settlementProgressingStatus(): SettlementProgressingStatus {
    return this.#settlementProgressingStatus
  }

  get billingProgressingStatus(): BillingProgressingStatus {
    return this.#billingProgressingStatus
  }

  get caregiverInfo(): CaregiverInfoResource {
    return this.#caregiverInfo
  }

  get remarks(): string {
    return this.#remarks
  }

  get isCaregivingRoundContinue(): boolean {
    return (
      this.#caregivingProgressingStatus === 'COMPLETED_RESTARTING' ||
      (this.#caregivingProgressingStatus === 'COMPLETED' &&
        this.#caregivingRoundClosingReasonType === 'FINISHED_CONTINUE')
    )
  }

  get caregivingPeriod(): Period | null {
    if (!this.startDateTime || !this.endDateTime) {
      return null
    }

    return getDateDistance(this.endDateTime, this.startDateTime)
  }
}

export default CaregivingRoundInfoResource
