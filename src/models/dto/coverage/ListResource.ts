import {RenewalType} from '~types'
import {ICoverageListData} from '~types/dto'

class CoverageListResource {
  #id: string
  #name: string
  #renewalType: RenewalType
  #targetSubscriptionYear: number
  #lastModifiedDateTime: string

  constructor(data: ICoverageListData) {
    this.#id = data.id
    this.#name = data.name
    this.#renewalType = data.renewalType
    this.#targetSubscriptionYear = data.targetSubscriptionYear
    this.#lastModifiedDateTime = data.lastModifiedDateTime
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

  get lastModifiedDateTime(): Date {
    return new Date(this.#lastModifiedDateTime)
  }
}

export default CoverageListResource
