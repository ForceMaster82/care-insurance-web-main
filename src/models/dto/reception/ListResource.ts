import {PeriodType, ReceptionProgressingStatus, Urgency} from '../../../types'
import {IReceptionListData} from '../../../types/dto'
import ReceptionAccidentInfoListResource from '../reception-accident-info/ListResource'
import ReceptionCaregivingManagerInfoResource from '../reception-caregiving-manager-info/Resource'
import ReceptionInsuranceInfoListResource from '../reception-insurance-info/ListResource'
import ReceptionPatientInfoListResource from '../reception-patient-info/ListResource'

class ReceptionListResource {
  #id: string

  #insuranceInfo: ReceptionInsuranceInfoListResource

  #patientInfo: ReceptionPatientInfoListResource

  #accidentInfo: ReceptionAccidentInfoListResource

  #caregivingManagerInfo: ReceptionCaregivingManagerInfoResource | null

  #progressingStatus: ReceptionProgressingStatus

  #desiredCaregivingStartDate: string

  #urgency: Urgency

  #desiredCaregivingPeriod: number | null

  #additionalRequests: string

  #periodType: PeriodType

  #receivedDateTime: string

  constructor(data: IReceptionListData) {
    const {
      id,
      insuranceInfo,
      patientInfo,
      accidentInfo,
      caregivingManagerInfo,
      progressingStatus,
      desiredCaregivingPeriod,
      urgency,
      desiredCaregivingStartDate,
      additionalRequests,
      periodType,
      receivedDateTime,
    } = data

    this.#id = id
    this.#insuranceInfo = new ReceptionInsuranceInfoListResource(insuranceInfo)
    this.#patientInfo = new ReceptionPatientInfoListResource(patientInfo)
    this.#accidentInfo = new ReceptionAccidentInfoListResource(accidentInfo)
    this.#caregivingManagerInfo =
      (caregivingManagerInfo &&
        new ReceptionCaregivingManagerInfoResource(caregivingManagerInfo)) ||
      null
    this.#progressingStatus = progressingStatus
    this.#desiredCaregivingPeriod = desiredCaregivingPeriod
    this.#urgency = urgency
    this.#desiredCaregivingStartDate = desiredCaregivingStartDate
    this.#additionalRequests = additionalRequests
    this.#periodType = periodType
    this.#receivedDateTime = receivedDateTime
  }

  get id(): string {
    return this.#id
  }

  get insuranceInfo(): ReceptionInsuranceInfoListResource {
    return this.#insuranceInfo
  }

  get patientInfo(): ReceptionPatientInfoListResource {
    return this.#patientInfo
  }

  get accidentInfo(): ReceptionAccidentInfoListResource {
    return this.#accidentInfo
  }

  get caregivingManagerInfo(): ReceptionCaregivingManagerInfoResource | null {
    return this.#caregivingManagerInfo
  }

  get progressingStatus(): ReceptionProgressingStatus {
    return this.#progressingStatus
  }

  get desiredCaregivingStartDate(): Date {
    return new Date(this.#desiredCaregivingStartDate)
  }

  get urgency(): Urgency {
    return this.#urgency
  }

  get desiredCaregivingPeriod(): number | null {
    return this.#desiredCaregivingPeriod
  }

  get additionalRequests(): string {
    return this.#additionalRequests
  }

  get periodType(): PeriodType {
    return this.#periodType
  }

  get receivedDate(): Date {
    return new Date(this.#receivedDateTime)
  }
}

export default ReceptionListResource
