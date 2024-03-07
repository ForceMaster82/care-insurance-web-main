import {
  ICanceledReceptionCountsByReason,
  IDailyReceptionStatistic,
} from '~types/dto'

class DailyReceptionStatisticResource {
  #receivedDate: string

  #receptionCount: number

  #canceledReceptionCount: number

  #canceledReceptionCountsByReason: ICanceledReceptionCountsByReason

  #requestedBillingCount: number

  #requestedBillingAmount: number

  #depositCount: number

  #depositAmount: number

  #withdrawalCount: number

  #withdrawalAmount: number

  #sameDayAssignmentReceptionCount: number

  #startedSameDayAssignmentReceptionCount: number

  #shortTermReceptionCount: number

  #startedShortTermReceptionCount: number

  constructor(data: IDailyReceptionStatistic) {
    const {
      receivedDate,
      receptionCount,
      canceledReceptionCount,
      canceledReceptionCountsByReason,
      requestedBillingAmount,
      requestedBillingCount,
      depositAmount,
      depositCount,
      withdrawalAmount,
      withdrawalCount,
      sameDayAssignmentReceptionCount,
      shortTermReceptionCount,
      startedSameDayAssignmentReceptionCount,
      startedShortTermReceptionCount,
    } = data

    this.#receivedDate = receivedDate
    this.#receptionCount = receptionCount
    this.#canceledReceptionCount = canceledReceptionCount
    this.#canceledReceptionCountsByReason = canceledReceptionCountsByReason
    this.#requestedBillingCount = requestedBillingCount
    this.#requestedBillingAmount = requestedBillingAmount
    this.#depositCount = depositCount
    this.#depositAmount = depositAmount
    this.#withdrawalCount = withdrawalCount
    this.#withdrawalAmount = withdrawalAmount
    this.#sameDayAssignmentReceptionCount = sameDayAssignmentReceptionCount
    this.#startedSameDayAssignmentReceptionCount =
      startedSameDayAssignmentReceptionCount
    this.#shortTermReceptionCount = shortTermReceptionCount
    this.#startedShortTermReceptionCount = startedShortTermReceptionCount
  }

  get receivedDate(): Date {
    return new Date(this.#receivedDate)
  }

  get receptionCount(): number {
    return this.#receptionCount
  }

  get canceledReceptionCount(): number {
    return this.#canceledReceptionCount
  }

  get canceledReceptionCountsByReason(): ICanceledReceptionCountsByReason {
    return this.#canceledReceptionCountsByReason
  }

  get requestedBillingAmount(): number {
    return this.#requestedBillingAmount
  }

  get requestedBillingCount(): number {
    return this.#requestedBillingCount
  }

  get depositAmount(): number {
    return this.#depositAmount
  }

  get depositCount(): number {
    return this.#depositCount
  }

  get withdrawalAmount(): number {
    return this.#withdrawalAmount
  }

  get withdrawalCount(): number {
    return this.#withdrawalCount
  }

  get sameDayAssignmentReceptionCount(): number {
    return this.#sameDayAssignmentReceptionCount
  }

  get shortTermReceptionCount(): number {
    return this.#shortTermReceptionCount
  }

  get startedSameDayAssignmentReceptionCount(): number {
    return this.#startedSameDayAssignmentReceptionCount
  }

  get startedShortTermReceptionCount(): number {
    return this.#startedShortTermReceptionCount
  }

  get dispatchedCount(): number {
    return this.#receptionCount - this.#canceledReceptionCount
  }

  get claimCount(): number {
    return 0
  }
}

export default DailyReceptionStatisticResource
