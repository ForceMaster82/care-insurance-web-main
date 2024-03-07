import {ReceptionProgressingStatus} from '../../../types'
import {ICaregivingRoundReceptionInfo} from '../../../types/dto'
import ReceptionCaregivingManagerInfoResource from '../reception-caregiving-manager-info/Resource'

class CaregivingRoundReceptionInfoResource {
  #receptionId: string

  #receptionProgressingStatus: ReceptionProgressingStatus

  #accidentNumber: string

  #insuranceNumber: string

  #patientName: string

  #expectedCaregivingStartDate: string | null

  #caregivingManagerInfo: ReceptionCaregivingManagerInfoResource | null

  constructor(data: ICaregivingRoundReceptionInfo) {
    const {
      receptionId,
      receptionProgressingStatus,
      accidentNumber,
      insuranceNumber,
      patientName,
      expectedCaregivingStartDate,
      caregivingManagerInfo,
    } = data

    this.#receptionId = receptionId
    this.#receptionProgressingStatus = receptionProgressingStatus
    this.#accidentNumber = accidentNumber
    this.#insuranceNumber = insuranceNumber
    this.#patientName = patientName
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
