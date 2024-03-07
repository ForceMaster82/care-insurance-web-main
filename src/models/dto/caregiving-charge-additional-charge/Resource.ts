import {ICaregivingChargeAdditionalCharge} from '../../../types/dto'

class CaregivingChargeAdditionalChargeResource {
  #name: string

  #amount: number

  constructor(data: ICaregivingChargeAdditionalCharge) {
    const {name, amount} = data

    this.#name = name
    this.#amount = amount
  }

  get name(): string {
    return this.#name
  }

  get amount(): number {
    return this.#amount
  }
}

export default CaregivingChargeAdditionalChargeResource
