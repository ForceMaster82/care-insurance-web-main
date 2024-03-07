import {BillingProgressingStatus} from '~types'
import {IBilling} from '~types/dto'

class BillingResource {
  #id: string

  #receptionId: string

  #accidentNumber: string

  #patientName: string

  #roundNumber: number

  #startDateTime: string

  #endDateTime: string

  #actualUsagePeriod: string

  #billingDate: string

  #totalAmount: number

  #totalDepositAmount: number

  #totalWithdrawalAmount: number

  #transactionDate: string

  #billingProgressingStatus: BillingProgressingStatus

  constructor(data: IBilling) {
    const {
      id,
      receptionId,
      accidentNumber,
      patientName,
      roundNumber,
      startDateTime,
      endDateTime,
      actualUsagePeriod,
      billingDate,
      billingProgressingStatus,
      totalAmount,
      totalDepositAmount,
      totalWithdrawalAmount,
      transactionDate,
    } = data

    this.#id = id
    this.#receptionId = receptionId
    this.#accidentNumber = accidentNumber
    this.#patientName = patientName
    this.#roundNumber = roundNumber
    this.#startDateTime = startDateTime
    this.#endDateTime = endDateTime
    this.#actualUsagePeriod = actualUsagePeriod
    this.#billingDate = billingDate
    this.#totalAmount = totalAmount
    this.#totalDepositAmount = totalDepositAmount
    this.#totalWithdrawalAmount = totalWithdrawalAmount
    this.#transactionDate = transactionDate
    this.#billingProgressingStatus = billingProgressingStatus
  }

  get id(): string {
    return this.#id
  }

  get receptionId(): string {
    return this.#receptionId
  }

  get accidentNumber(): string {
    return this.#accidentNumber
  }

  get patientName(): string {
    return this.#patientName
  }

  get roundNumber(): number {
    return this.#roundNumber
  }

  get startDateTime(): Date {
    return new Date(this.#startDateTime)
  }

  get endDateTime(): Date {
    return new Date(this.#endDateTime)
  }

  get actualUsagePeriod(): string {
    return this.#actualUsagePeriod
  }

  get billingDate(): Date {
    return new Date(this.#billingDate)
  }

  get totalAmount(): number {
    return this.#totalAmount
  }

  get totalDepositAmount(): number {
    return this.#totalDepositAmount
  }

  get totalWithdrawalAmount(): number {
    return this.#totalWithdrawalAmount
  }

  get totalDepositWithdrawalAmount(): number {
    return this.#totalDepositAmount - this.#totalWithdrawalAmount
  }

  get differenceAmount(): number {
    return this.totalDepositWithdrawalAmount - this.totalAmount
  }

  get transactionDate(): Date {
    return new Date(this.#transactionDate)
  }

  get billingProgressingStatus(): BillingProgressingStatus {
    return this.#billingProgressingStatus
  }
}

export default BillingResource
