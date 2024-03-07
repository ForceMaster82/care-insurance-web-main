import {makeAutoObservable} from 'mobx'
import {removeNotNumber} from '../../../utils/formatter'
import {TransactionType} from '~types'
import {ISettlementTransactionCreate} from '~types/dto'
import {SettlementTransactionCreateData} from '~types/form'
import {formatDate, getIsoString} from '~utils/date'

class SettlementTransactionCreateInput {
  amount = '0'

  transactionDate = formatDate(new Date())

  transactionSubjectId = ''

  transactionType: TransactionType = 'DEPOSIT'

  constructor() {
    makeAutoObservable(this)
  }

  get data(): SettlementTransactionCreateData {
    return {
      amount: this.amount,
      transactionDate: this.transactionDate,
      transactionSubjectId: this.transactionSubjectId,
      transactionType: this.transactionType,
    }
  }

  set data(data: SettlementTransactionCreateData) {
    const {amount, transactionDate, transactionSubjectId, transactionType} =
      data
    this.amount = amount
    this.transactionDate = transactionDate
    this.transactionSubjectId = transactionSubjectId
    this.transactionType = transactionType
  }

  get input(): ISettlementTransactionCreate {
    return {
      amount: Number(removeNotNumber(this.amount)),
      transactionDate: getIsoString(this.transactionDate),
      transactionSubjectId: this.transactionSubjectId,
      transactionType: this.transactionType,
    }
  }

  set<K extends keyof this>(property: K, value: this[K]): void {
    this[property] = value
  }
}

export default SettlementTransactionCreateInput
