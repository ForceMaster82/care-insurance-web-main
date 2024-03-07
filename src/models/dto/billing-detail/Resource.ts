import BillingDetailBasicAmountResource from '../billing-detail-basic-amount/Resource'
import {Period} from '../../../types'
import {IBillingDetail} from '~types/dto'
import {getDateDistance} from '~utils/date'

class BillingDetailResource {
  #accidentNumber: string

  #roundNumber: number

  #startDateTime: string

  #endDateTime: string

  #basicAmounts: BillingDetailBasicAmountResource[]

  #additionalAmount: number

  #additionalHours: number

  #totalAmount: number

  #totalDepositAmount: number

  #totalWithdrawalAmount: number

  #receptionId: string

  constructor(data: IBillingDetail) {
    const {
      accidentNumber,
      roundNumber,
      startDateTime,
      endDateTime,
      basicAmounts,
      additionalAmount,
      additionalHours,
      totalAmount,
      totalDepositAmount,
      totalWithdrawalAmount,
      receptionId,
    } = data

    this.#accidentNumber = accidentNumber

    this.#roundNumber = roundNumber

    this.#startDateTime = startDateTime

    this.#endDateTime = endDateTime

    this.#basicAmounts = basicAmounts.map(
      (data) => new BillingDetailBasicAmountResource(data),
    )

    this.#additionalAmount = additionalAmount

    this.#additionalHours = additionalHours

    this.#totalAmount = totalAmount

    this.#totalDepositAmount = totalDepositAmount

    this.#totalWithdrawalAmount = totalWithdrawalAmount

    this.#receptionId = receptionId
  }

  get accidentNumber(): string {
    return this.#accidentNumber
  }

  get additionalHours(): number {
    return this.#additionalHours
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

  get actualUsagePeriod(): Period {
    return getDateDistance(this.endDateTime, this.startDateTime)
  }

  get additionalAmount(): number {
    return this.#additionalAmount
  }

  get totalAmount(): number {
    return this.#totalAmount
  }

  get totalDepositAmount(): number {
    return this.#totalDepositAmount
  }

  get totalDepositWithdrawalAmount(): number {
    return this.#totalDepositAmount - this.#totalWithdrawalAmount
  }

  get totalWithdrawalAmount(): number {
    return this.#totalWithdrawalAmount
  }

  get receptionId(): string {
    return this.#receptionId
  }

  get basicAmounts(): BillingDetailBasicAmountResource[] {
    return this.#basicAmounts
  }

  get differenceAmount(): number {
    return this.totalDepositWithdrawalAmount - this.totalAmount
  }
}

export default BillingDetailResource
