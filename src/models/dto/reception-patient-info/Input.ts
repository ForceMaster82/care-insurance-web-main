import {Sex} from '../../../types'
import {IReceptionPatientInfo} from '../../../types/dto'
import {ReceptionPatientInfoData} from '../../../types/form'
import PatientContactInput from '../patient-contact/Input'
import ReceptionPatientInfoResource from './Resource'

class ReceptionPatientInfoInput {
  name: string

  nickname: string

  age: string

  sex: Sex

  height: string

  weight: string

  primaryContact: PatientContactInput

  secondaryContact: PatientContactInput

  constructor(resource?: ReceptionPatientInfoResource) {
    this.name = resource?.name || ''
    this.nickname = resource?.nickname || ''
    this.age = resource?.age.toString() || ''
    this.sex = resource?.sex || 'FEMALE'
    this.height = resource?.height?.toString() || ''
    this.weight = resource?.weight?.toString() || ''
    this.primaryContact = new PatientContactInput(resource?.primaryContact)
    this.secondaryContact =
      (resource?.secondaryContact &&
        new PatientContactInput(resource.secondaryContact)) ||
      new PatientContactInput()
  }

  get data(): ReceptionPatientInfoData {
    return {
      age: this.age,
      height: this.height,
      name: this.name,
      nickname: this.nickname,
      primaryContact: this.primaryContact.data,
      secondaryContact: this.secondaryContact?.data || null,
      sex: this.sex,
      weight: this.weight,
    }
  }

  set data(data: ReceptionPatientInfoData) {
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

    this.name = name
    this.nickname = nickname
    this.age = age
    this.sex = sex
    this.height = height
    this.weight = weight
    this.primaryContact.data = primaryContact
    this.secondaryContact.data = secondaryContact
  }

  get input(): IReceptionPatientInfo {
    return {
      age: Number(this.age),
      height: (Boolean(this.height) && Number(this.height)) || null,
      name: this.name,
      nickname: this.nickname,
      primaryContact: this.primaryContact.input,
      secondaryContact:
        (Boolean(
          this.secondaryContact.input.phoneNumber &&
            this.secondaryContact.input.relationshipWithPatient,
        ) &&
          this.secondaryContact.input) ||
        null,
      sex: this.sex as Sex,
      weight: (Boolean(this.weight) && Number(this.weight)) || null,
    }
  }
}

export default ReceptionPatientInfoInput
