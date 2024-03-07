import {makeAutoObservable} from 'mobx'
import {CaregivingChargeConfirmStatus} from '../../../types'
import CaregivingChargeAdditionalChargeInput from '../caregiving-charge-additional-charge/Input'
import {ICaregivingChargeUpdate} from '../../../types/dto'
import {CaregivingChargeData} from '../../../types/form'
import {formatDate} from '../../../utils/date'
import CaregivingChargeResource from './Resource'

class CaregivingChargeInput {
  /** 추가 시간 */
  additionalHoursCharge = '0'

  /** 식대 */
  mealCost = '0'

  /** 교통비 */
  transportationFee = '0'

  /** 명절 근무 */
  holidayCharge = '0'

  /** 배생 책임 보험 */
  caregiverInsuranceFee = '0'

  /** 수수료 */
  commissionFee = '0'

  /** 유급 휴가 */
  vacationCharge = '0'

  /** 환자 상태 */
  patientConditionCharge = '0'

  /** 코로나 검사비 */
  covid19TestingCost = '0'

  /** 간병비 미지급 */
  outstandingAmount = '0'

  /** 추가 기타 비용 (3개까지 입력 가능) */
  additionalCharges = [
    new CaregivingChargeAdditionalChargeInput(),
    new CaregivingChargeAdditionalChargeInput(),
    new CaregivingChargeAdditionalChargeInput(),
  ]

  /** 도착 후 취소 */
  isCancelAfterArrived = false

  /** 정산 예정 일자 */
  expectedSettlementDate = ''

  /** 간병비 산정 확정 상태 */
  caregivingChargeConfirmStatus: CaregivingChargeConfirmStatus = 'NOT_STARTED'

  constructor(resource?: CaregivingChargeResource) {
    makeAutoObservable(this)

    resource && this.setDataFromResource(resource)
  }

  get sumOfAdditionalCharges(): number {
    let result = 0

    for (const item of this.additionalCharges) {
      result += (item.sign === 'NEGATIVE' ? -1 : 1) * Number(item.amount)
    }

    return result
  }

  get sumOfPayments(): number {
    return (
      Number(this.additionalHoursCharge) +
      Number(this.covid19TestingCost) +
      Number(this.mealCost) +
      Number(this.transportationFee) +
      Number(this.holidayCharge) +
      Number(this.patientConditionCharge) +
      Number(this.caregiverInsuranceFee) +
      Number(this.vacationCharge) +
      Number(this.outstandingAmount) +
      Number(this.sumOfAdditionalCharges) -
      Number(this.commissionFee)
    )
  }

  get input(): ICaregivingChargeUpdate {
    return {
      additionalCharges: this.additionalCharges
        .filter((item) => !item.isEmpty)
        .map((item) => item.input),
      additionalHoursCharge: Number(this.additionalHoursCharge),
      caregiverInsuranceFee: Number(this.caregiverInsuranceFee),
      caregivingChargeConfirmStatus: this.caregivingChargeConfirmStatus,
      commissionFee: Math.abs(Number(this.commissionFee)) * -1,
      covid19TestingCost: Number(this.covid19TestingCost),
      expectedSettlementDate: this.expectedSettlementDate,
      holidayCharge: Number(this.holidayCharge),
      isCancelAfterArrived: this.isCancelAfterArrived,
      mealCost: Number(this.mealCost),
      outstandingAmount: Number(this.outstandingAmount),
      patientConditionCharge: Number(this.patientConditionCharge),
      transportationFee: Number(this.transportationFee),
      vacationCharge: Number(this.vacationCharge),
    }
  }

  get data(): CaregivingChargeData {
    return {
      additionalCharges: this.additionalCharges,
      additionalHoursCharge: this.additionalHoursCharge,
      caregiverInsuranceFee: this.caregiverInsuranceFee,
      caregivingChargeConfirmStatus: this.caregivingChargeConfirmStatus,
      commissionFee: this.commissionFee,
      covid19TestingCost: this.covid19TestingCost,
      expectedSettlementDate: this.expectedSettlementDate,
      holidayCharge: this.holidayCharge,
      isCancelAfterArrived: this.isCancelAfterArrived,
      mealCost: this.mealCost,
      outstandingAmount: this.outstandingAmount,
      patientConditionCharge: this.patientConditionCharge,
      transportationFee: this.transportationFee,
      vacationCharge: this.vacationCharge,
    }
  }

  set data(data: CaregivingChargeData) {
    const {
      additionalCharges,
      additionalHoursCharge,
      caregiverInsuranceFee,
      caregivingChargeConfirmStatus,
      commissionFee,
      covid19TestingCost,
      expectedSettlementDate,
      holidayCharge,
      isCancelAfterArrived,
      mealCost,
      outstandingAmount,
      patientConditionCharge,
      transportationFee,
      vacationCharge,
    } = data

    this.additionalCharges = additionalCharges
    this.additionalHoursCharge = additionalHoursCharge
    this.caregiverInsuranceFee = caregiverInsuranceFee
    this.caregivingChargeConfirmStatus = caregivingChargeConfirmStatus
    this.commissionFee = commissionFee
    this.covid19TestingCost = covid19TestingCost
    this.expectedSettlementDate = expectedSettlementDate
    this.holidayCharge = holidayCharge
    this.isCancelAfterArrived = isCancelAfterArrived
    this.mealCost = mealCost
    this.outstandingAmount = outstandingAmount
    this.patientConditionCharge = patientConditionCharge
    this.transportationFee = transportationFee
    this.vacationCharge = vacationCharge
  }

  set<K extends keyof this>(property: K, value: this[K]): void {
    this[property] = value
  }

  setAdditionalCharge<K extends keyof CaregivingChargeAdditionalChargeInput>(
    index: 0 | 1 | 2,
    property: K,
    value: CaregivingChargeAdditionalChargeInput[K],
  ): void {
    this.additionalCharges[index].set(property, value)
  }

  setDataFromResource(resource: CaregivingChargeResource): void {
    this.additionalHoursCharge = resource.additionalHoursCharge.toString()
    this.mealCost = resource.mealCost.toString()
    this.transportationFee = resource.transportationFee.toString()
    this.holidayCharge = resource.holidayCharge.toString()
    this.caregiverInsuranceFee = resource.caregiverInsuranceFee.toString()
    this.commissionFee = resource.commissionFee.toString()
    this.vacationCharge = resource.vacationCharge.toString()
    this.patientConditionCharge = resource.patientConditionCharge.toString()
    this.covid19TestingCost = resource.covid19TestingCost.toString()
    this.outstandingAmount = resource.outstandingAmount.toString()
    for (const [index, item] of resource.additionalCharges.entries()) {
      this.additionalCharges[index].setDataFromResource(item)
    }
    this.isCancelAfterArrived = resource.isCancelAfterArrived
    this.expectedSettlementDate = formatDate(resource.expectedSettlementDate)
    this.caregivingChargeConfirmStatus = resource.caregivingChargeConfirmStatus
  }
}

export default CaregivingChargeInput
