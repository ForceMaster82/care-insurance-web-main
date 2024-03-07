import {CaregivingChargeConfirmStatus} from '../../../types'
import {ICaregivingCharge} from '../../../types/dto'
import CaregivingChargeAdditionalChargeResource from '../caregiving-charge-additional-charge/Resource'
import CaregivingChargeCaregivingRoundInfoResource from '../caregiving-charge-caregiving-round-info/Resource'

class CaregivingChargeResource {
  #id: string

  #caregivingRoundInfo: CaregivingChargeCaregivingRoundInfoResource

  #additionalHoursCharge: number

  #mealCost: number

  #transportationFee: number

  #holidayCharge: number

  #caregiverInsuranceFee: number

  #commissionFee: number

  #vacationCharge: number

  #patientConditionCharge: number

  #covid19TestingCost: number

  #outstandingAmount: number

  #additionalCharges: CaregivingChargeAdditionalChargeResource[]

  #isCancelAfterArrived: boolean

  #caregivingChargeConfirmStatus: CaregivingChargeConfirmStatus

  #basicAmount: number

  #additionalAmount: number

  #totalAmount: number

  #expectedSettlementDate: string

  constructor(data: ICaregivingCharge) {
    const {
      id,
      caregivingRoundInfo,
      additionalHoursCharge,
      mealCost,
      transportationFee,
      holidayCharge,
      caregiverInsuranceFee,
      commissionFee,
      vacationCharge,
      patientConditionCharge,
      covid19TestingCost,
      outstandingAmount,
      additionalCharges,
      isCancelAfterArrived,
      caregivingChargeConfirmStatus,
      basicAmount,
      additionalAmount,
      totalAmount,
      expectedSettlementDate,
    } = data

    this.#id = id
    this.#caregivingRoundInfo = new CaregivingChargeCaregivingRoundInfoResource(
      caregivingRoundInfo,
    )
    this.#additionalHoursCharge = additionalHoursCharge
    this.#mealCost = mealCost
    this.#transportationFee = transportationFee
    this.#holidayCharge = holidayCharge
    this.#caregiverInsuranceFee = caregiverInsuranceFee
    this.#commissionFee = commissionFee
    this.#vacationCharge = vacationCharge
    this.#patientConditionCharge = patientConditionCharge
    this.#covid19TestingCost = covid19TestingCost
    this.#outstandingAmount = outstandingAmount
    this.#additionalCharges = additionalCharges.map(
      (item) => new CaregivingChargeAdditionalChargeResource(item),
    )
    this.#isCancelAfterArrived = isCancelAfterArrived
    this.#caregivingChargeConfirmStatus = caregivingChargeConfirmStatus
    this.#basicAmount = basicAmount
    this.#additionalAmount = additionalAmount
    this.#totalAmount = totalAmount
    this.#expectedSettlementDate = expectedSettlementDate
  }

  get id(): string {
    return this.#id
  }

  get caregivingRoundInfo(): CaregivingChargeCaregivingRoundInfoResource {
    return this.#caregivingRoundInfo
  }

  get additionalHoursCharge(): number {
    return this.#additionalHoursCharge
  }

  get mealCost(): number {
    return this.#mealCost
  }

  get transportationFee(): number {
    return this.#transportationFee
  }

  get holidayCharge(): number {
    return this.#holidayCharge
  }

  get caregiverInsuranceFee(): number {
    return this.#caregiverInsuranceFee
  }

  get commissionFee(): number {
    return Math.abs(this.#commissionFee)
  }

  get vacationCharge(): number {
    return this.#vacationCharge
  }

  get patientConditionCharge(): number {
    return this.#patientConditionCharge
  }

  get covid19TestingCost(): number {
    return this.#covid19TestingCost
  }

  get outstandingAmount(): number {
    return this.#outstandingAmount
  }

  get additionalCharges(): CaregivingChargeAdditionalChargeResource[] {
    return this.#additionalCharges
  }

  get isCancelAfterArrived(): boolean {
    return this.#isCancelAfterArrived
  }

  get caregivingChargeConfirmStatus(): CaregivingChargeConfirmStatus {
    return this.#caregivingChargeConfirmStatus
  }

  get basicAmount(): number {
    return this.#basicAmount
  }

  get additionalAmount(): number {
    return this.#additionalAmount
  }

  get totalAmount(): number {
    return this.#totalAmount
  }

  get expectedSettlementDate(): Date {
    return new Date(this.#expectedSettlementDate)
  }
}

export default CaregivingChargeResource
