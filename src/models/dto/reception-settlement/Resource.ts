import {SettlementProgressingStatus} from '../../../types'
import {IReceptionSettlement} from '../../../types/dto'

class ReceptionSettlementResource {
  #id: string

  #receptionId: string

  #caregivingRoundId: string

  #accidentNumber: string

  #caregivingRoundNumber: number

  #progressingStatus: SettlementProgressingStatus

  #patientName: string

  #patientNickName: string

  #dailyCaregivingCharge: number

  #basicAmount: number

  #additionalAmount: number

  #totalAmount: number

  #lastCalculationDateTime: string

  #expectedSettlementDate: string

  #totalDepositAmount: number

  #totalWithdrawalAmount: number

  #lastTransactionDateTime: string | null

  #settlementCompletionDateTime: string | null

  #settlementManagerId: string | null

  constructor(data: IReceptionSettlement) {
    const {
      id,
      receptionId,
      caregivingRoundId,
      accidentNumber,
      caregivingRoundNumber,
      progressingStatus,
      patientName,
      patientNickName,
      dailyCaregivingCharge,
      basicAmount,
      additionalAmount,
      totalAmount,
      lastCalculationDateTime,
      expectedSettlementDate,
      totalDepositAmount,
      totalWithdrawalAmount,
      lastTransactionDateTime,
      settlementCompletionDateTime,
      settlementManagerId,
    } = data

    this.#id = id
    this.#receptionId = receptionId
    this.#caregivingRoundId = caregivingRoundId
    this.#accidentNumber = accidentNumber
    this.#caregivingRoundNumber = caregivingRoundNumber
    this.#progressingStatus = progressingStatus
    this.#patientName = patientName
    this.#patientNickName = patientNickName
    this.#dailyCaregivingCharge = dailyCaregivingCharge
    this.#basicAmount = basicAmount
    this.#additionalAmount = additionalAmount
    this.#totalAmount = totalAmount
    this.#lastCalculationDateTime = lastCalculationDateTime
    this.#expectedSettlementDate = expectedSettlementDate
    this.#totalDepositAmount = totalDepositAmount
    this.#totalWithdrawalAmount = totalWithdrawalAmount
    this.#lastTransactionDateTime = lastTransactionDateTime
    this.#settlementCompletionDateTime = settlementCompletionDateTime
    this.#settlementManagerId = settlementManagerId
  }

  get id(): string {
    return this.#id
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

  get patientNickName(): string {
    return this.#patientNickName
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

  /** 마지막 간병 산정일시 */
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

  /** 마지막 입출금 발생일시 */
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

export default ReceptionSettlementResource
