import {faker} from '@faker-js/faker'
import {ICaregivingRound} from '../../../../types/dto'
import CaregivingRoundResource from '../Resource'
import CaregivingRoundReceptionInfoResource from '../../caregiving-round-reception-info/Resource'

const data: {
  startDateTime: string;
  receptionInfo: {
    patientName: string;
    patientNickName: string;
    patientSex: string;
    receptionProgressingStatus: string;
    patientDescription: string;
    expectedCaregivingStartDate: string;
    managingUserId: string;
    caregivingManagerInfo: { organizationId: null; organizationType: string; managingUserId: string };
    receptionId: string;
    hospitalAndRoom: string;
    accidentNumber: string;
    insuranceNumber: string;
    receivedDateTime: string;
    patientAge: number;
    patientPrimaryPhoneNumber: string
  };
  billingProgressingStatus: string;
  caregivingRoundNumber: number;
  caregivingProgressingStatus: string;
  id: string;
  settlementProgressingStatus: string
} = {
  billingProgressingStatus: 'COMPLETED_DEPOSIT',
  caregivingProgressingStatus: 'CANCELED_WHILE_REMATCHING',
  caregivingRoundNumber: faker.datatype.number(),
  id: faker.datatype.uuid(),
  receptionInfo: {
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
    receptionProgressingStatus: 'RECEIVED',
    patientNickName: '',
    patientAge: 0,
    patientSex: '',
    patientPrimaryPhoneNumber: '',
    hospitalAndRoom: '',
    patientDescription: '',
    receivedDateTime: '',
    managingUserId: ''
  },
  settlementProgressingStatus: 'COMPLETED',
  startDateTime: faker.date.soon().toISOString(),
}
export default data;

describe('model / Resource / CaregivingRound', () => {
  const resource = new CaregivingRoundResource(data)

  it('construct', () => {
    expect(resource.id).toBe(data.id)
    expect(resource.receptionInfo).toBeInstanceOf(
      CaregivingRoundReceptionInfoResource,
    )
    expect(resource.caregivingRoundNumber).toBe(data.caregivingRoundNumber)
    expect(resource.caregivingProgressingStatus).toBe(
      data.caregivingProgressingStatus,
    )
    expect(resource.settlementProgressingStatus).toBe(
      data.settlementProgressingStatus,
    )
    expect(resource.billingProgressingStatus).toBe(
      data.billingProgressingStatus,
    )
    expect(resource.startDateTime?.toISOString()).toBe(data.startDateTime)
  })
})
