import {IDailyCaregivingRoundTransactionStatistic} from '~types/dto'

class DailyCaregivingRoundTransactionStatisticResource {
  #date: string

  #totalDepositAmount: number

  #totalWithdrawalAmount: number

  #caregivingRoundId: string

  #receptionId: string

  constructor(data: IDailyCaregivingRoundTransactionStatistic) {
    this.#date = data.date
    this.#totalDepositAmount = data.totalDepositAmount
    this.#totalWithdrawalAmount = data.totalWithdrawalAmount
    this.#caregivingRoundId = data.caregivingRoundId
    this.#receptionId = data.receptionId
  }

  get date(): string {
    return this.#date
  }

  get totalDepositAmount(): number {
    return this.#totalDepositAmount
  }

  get totalWithdrawalAmount(): number {
    return this.#totalWithdrawalAmount
  }

  get caregivingRoundId(): string {
    return this.#caregivingRoundId
  }

  get receptionId(): string {
    return this.#receptionId
  }
}

export default DailyCaregivingRoundTransactionStatisticResource
