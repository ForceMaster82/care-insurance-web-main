import {ClaimType} from '../../../types'
import {IReceptionAccidentInfo} from '../../../types/dto'
import HospitalRoomInfoResource from '../hospital-room-info/Resource'

class ReceptionAccidentInfoResource {
  #accidentNumber: string

  #accidentDateTime: string

  #claimType: ClaimType

  #patientDescription: string

  #admissionDateTime: string

  #hospitalRoomInfo: HospitalRoomInfoResource

  constructor(data: IReceptionAccidentInfo) {
    const {
      accidentNumber,
      accidentDateTime,
      claimType,
      patientDescription,
      admissionDateTime,
      hospitalRoomInfo,
    } = data

    this.#accidentNumber = accidentNumber
    this.#accidentDateTime = accidentDateTime
    this.#claimType = claimType
    this.#patientDescription = patientDescription
    this.#admissionDateTime = admissionDateTime
    this.#hospitalRoomInfo = new HospitalRoomInfoResource(hospitalRoomInfo)
  }

  get accidentNumber(): string {
    return this.#accidentNumber
  }

  get accidentDateTime(): Date {
    return new Date(this.#accidentDateTime)
  }

  get claimType(): ClaimType {
    return this.#claimType
  }

  get patientDescription(): string {
    return this.#patientDescription
  }

  get admissionDateTime(): Date {
    return new Date(this.#admissionDateTime)
  }

  get hospitalRoomInfo(): HospitalRoomInfoResource {
    return this.#hospitalRoomInfo
  }
}

export default ReceptionAccidentInfoResource
