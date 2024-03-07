import {IReceptionInsuranceInfo} from '../../../types/dto'
import {ReceptionInsuranceInfoData} from '../../../types/form'
import {formatDate, getIsoString} from '../../../utils/date'
import ReceptionInsuranceInfoResource from './Resource'

class ReceptionInsuranceInfoInput {
  insuranceNumber: string

  subscriptionDate: string

  coverageId: string | null

  caregivingLimitPeriod: string

  constructor(resource?: ReceptionInsuranceInfoResource) {
    this.insuranceNumber = resource?.insuranceNumber || ''
    this.subscriptionDate =
      (resource?.subscriptionDate && formatDate(resource.subscriptionDate)) ||
      ''
    this.coverageId = resource?.coverageId || null
    this.caregivingLimitPeriod =
      resource?.caregivingLimitPeriod.toString() || ''
  }

  get data(): ReceptionInsuranceInfoData {
    return {
      caregivingLimitPeriod: this.caregivingLimitPeriod,
      coverageId: this.coverageId,
      insuranceNumber: this.insuranceNumber,
      subscriptionDate: this.subscriptionDate,
    }
  }

  set data(data: ReceptionInsuranceInfoData) {
    const {
      insuranceNumber,
      subscriptionDate,
      coverageId,
      caregivingLimitPeriod,
    } = data

    this.insuranceNumber = insuranceNumber
    this.subscriptionDate = subscriptionDate
    this.coverageId = coverageId
    this.caregivingLimitPeriod = caregivingLimitPeriod
  }

  get input(): IReceptionInsuranceInfo {
    return {
      caregivingLimitPeriod: Number(this.caregivingLimitPeriod),
      coverageId: this.coverageId as string,
      insuranceNumber: this.insuranceNumber,
      subscriptionDate: getIsoString(this.subscriptionDate),
    }
  }
}

export default ReceptionInsuranceInfoInput
