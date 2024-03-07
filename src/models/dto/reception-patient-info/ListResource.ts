import {Sex} from '../../../types'
import {IReceptionListData} from '../../../types/dto'
import PatientContactResource from '../patient-contact/Resource'

class ReceptionPatientInfoListResource {
  #name: string

  #age: number

  #sex: Sex

  #primaryContact: PatientContactResource

  constructor(data: IReceptionListData['patientInfo']) {
    const {name, age, sex, primaryContact} = data

    this.#name = name
    this.#age = age
    this.#sex = sex
    this.#primaryContact = new PatientContactResource(primaryContact)
  }

  get name(): string {
    return this.#name
  }

  get age(): number {
    return this.#age
  }

  get sex(): Sex {
    return this.#sex
  }

  get primaryContact(): PatientContactResource {
    return this.#primaryContact
  }
}

export default ReceptionPatientInfoListResource
