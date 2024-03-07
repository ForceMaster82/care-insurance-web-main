import {IReceptionCreate} from '../../../types/dto'
import ReceptionAccidentInfoInput from '../reception-accident-info/Input'
import ReceptionInsuranceInfoInput from '../reception-insurance-info/Input'
import ReceptionPatientInfoInput from '../reception-patient-info/Input'
import ReceptionInsuranceManagerInfoInput from '../reception-insurance-manager-info/Input'
import ReceptionRegisterManagerInfoInput from '../reception-register-manager-info/Input'
import {ReceptionCreateData} from '~types/form'
import {Urgency} from '~types'
import {formatDate, getIsoString} from '~utils/date'

class ReceptionCreateInput {
  insuranceInfo: ReceptionInsuranceInfoInput

  patientInfo: ReceptionPatientInfoInput

  accidentInfo: ReceptionAccidentInfoInput

  desiredCaregivingStartDate: string

  desiredCaregivingPeriod: string

  fixedDesiredCaregivingPeriod: boolean

  additionalRequests: string

  insuranceManagerInfo: ReceptionInsuranceManagerInfoInput

  registerManagerInfo: ReceptionRegisterManagerInfoInput

  notifyCaregivingProgress: boolean

  urgency: Urgency

  receivedDateTime: string

  constructor() {
    this.insuranceInfo = new ReceptionInsuranceInfoInput()
    this.patientInfo = new ReceptionPatientInfoInput()
    this.accidentInfo = new ReceptionAccidentInfoInput()
    this.desiredCaregivingStartDate = ''
    this.desiredCaregivingPeriod = ''
    this.fixedDesiredCaregivingPeriod = false
    this.additionalRequests = ''
    this.insuranceManagerInfo = new ReceptionInsuranceManagerInfoInput()
    this.notifyCaregivingProgress = true
    this.urgency = 'NORMAL'
    this.registerManagerInfo = new ReceptionRegisterManagerInfoInput()
    this.receivedDateTime = formatDate(new Date())
  }

  get data(): ReceptionCreateData {
    return {
      accidentInfo: this.accidentInfo.data,
      additionalRequests: this.additionalRequests,
      desiredCaregivingPeriod: this.desiredCaregivingPeriod,
      desiredCaregivingStartDate: this.desiredCaregivingStartDate,
      fixedDesiredCaregivingPeriod: this.fixedDesiredCaregivingPeriod,
      insuranceInfo: this.insuranceInfo.data,
      insuranceManagerInfo: this.insuranceManagerInfo.data,
      notifyCaregivingProgress: this.notifyCaregivingProgress,
      patientInfo: this.patientInfo.data,
      receivedDateTime: this.receivedDateTime,
      registerManagerInfo: this.registerManagerInfo.data,
      urgency: this.urgency,
    }
  }

  set data(data: ReceptionCreateData) {
    const {
      insuranceInfo,
      patientInfo,
      accidentInfo,
      desiredCaregivingStartDate,
      desiredCaregivingPeriod,
      additionalRequests,
      notifyCaregivingProgress,
      registerManagerInfo,
      urgency,
      insuranceManagerInfo,
      fixedDesiredCaregivingPeriod,
      receivedDateTime,
    } = data

    this.insuranceInfo.data = insuranceInfo
    this.patientInfo.data = patientInfo
    this.accidentInfo.data = accidentInfo
    this.desiredCaregivingStartDate = desiredCaregivingStartDate
    this.desiredCaregivingPeriod = desiredCaregivingPeriod
    this.fixedDesiredCaregivingPeriod = fixedDesiredCaregivingPeriod
    this.additionalRequests = additionalRequests
    this.notifyCaregivingProgress = notifyCaregivingProgress
    this.registerManagerInfo.data = registerManagerInfo
    this.insuranceManagerInfo.data = insuranceManagerInfo
    this.urgency = urgency
    this.receivedDateTime = receivedDateTime
  }

  get input(): IReceptionCreate {
    return {
      accidentInfo: this.accidentInfo.input,
      additionalRequests: this.additionalRequests,
      desiredCaregivingPeriod: this.fixedDesiredCaregivingPeriod
        ? null
        : Number(this.desiredCaregivingPeriod),
      desiredCaregivingStartDate: getIsoString(this.desiredCaregivingStartDate),
      insuranceInfo: this.insuranceInfo.input,
      insuranceManagerInfo: this.insuranceManagerInfo.input,
      notifyCaregivingProgress: this.notifyCaregivingProgress,
      patientInfo: this.patientInfo.input,
      receivedDateTime: getIsoString(this.receivedDateTime),
      registerManagerInfo: this.registerManagerInfo.input,
      urgency: this.urgency,
    }
  }
}

export default ReceptionCreateInput
