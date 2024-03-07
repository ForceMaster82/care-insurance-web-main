import {Sex} from '../../../types'
import {IReceptionPatientInfo} from '../../../types/dto'
import PatientContactResource from '../patient-contact/Resource'

class ReceptionPatientInfoResource {
  #name: string

  #nickname: string | null

  #age: number

  #sex: Sex

  #height: number | null

  #weight: number | null

  #primaryContact: PatientContactResource

  #secondaryContact: PatientContactResource | null

  constructor(data: IReceptionPatientInfo) {
    const {
      name,
      nickname,
      age,
      sex,
      height,
      weight,
      primaryContact,
      secondaryContact,
    } = data

    this.#name = name
    this.#nickname = nickname
    this.#age = age
    this.#sex = sex
    this.#height = height
    this.#weight = weight
    this.#primaryContact = new PatientContactResource(primaryContact)
    this.#secondaryContact =
      (secondaryContact && new PatientContactResource(secondaryContact)) || null
  }

  get name(): string {
    return this.#name
  }

  get nickname(): string {
    return this.#nickname || ''
  }

  get age(): number {
    return this.#age
  }

  get sex(): Sex {
    return this.#sex
  }

  get height(): number | null {
    return this.#height
  }

  get weight(): number | null {
    return this.#weight
  }

  get primaryContact(): PatientContactResource {
    return this.#primaryContact
  }

  get secondaryContact(): PatientContactResource | null {
    return this.#secondaryContact
  }
}

export default ReceptionPatientInfoResource
