import {TransactionType} from '~types'
import {IBillingTransaction} from '~types/dto'

class BillingTransactionResource {
  #transactionType: TransactionType

  #amount: number

  #transactionDate: string

  #enteredDateTime: string

  #transactionSubjectId: string

  constructor(data: IBillingTransaction) {
    const {
      enteredDateTime,
      amount,
      transactionDate,
      transactionSubjectId,
      transactionType,
    } = data

    this.#transactionType = transactionType
    this.#amount = amount
    this.#transactionDate = transactionDate
    this.#enteredDateTime = enteredDateTime
    this.#transactionSubjectId = transactionSubjectId
  }

  get amount(): number {
    return this.#amount
  }

  get depositAmount(): number {
    return (this.transactionType === 'DEPOSIT' && this.amount) || 0
  }

  get withdrawalAmount(): number {
    return (this.transactionType === 'WITHDRAWAL' && this.amount) || 0
  }

  get transactionDate(): Date {
    return new Date(this.#transactionDate)
  }

  get transactionSubjectId(): string {
    return this.#transactionSubjectId
  }

  get transactionType(): TransactionType {
    return this.#transactionType
  }

  get enteredDateTime(): Date {
    return new Date(this.#enteredDateTime)
  }
}

export default BillingTransactionResource
