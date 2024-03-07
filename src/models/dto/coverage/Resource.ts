import {RenewalType} from '../../../types'
import {
  ICoverage,
  ICoverageAnnualCoveredCaregivingCharges,
} from '../../../types/dto'

class CoverageResource {
  #id: string

  #name: string

  #renewalType: RenewalType

  #targetSubscriptionYear: number

  #annualCoveredCaregivingCharges: ICoverageAnnualCoveredCaregivingCharges[]

  #lastModifiedDateTime: string

  constructor(data: ICoverage) {
    const {
      id,
      name,
      renewalType,
      targetSubscriptionYear,
      annualCoveredCaregivingCharges,
      lastModifiedDateTime,
    } = data

    this.#id = id
    this.#name = name
    this.#renewalType = renewalType
    this.#targetSubscriptionYear = targetSubscriptionYear
    this.#annualCoveredCaregivingCharges = annualCoveredCaregivingCharges
    this.#lastModifiedDateTime = lastModifiedDateTime
  }

  get id(): string {
    return this.#id
  }

  get name(): string {
    return this.#name
  }

  get renewalType(): RenewalType {
    return this.#renewalType
  }

  get targetSubscriptionYear(): number {
    return this.#targetSubscriptionYear
  }

  get annualCoveredCaregivingCharges(): ICoverageAnnualCoveredCaregivingCharges[] {
    return this.#annualCoveredCaregivingCharges
  }

  get lastModifiedDateTime(): Date {
    return new Date(this.#lastModifiedDateTime)
  }
}

export default CoverageResource
