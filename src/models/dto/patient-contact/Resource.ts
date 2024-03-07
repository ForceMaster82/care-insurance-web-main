import {IPatientContact} from '../../../types/dto'

class PatientContactResource {
  #phoneNumber: string

  #relationshipWithPatient: string

  constructor(data: IPatientContact) {
    const {phoneNumber, relationshipWithPatient} = data

    this.#phoneNumber = phoneNumber
    this.#relationshipWithPatient = relationshipWithPatient
  }

  get phoneNumber(): string {
    return this.#phoneNumber
  }

  get relationshipWithPatient(): string {
    return this.#relationshipWithPatient
  }
}

export default PatientContactResource
