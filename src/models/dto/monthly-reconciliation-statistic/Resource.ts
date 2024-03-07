import {IMonthlyReconciliationStatistic} from '~types/dto'

class MonthlyReconciliationStatisticResource {
  #year: number

  #month: number

  #receptionCount: number

  #caregiverCount: number

  #totalCaregivingPeriod: number

  #totalBillingAmount: number

  #totalSettlementAmount: number

  #totalProfit: number

  #totalDistributedProfit: number

  constructor(data: IMonthlyReconciliationStatistic) {
    this.#year = data.year
    this.#month = data.month
    this.#receptionCount = data.receptionCount
    this.#caregiverCount = data.caregiverCount
    this.#totalCaregivingPeriod = data.totalCaregivingPeriod
    this.#totalBillingAmount = data.totalBillingAmount
    this.#totalSettlementAmount = data.totalSettlementAmount
    this.#totalProfit = data.totalProfit
    this.#totalDistributedProfit = data.totalDistributedProfit
  }

  get year(): number {
    return this.#year
  }

  get month(): number {
    return this.#month
  }

  get receptionCount(): number {
    return this.#receptionCount
  }

  get caregiverCount(): number {
    return this.#caregiverCount
  }

  get totalCaregivingPeriod(): number {
    return this.#totalCaregivingPeriod
  }

  get totalSettlementAmount(): number {
    return this.#totalSettlementAmount
  }

  get totalProfit(): number {
    return this.#totalProfit
  }

  get totalDistributedProfit(): number {
    return this.#totalDistributedProfit
  }

  get totalBillingAmount(): number {
    return this.#totalBillingAmount
  }
}

export default MonthlyReconciliationStatisticResource
