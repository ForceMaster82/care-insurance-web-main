import {faker} from '@faker-js/faker'
import {isSameDay} from 'date-fns'
import {RECEPTION_PROGRESS_STATUS} from '../../../../constants'
import {ReceptionProgressingStatus} from '../../../../types'
import {ICaregivingRoundReceptionInfo} from '../../../../types/dto'
import CaregivingRoundReceptionInfoResource from '../Resource'
import ReceptionCaregivingManagerInfoResource from '../../reception-caregiving-manager-info/Resource'

const receptionProgressingStatusList = Object.keys(
  RECEPTION_PROGRESS_STATUS,
) as ReceptionProgressingStatus[]

const data: ICaregivingRoundReceptionInfo = {
  hospitalAndRoom: "",
  managingUserId: "",
  patientAge: 0,
  patientDescription: "",
  patientNickName: "",
  patientPrimaryPhoneNumber: "",
  patientSex: "",
  receivedDateTime: "",
  accidentNumber: faker.datatype.uuid(),
  caregivingManagerInfo: {
    managingUserId: faker.datatype.uuid(),
    organizationId: null,
    organizationType: 'INTERNAL',
  },
  expectedCaregivingStartDate: faker.date.soon().toISOString(),
  insuranceNumber: faker.datatype.uuid(),
  patientName: faker.name.fullName(),
  receptionId: faker.datatype.uuid(),
  receptionProgressingStatus: faker.helpers.arrayElement(
    receptionProgressingStatusList,
  )
}

describe('model / Resource / CaregivingRoundReceptionInfo', () => {
  const resource = new CaregivingRoundReceptionInfoResource(data)

  it('construct', () => {
    expect(resource.receptionId).toBe(data.receptionId)
    expect(resource.receptionProgressingStatus).toBe(
      data.receptionProgressingStatus,
    )
    expect(resource.accidentNumber).toBe(data.accidentNumber)
    expect(resource.insuranceNumber).toBe(data.insuranceNumber)
    expect(resource.patientName).toBe(data.patientName)
    expect(resource.caregivingManagerInfo).toBeInstanceOf(
      ReceptionCaregivingManagerInfoResource,
    )
    resource.expectedCaregivingStartDate &&
      data.expectedCaregivingStartDate &&
      expect(
        isSameDay(
          resource.expectedCaregivingStartDate,
          new Date(data.expectedCaregivingStartDate),
        ),
      ).toBe(true)
  })
})
