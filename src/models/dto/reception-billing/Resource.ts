import {BillingProgressingStatus, Period} from '../../../types'
import {IReceptionBilling} from '../../../types/dto'
import {getDateDistance} from '../../../utils/date'

class ReceptionBillingResource {
  #id: string

  #caregivingRoundId: string

  #caregivingRoundNumber: number

  #startDateTime: string

  #endDateTime: string

  #billingProgressingStatus: BillingProgressingStatus

  #billingDate: string | null

  #basicAmount: number

  #additionalAmount: number

  #totalAmount: number

  constructor(data: IReceptionBilling) {
    const {
      id,
      caregivingRoundId,
      caregivingRoundNumber,
      startDateTime,
      endDateTime,
      billingProgressingStatus,
      billingDate,
      basicAmount,
      additionalAmount,
      totalAmount,
    } = data

    this.#id = id
    this.#caregivingRoundId = caregivingRoundId
    this.#caregivingRoundNumber = caregivingRoundNumber
    this.#startDateTime = startDateTime
    this.#endDateTime = endDateTime
    this.#billingProgressingStatus = billingProgressingStatus
    this.#billingDate = billingDate
    this.#basicAmount = basicAmount
    this.#additionalAmount = additionalAmount
    this.#totalAmount = totalAmount
  }

  get id(): string {
    return this.#id
  }

  get caregivingRoundId(): string {
    return this.#caregivingRoundId
  }

  get caregivingRoundNumber(): number {
    return this.#caregivingRoundNumber
  }

  get startDateTime(): Date {
    return new Date(this.#startDateTime)
  }

  get endDateTime(): Date {
    return new Date(this.#endDateTime)
  }

  get caregivingPeriod(): Period {
    return getDateDistance(this.endDateTime, this.startDateTime)
  }

  get billingProgressingStatus(): BillingProgressingStatus {
    return this.#billingProgressingStatus
  }

  get billingDate(): Date | null {
    return (
      (typeof this.#billingDate === 'string' && new Date(this.#billingDate)) ||
      null
    )
  }

  get basicAmount(): number {
    return this.#basicAmount
  }

  get additionalAmount(): number {
    return this.#additionalAmount
  }

  get totalAmount(): number {
    return this.#totalAmount
  }
}

export default ReceptionBillingResource
