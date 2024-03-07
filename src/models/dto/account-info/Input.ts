import {IAccountInfo} from '../../../types/dto'
import {AccountInfoData} from '../../../types/form'
import AccountInfoResource from './Resource'

class AccountInfoInput {
  public bank: string

  public accountNumber: string

  public accountHolder: string

  constructor(resource?: AccountInfoResource) {
    this.bank = resource?.bank || ''
    this.accountNumber = resource?.accountNumber || ''
    this.accountHolder = resource?.accountHolder || ''
  }

  get data(): AccountInfoData {
    return {
      accountHolder: this.accountHolder,
      accountNumber: this.accountNumber,
      bank: this.bank,
    }
  }

  set data(data: AccountInfoData) {
    const {bank, accountNumber, accountHolder} = data

    this.bank = bank
    this.accountNumber = accountNumber
    this.accountHolder = accountHolder
  }

  get input(): IAccountInfo {
    return {
      accountHolder:
        (Boolean(this.accountHolder) && this.accountHolder) || null,
      accountNumber:
        (Boolean(this.accountNumber) && this.accountNumber) || null,
      bank: (Boolean(this.bank) && this.bank) || null,
    }
  }
}

export default AccountInfoInput
