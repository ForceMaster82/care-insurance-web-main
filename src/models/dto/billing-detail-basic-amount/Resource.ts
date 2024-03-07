import {IBillingDetailBasicAmount} from '~types/dto'

class BillingDetailBasicAmountResource {
  #targetAccidentYear: number

  #dailyCaregivingCharge: number

  #caregivingDays: number

  #totalAmount: number

  constructor(data: IBillingDetailBasicAmount) {
    const {
      targetAccidentYear,
      dailyCaregivingCharge,
      caregivingDays,
      totalAmount,
    } = data

    this.#caregivingDays = caregivingDays
    this.#targetAccidentYear = targetAccidentYear
    this.#dailyCaregivingCharge = dailyCaregivingCharge
    this.#totalAmount = totalAmount
  }

  get caregivingDays(): number {
    return this.#caregivingDays
  }

  get targetAccidentYear(): number {
    return this.#targetAccidentYear
  }

  get dailyCaregivingCharge(): number {
    return this.#dailyCaregivingCharge
  }

  get totalAmount(): number {
    return this.#totalAmount
  }
}

export default BillingDetailBasicAmountResource
