import {SettlementProgressingStatus} from '~types'
import {ISettlement} from '~types/dto'

class SettlementResource {
  #id: string

  #receptionId: string

  #caregivingRoundId: string

  #accidentNumber: string

  #caregivingRoundNumber: number

  #progressingStatus: SettlementProgressingStatus

  #patientName: string

  #dailyCaregivingCharge: number

  #basicAmount: number

  #additionalAmount: number

  #totalAmount: number

  #lastCalculationDateTime: string

  #expectedSettlementDate: string

  #totalDepositAmount: number

  #totalWithdrawalAmount: number

  #lastTransactionDateTime: string | null

  #settlementCompletionDateTime: null | string

  #settlementManagerId: null | string

  #transactionType: null | string

  constructor(data: ISettlement) {
    this.#id = data.id
    this.#receptionId = data.receptionId
    this.#caregivingRoundId = data.caregivingRoundId
    this.#accidentNumber = data.accidentNumber
    this.#caregivingRoundNumber = data.caregivingRoundNumber
    this.#progressingStatus = data.progressingStatus
    this.#patientName = data.patientName
    this.#dailyCaregivingCharge = data.dailyCaregivingCharge
    this.#basicAmount = data.basicAmount
    this.#additionalAmount = data.additionalAmount
    this.#totalAmount = data.totalAmount
    this.#lastCalculationDateTime = data.lastCalculationDateTime
    this.#expectedSettlementDate = data.expectedSettlementDate
    this.#totalDepositAmount = data.totalDepositAmount
    this.#totalWithdrawalAmount = data.totalWithdrawalAmount
    this.#lastTransactionDateTime = data.lastTransactionDateTime
    this.#settlementCompletionDateTime = data.settlementCompletionDateTime
    this.#settlementManagerId = data.settlementManagerId
    this.#transactionType = data.transactionType
  }

  get id(): string {
    return this.#id
  }

  get transactionType(): string | null {
    return this.#transactionType
  }

  get receptionId(): string {
    return this.#receptionId
  }

  get caregivingRoundId(): string {
    return this.#caregivingRoundId
  }

  get accidentNumber(): string {
    return this.#accidentNumber
  }

  get caregivingRoundNumber(): number {
    return this.#caregivingRoundNumber
  }

  get progressingStatus(): SettlementProgressingStatus {
    return this.#progressingStatus
  }

  get patientName(): string {
    return this.#patientName
  }

  get dailyCaregivingCharge(): number {
    return this.#dailyCaregivingCharge
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

  get lastCalculationDateTime(): Date {
    return new Date(this.#lastCalculationDateTime)
  }

  get expectedSettlementDate(): Date {
    return new Date(this.#expectedSettlementDate)
  }

  get totalDepositAmount(): number {
    return this.#totalDepositAmount
  }

  get totalWithdrawalAmount(): number {
    return this.#totalWithdrawalAmount
  }

  get lastTransactionDateTime(): Date | null {
    return (
      (this.#lastTransactionDateTime &&
        new Date(this.#lastTransactionDateTime)) ||
      null
    )
  }

  get settlementCompletionDateTime(): Date | null {
    return (
      (this.#settlementCompletionDateTime &&
        new Date(this.#settlementCompletionDateTime)) ||
      null
    )
  }

  get settlementManagerId(): string | null {
    return this.#settlementManagerId
  }
}

export default SettlementResource
