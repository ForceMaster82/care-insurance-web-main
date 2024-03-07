import PatientContactInput from '../Input'
import PatientContactResource from '../Resource'
import {PatientContactData} from '~types/form'

const dataInput: PatientContactData = {
  phoneNumber: '000-0000-0000',
  relationshipWithPatient: '부',
}

const dataGetterOutput: PatientContactData = {
  phoneNumber: '000-0000-0000',
  relationshipWithPatient: '부',
}

const inputGetterOutput: PatientContactData = {
  phoneNumber: '00000000000',
  relationshipWithPatient: '부',
}

const patientContactResource = new PatientContactResource({
  phoneNumber: '111-1111-1111',
  relationshipWithPatient: '모',
})

const patientContactInput = new PatientContactInput(patientContactResource)

describe('PatientContactInput model을 test 한다.', () => {
  it('PatientContactInput constructor을 test한다.', () => {
    expect(patientContactInput.phoneNumber).toBe(
      patientContactResource.phoneNumber,
    )
    expect(patientContactInput.relationshipWithPatient).toBe(
      patientContactResource.relationshipWithPatient,
    )
  })

  it('PatientContactInput getter를 테스트한다.', () => {
    patientContactInput.data = dataInput
    expect(patientContactInput.data).toStrictEqual(dataGetterOutput)
    expect(patientContactInput.input).toStrictEqual(inputGetterOutput)
  })
})
