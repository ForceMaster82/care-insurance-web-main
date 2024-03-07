import {IAccountInfo} from '../../../types/dto'

class AccountInfoResource {
  #bank: string | null

  #accountNumber: string | null

  #accountHolder: string | null

  constructor(data: IAccountInfo) {
    const {bank, accountNumber, accountHolder} = data

    this.#bank = bank
    this.#accountNumber = accountNumber
    this.#accountHolder = accountHolder
  }

  get bank(): string {
    return this.#bank || ''
  }

  get accountNumber(): string {
    return this.#accountNumber || ''
  }

  get accountHolder(): string {
    return this.#accountHolder || ''
  }
}

export default AccountInfoResource
