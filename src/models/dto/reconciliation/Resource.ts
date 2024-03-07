import {
  ReconciliationClosingStatus,
  ReconciliationIssuedType,
} from '../../../types'
import {IReconciliation} from '../../../types/dto'

class ReconciliationResource {
  #id: string

  #closingStatus: ReconciliationClosingStatus

  #receptionId: string

  #caregivingRoundId: string

  #billingAmount: number

  #settlementAmount: number

  #settlementDepositAmount: number

  #settlementWithdrawalAmount: number

  #profit: number

  #distributedProfit: number

  #issuedType: ReconciliationIssuedType | null

  constructor(data: IReconciliation) {
    const {
      id,
      closingStatus,
      receptionId,
      caregivingRoundId,
      billingAmount,
      settlementAmount,
      settlementDepositAmount,
      settlementWithdrawalAmount,
      profit,
      distributedProfit,
      issuedType,
    } = data

    this.#id = id
    this.#closingStatus = closingStatus
    this.#receptionId = receptionId
    this.#caregivingRoundId = caregivingRoundId
    this.#billingAmount = billingAmount
    this.#settlementAmount = settlementAmount
    this.#settlementDepositAmount = settlementDepositAmount
    this.#settlementWithdrawalAmount = settlementWithdrawalAmount
    this.#profit = profit
    this.#distributedProfit = distributedProfit
    this.#issuedType = issuedType
  }

  get id(): string {
    return this.#id
  }

  get closingStatus(): ReconciliationClosingStatus {
    return this.#closingStatus
  }

  get receptionId(): string {
    return this.#receptionId
  }

  get caregivingRoundId(): string {
    return this.#caregivingRoundId
  }

  get billingAmount(): number {
    return this.#billingAmount
  }

  get settlementAmount(): number {
    return this.#settlementAmount
  }

  get settlementDepositAmount(): number {
    return this.#settlementDepositAmount
  }

  get settlementWithdrawalAmount(): number {
    return this.#settlementWithdrawalAmount
  }

  /**
   * 정산/청구로 인해 발생한 회차의 분배 전 이익
   */
  get profit(): number {
    return this.#profit
  }

  /**
   * 정산/청구로 인해 발생한 이익 분배
   */
  get distributedProfit(): number {
    return this.#distributedProfit
  }

  /**
   * 정산/청구로 인해 발생한 이익에서 제휴사 이익을 제한 후 케어닥에게 돌아오는 이익
   */
  get caredocProfit(): number {
    return this.profit - this.distributedProfit
  }

  get issuedType(): ReconciliationIssuedType | null {
    return this.#issuedType
  }
}

export default ReconciliationResource
