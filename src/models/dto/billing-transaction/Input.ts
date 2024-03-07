import {makeAutoObservable} from 'mobx'
import {removeNotNumber} from '../../../utils/formatter'
import {TransactionType} from '~types'
import {IBillingTransactionCreate} from '~types/dto'
import {BillingTransactionData} from '~types/form'
import {formatDate, getIsoString} from '~utils/date'

class BillingTransactionInput {
  transactionType: TransactionType = 'DEPOSIT'

  amount = '0'

  transactionDate = formatDate(new Date())

  transactionSubjectId = ''

  constructor(data?: Partial<BillingTransactionData>) {
    makeAutoObservable(this)

    data && this.setData(data)
  }

  get amountInNumber(): number {
    return Number(removeNotNumber(this.amount))
  }

  get data(): BillingTransactionData {
    return {
      amount: this.amount,
      transactionDate: this.transactionDate,
      transactionSubjectId: this.transactionSubjectId,
      transactionType: this.transactionType,
    }
  }

  set data(data: BillingTransactionData) {
    const {amount, transactionDate, transactionSubjectId, transactionType} =
      data
    this.transactionType = transactionType
    this.amount = amount
    this.transactionDate = transactionDate
    this.transactionSubjectId = transactionSubjectId
  }

  get input(): IBillingTransactionCreate {
    return {
      amount: this.amountInNumber,
      transactionDate: getIsoString(this.transactionDate),
      transactionSubjectId: this.transactionSubjectId,
      transactionType: this.transactionType,
    }
  }

  set<K extends keyof this>(property: K, value: this[K]): void {
    this[property] = value
  }

  setData(data: Partial<BillingTransactionData>): void {
    this.transactionType = data.transactionType || this.transactionType
    this.amount = data.amount || this.amount
    this.transactionDate = data.transactionDate || this.transactionDate
    this.transactionSubjectId =
      data.transactionSubjectId || this.transactionSubjectId
  }
}

export default BillingTransactionInput
