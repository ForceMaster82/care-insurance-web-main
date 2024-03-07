import {TransactionType} from '~types'
import {ISettlementTransaction} from '~types/dto'

class SettlementTransactionResource {
  #transactionType: TransactionType

  #amount: number

  #transactionSubjectId: string

  #transactionDate: string

  #enteredDateTime: string

  constructor(data: ISettlementTransaction) {
    const {
      amount,
      transactionType,
      transactionSubjectId,
      transactionDate,
      enteredDateTime,
    } = data

    this.#amount = amount
    this.#transactionType = transactionType
    this.#transactionSubjectId = transactionSubjectId
    this.#transactionDate = transactionDate
    this.#enteredDateTime = enteredDateTime
  }

  get amount(): number {
    return this.#amount
  }

  get enteredDateTime(): Date {
    return new Date(this.#enteredDateTime)
  }

  get transactionType(): TransactionType {
    return this.#transactionType
  }

  get transactionSubjectId(): string {
    return this.#transactionSubjectId
  }

  get transactionDate(): Date {
    return new Date(this.#transactionDate)
  }
}
export default SettlementTransactionResource
