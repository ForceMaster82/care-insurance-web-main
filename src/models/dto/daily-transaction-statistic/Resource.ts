import {IDailyTransactionStatistic} from '~types/dto'

class DailyTransactionStatisticResource {
  #date: string
  #totalDepositAmount: number
  #totalWithdrawalAmount: number

  constructor(data: IDailyTransactionStatistic) {
    this.#date = data.date
    this.#totalDepositAmount = data.totalDepositAmount
    this.#totalWithdrawalAmount = data.totalWithdrawalAmount
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
}

export default DailyTransactionStatisticResource
