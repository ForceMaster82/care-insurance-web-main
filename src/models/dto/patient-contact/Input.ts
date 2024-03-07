import {IPatientContact} from '../../../types/dto'
import {PatientContactData} from '../../../types/form'
import {
  formatPhoneNumberWithHyphen,
  removeNotNumber,
} from '../../../utils/formatter'
import PatientContactResource from './Resource'

class PatientContactInput {
  phoneNumber: string

  relationshipWithPatient: string

  constructor(resource?: PatientContactResource) {
    this.phoneNumber =
      (resource && formatPhoneNumberWithHyphen(resource.phoneNumber)) || ''
    this.relationshipWithPatient = resource?.relationshipWithPatient || ''
  }

  get data(): PatientContactData {
    return {
      phoneNumber: this.phoneNumber,
      relationshipWithPatient: this.relationshipWithPatient,
    }
  }

  set data(data: PatientContactData) {
    const {phoneNumber, relationshipWithPatient} = data

    this.phoneNumber = phoneNumber
    this.relationshipWithPatient = relationshipWithPatient
  }

  get input(): IPatientContact {
    return {
      phoneNumber: removeNotNumber(this.phoneNumber),
      relationshipWithPatient: this.relationshipWithPatient,
    }
  }
}

export default PatientContactInput
