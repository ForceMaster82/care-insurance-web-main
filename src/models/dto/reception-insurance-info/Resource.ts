import {IReceptionInsuranceInfo} from '../../../types/dto'

class ReceptionInsuranceInfoResource {
  #insuranceNumber: string

  #subscriptionDate: string

  #coverageId: string

  #caregivingLimitPeriod: number

  constructor(data: IReceptionInsuranceInfo) {
    const {
      insuranceNumber,
      subscriptionDate,
      coverageId,
      caregivingLimitPeriod,
    } = data

    this.#insuranceNumber = insuranceNumber
    this.#subscriptionDate = subscriptionDate
    this.#coverageId = coverageId
    this.#caregivingLimitPeriod = caregivingLimitPeriod
  }

  get insuranceNumber(): string {
    return this.#insuranceNumber
  }

  get subscriptionDate(): Date {
    return new Date(this.#subscriptionDate)
  }

  get coverageId(): string {
    return this.#coverageId
  }

  get caregivingLimitPeriod(): number {
    return this.#caregivingLimitPeriod
  }
}

export default ReceptionInsuranceInfoResource
