import {IMonthlyRegionalCaregivingStatistic} from '~types/dto'

class MonthlyRegionalCaregivingStatisticResource {
  #year: number

  #month: number

  #state: string

  #city: string | null

  #receptionCount: number

  constructor(data: IMonthlyRegionalCaregivingStatistic) {
    const {year, month, state, city, receptionCount} = data

    this.#year = year
    this.#month = month
    this.#state = state
    this.#city = city
    this.#receptionCount = receptionCount
  }

  get year(): number {
    return this.#year
  }

  get month(): number {
    return this.#month
  }

  get state(): string {
    return this.#state
  }

  get city(): string | null {
    return this.#city
  }

  get receptionCount(): number {
    return this.#receptionCount
  }
}

export default MonthlyRegionalCaregivingStatisticResource
