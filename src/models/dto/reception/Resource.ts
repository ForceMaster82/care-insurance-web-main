import {PeriodType, ReceptionProgressingStatus, Urgency} from '../../../types'
import {IReception} from '../../../types/dto'
import ReceptionAccidentInfoResource from '../reception-accident-info/Resource'
import ReceptionCaregivingManagerInfoResource from '../reception-caregiving-manager-info/Resource'
import ReceptionInsuranceInfoResource from '../reception-insurance-info/Resource'
import ReceptionInsuranceManagerInfoResource from '../reception-insurance-manager-info/Resource'
import ReceptionPatientInfoResource from '../reception-patient-info/Resource'
import ReceptionRegisterManagerInfoResource from '../reception-register-manager-info/Resource'

class ReceptionResource {
  #id: string

  #insuranceInfo: ReceptionInsuranceInfoResource

  #patientInfo: ReceptionPatientInfoResource

  #accidentInfo: ReceptionAccidentInfoResource

  #insuranceManagerInfo: ReceptionInsuranceManagerInfoResource

  #caregivingManagerInfo: ReceptionCaregivingManagerInfoResource | null

  #registerManagerInfo: ReceptionRegisterManagerInfoResource

  #desiredCaregivingStartDate: string

  #urgency: Urgency

  #desiredCaregivingPeriod: number | null

  #additionalRequests: string

  #expectedCaregivingStartDate: string | null

  #expectedCaregivingLimitDate: string

  #progressingStatus: ReceptionProgressingStatus

  #periodType: PeriodType

  #receivedDateTime: string

  #reasonForCancellation: string | null

  #canceledDateTime: string | null

  #notifyCaregivingProgress: boolean

  constructor(data: IReception) {
    const {
      id,
      insuranceInfo,
      patientInfo,
      accidentInfo,
      insuranceManagerInfo,
      caregivingManagerInfo,
      registerManagerInfo,
      desiredCaregivingStartDate,
      urgency,
      desiredCaregivingPeriod,
      additionalRequests,
      expectedCaregivingStartDate,
      expectedCaregivingLimitDate,
      progressingStatus,
      periodType,
      receivedDateTime,
      reasonForCancellation,
      canceledDateTime,
      notifyCaregivingProgress,
    } = data

    this.#id = id
    this.#insuranceInfo = new ReceptionInsuranceInfoResource(insuranceInfo)
    this.#patientInfo = new ReceptionPatientInfoResource(patientInfo)
    this.#accidentInfo = new ReceptionAccidentInfoResource(accidentInfo)
    this.#insuranceManagerInfo = new ReceptionInsuranceManagerInfoResource(
      insuranceManagerInfo,
    )
    this.#caregivingManagerInfo =
      (caregivingManagerInfo &&
        new ReceptionCaregivingManagerInfoResource(caregivingManagerInfo)) ||
      null
    this.#registerManagerInfo = new ReceptionRegisterManagerInfoResource(
      registerManagerInfo,
    )
    this.#desiredCaregivingStartDate = desiredCaregivingStartDate
    this.#urgency = urgency
    this.#desiredCaregivingPeriod = desiredCaregivingPeriod
    this.#additionalRequests = additionalRequests
    this.#expectedCaregivingStartDate = expectedCaregivingStartDate
    this.#expectedCaregivingLimitDate = expectedCaregivingLimitDate
    this.#progressingStatus = progressingStatus
    this.#periodType = periodType
    this.#receivedDateTime = receivedDateTime
    this.#reasonForCancellation = reasonForCancellation
    this.#canceledDateTime = canceledDateTime
    this.#notifyCaregivingProgress = Boolean(notifyCaregivingProgress)
  }

  get id(): string {
    return this.#id
  }

  get insuranceInfo(): ReceptionInsuranceInfoResource {
    return this.#insuranceInfo
  }

  get patientInfo(): ReceptionPatientInfoResource {
    return this.#patientInfo
  }

  get accidentInfo(): ReceptionAccidentInfoResource {
    return this.#accidentInfo
  }

  get insuranceManagerInfo(): ReceptionInsuranceManagerInfoResource {
    return this.#insuranceManagerInfo
  }

  get caregivingManagerInfo(): ReceptionCaregivingManagerInfoResource | null {
    return this.#caregivingManagerInfo
  }

  get registerManagerInfo(): ReceptionRegisterManagerInfoResource {
    return this.#registerManagerInfo
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

  get additionalRequest(): string {
    return this.#additionalRequests
  }

  get expectedCaregivingStartDate(): Date | null {
    return (
      (this.#expectedCaregivingStartDate &&
        new Date(this.#expectedCaregivingStartDate)) ||
      null
    )
  }

  get expectedCaregivingLimitDate(): Date {
    return new Date(this.#expectedCaregivingLimitDate)
  }

  get progressingStatus(): ReceptionProgressingStatus {
    return this.#progressingStatus
  }

  get periodType(): PeriodType {
    return this.#periodType
  }

  get receivedDateTime(): Date {
    return new Date(this.#receivedDateTime)
  }

  get reasonForCancellation(): string {
    return this.#reasonForCancellation || ''
  }

  get canceledDateTime(): Date | null {
    return (this.#canceledDateTime && new Date(this.#canceledDateTime)) || null
  }

  get notifyCaregivingProgress(): boolean {
    return this.#notifyCaregivingProgress
  }
}

export default ReceptionResource
