import {ReceptionProgressingStatus} from '../../../types'
import {ICaregivingRoundReceptionInfo} from '../../../types/dto'
import ReceptionCaregivingManagerInfoResource from '../reception-caregiving-manager-info/Resource'

class CaregivingRoundReceptionInfoResource {
  #receptionId: string

  #receptionProgressingStatus: ReceptionProgressingStatus

  #accidentNumber: string

  #insuranceNumber: string

  #patientName: string

  #patientNickName: string
  #patientAge: number
  #patientSex: string
  #patientPrimaryPhoneNumber: string
  #hospitalAndRoom: string
  #patientDescription : string
  #receivedDateTime: string
  #managingUserId: string

  #expectedCaregivingStartDate: string | null

  #caregivingManagerInfo: ReceptionCaregivingManagerInfoResource | null

  constructor(data: ICaregivingRoundReceptionInfo) {
    const {
      receptionId,
      receptionProgressingStatus,
      accidentNumber,
      insuranceNumber,
      patientName,
      patientNickName,
      patientAge,
      patientSex,
      patientPrimaryPhoneNumber,
      hospitalAndRoom,
      patientDescription,
      receivedDateTime,
      managingUserId,
      expectedCaregivingStartDate,
      caregivingManagerInfo,
    } = data

    this.#receptionId = receptionId
    this.#receptionProgressingStatus = receptionProgressingStatus
    this.#accidentNumber = accidentNumber
    this.#insuranceNumber = insuranceNumber
    this.#patientName = patientName
    this.#patientNickName = patientNickName
    this.#patientAge = patientAge
    this.#patientSex = patientSex
    this.#patientPrimaryPhoneNumber = patientPrimaryPhoneNumber
    this.#hospitalAndRoom = hospitalAndRoom
    this.#patientDescription = patientDescription
    this.#receivedDateTime = receivedDateTime
    this.#managingUserId = managingUserId

    this.#expectedCaregivingStartDate = expectedCaregivingStartDate || null
    this.#caregivingManagerInfo =
      (caregivingManagerInfo &&
        new ReceptionCaregivingManagerInfoResource(caregivingManagerInfo)) ||
      null
  }

  get receptionId(): string {
    return this.#receptionId
  }

  get receptionProgressingStatus(): ReceptionProgressingStatus {
    return this.#receptionProgressingStatus
  }

  get accidentNumber(): string {
    return this.#accidentNumber
  }

  get insuranceNumber(): string {
    return this.#insuranceNumber
  }

  get patientName(): string {
    return this.#patientName
  }

  get patientNickName(): string {
    return this.#patientNickName
  }

  get patientAge(): number {
    return this.#patientAge
  }

  get patientSex(): string {
    return this.#patientSex
  }

  get patientPrimaryPhoneNumber(): string {
    return this.#patientPrimaryPhoneNumber
  }

  get hospitalAndRoom(): string {
    return this.#hospitalAndRoom
  }

  get patientDescription(): string {
    return this.#patientDescription
  }

  get receivedDateTime(): string {
    return this.#receivedDateTime
  }

  get managingUserId(): string {
    return this.#managingUserId
  }

  get expectedCaregivingStartDate(): Date | null {
    return (
      (this.#expectedCaregivingStartDate &&
        new Date(this.#expectedCaregivingStartDate)) ||
      null
    )
  }

  get caregivingManagerInfo(): ReceptionCaregivingManagerInfoResource | null {
    return this.#caregivingManagerInfo
  }
}

export default CaregivingRoundReceptionInfoResource
