import {ReceptionProgressingStatus} from '../../../types'
import {IReceptionUpdate} from '../../../types/dto'
import {ReceptionUpdateData} from '../../../types/form'
import {formatDate} from '../../../utils/date'
import ReceptionAccidentInfoInput from '../reception-accident-info/Input'
import ReceptionCaregivingManagerInfoInput from '../reception-caregiving-manager-info/Input'
import ReceptionInsuranceInfoInput from '../reception-insurance-info/Input'
import ReceptionPatientInfoInput from '../reception-patient-info/Input'
import ReceptionResource from './Resource'

class ReceptionUpdateInput {
  insuranceInfo: ReceptionInsuranceInfoInput

  patientInfo: ReceptionPatientInfoInput

  accidentInfo: ReceptionAccidentInfoInput

  caregivingManagerInfo: ReceptionCaregivingManagerInfoInput

  desiredCaregivingStartDate: string

  desiredCaregivingPeriod: string

  additionalRequests: string

  expectedCaregivingStartDate: string

  expectedCaregivingLimitDate: string

  progressingStatus: ReceptionProgressingStatus | null

  reasonForCancellation: string

  notifyCaregivingProgress: boolean

  constructor(resource?: ReceptionResource) {
    this.insuranceInfo = new ReceptionInsuranceInfoInput(
      resource?.insuranceInfo,
    )
    this.patientInfo = new ReceptionPatientInfoInput(resource?.patientInfo)
    this.accidentInfo = new ReceptionAccidentInfoInput(resource?.accidentInfo)
    this.caregivingManagerInfo =
      (resource?.caregivingManagerInfo &&
        new ReceptionCaregivingManagerInfoInput(
          resource.caregivingManagerInfo,
        )) ||
      new ReceptionCaregivingManagerInfoInput()
    this.desiredCaregivingStartDate =
      (resource?.desiredCaregivingStartDate &&
        formatDate(resource.desiredCaregivingStartDate)) ||
      ''
    this.desiredCaregivingPeriod =
      resource?.desiredCaregivingPeriod?.toString() || ''
    this.additionalRequests = resource?.additionalRequest || ''
    this.expectedCaregivingStartDate =
      (resource?.expectedCaregivingStartDate &&
        formatDate(resource.expectedCaregivingStartDate)) ||
      ''
    this.expectedCaregivingLimitDate =
      (resource?.expectedCaregivingLimitDate &&
        formatDate(resource.expectedCaregivingLimitDate)) ||
      ''
    this.progressingStatus = resource?.progressingStatus || null
    this.reasonForCancellation = resource?.reasonForCancellation || ''
    this.notifyCaregivingProgress = resource?.notifyCaregivingProgress || false
  }

  get data(): ReceptionUpdateData {
    return {
      accidentInfo: this.accidentInfo.data,
      additionalRequests: this.additionalRequests,
      caregivingManagerInfo: this.caregivingManagerInfo?.data || null,
      desiredCaregivingPeriod: this.desiredCaregivingPeriod,
      desiredCaregivingStartDate: this.desiredCaregivingStartDate,
      expectedCaregivingLimitDate: this.expectedCaregivingLimitDate,
      expectedCaregivingStartDate: this.expectedCaregivingStartDate,
      insuranceInfo: this.insuranceInfo.data,
      notifyCaregivingProgress: this.notifyCaregivingProgress,
      patientInfo: this.patientInfo.data,
      progressingStatus: this.progressingStatus,
      reasonForCancellation: this.reasonForCancellation,
    }
  }

  set data(data: ReceptionUpdateData) {
    const {
      insuranceInfo,
      patientInfo,
      accidentInfo,
      caregivingManagerInfo,
      desiredCaregivingStartDate,
      desiredCaregivingPeriod,
      additionalRequests,
      expectedCaregivingLimitDate,
      expectedCaregivingStartDate,
      progressingStatus,
      reasonForCancellation,
      notifyCaregivingProgress,
    } = data

    this.insuranceInfo.data = insuranceInfo
    this.patientInfo.data = patientInfo
    this.accidentInfo.data = accidentInfo
    this.caregivingManagerInfo.data = caregivingManagerInfo
    this.desiredCaregivingStartDate = desiredCaregivingStartDate
    this.desiredCaregivingPeriod = desiredCaregivingPeriod
    this.additionalRequests = additionalRequests
    this.expectedCaregivingLimitDate = expectedCaregivingLimitDate
    this.expectedCaregivingStartDate = expectedCaregivingStartDate
    this.progressingStatus = progressingStatus
    this.reasonForCancellation = reasonForCancellation
    this.notifyCaregivingProgress = notifyCaregivingProgress
  }

  get input(): IReceptionUpdate {
    return {
      accidentInfo: this.accidentInfo.input,
      additionalRequests: this.additionalRequests,
      caregivingManagerInfo:
        (this.caregivingManagerInfo.organizationType &&
          this.caregivingManagerInfo.managingUserId &&
          this.caregivingManagerInfo.input) ||
        null,
      desiredCaregivingPeriod: Number(this.desiredCaregivingPeriod),
      desiredCaregivingStartDate: this.desiredCaregivingStartDate,
      expectedCaregivingLimitDate: this.expectedCaregivingLimitDate,
      expectedCaregivingStartDate:
        (Boolean(this.expectedCaregivingStartDate) &&
          this.expectedCaregivingStartDate) ||
        null,
      insuranceInfo: this.insuranceInfo.input,
      notifyCaregivingProgress: this.notifyCaregivingProgress,
      patientInfo: this.patientInfo.input,
      progressingStatus: this.progressingStatus as ReceptionProgressingStatus,
      reasonForCancellation:
        (Boolean(this.reasonForCancellation) && this.reasonForCancellation) ||
        null,
    }
  }
}

export default ReceptionUpdateInput
