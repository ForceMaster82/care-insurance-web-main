import {isSameDay} from 'date-fns'
import CaregiverInfoResource from '../../caregiver-info/Resource'
import CaregivingRoundReceptionInfoResource from '../../caregiving-round-reception-info/Resource'
import CaregivingRoundInfoResource from '../Resource'
import {ICaregivingRoundInfo} from '~types/dto'

const responseData: ICaregivingRoundInfo = {
  billingProgressingStatus: 'NOT_STARTED',
  cancelDateTime: '2022-01-01T08:00:00Z',
  caregiverInfo: {
    accountInfo: {
      accountHolder: '정만길',
      accountNumber: '110-491-555888',
      bank: '신한은행',
    },
    birthDate: '1990-01-01',
    caregiverOrganizationId: null,
    commissionFee: 3000,
    dailyCaregivingCharge: 150_000,
    insured: true,
    name: '정만길',
    phoneNumber: '01012341234',
    sex: 'MALE',
  },
  caregivingProgressingStatus: 'CAREGIVING_IN_PROGRESS',
  caregivingRoundClosingReasonDetail: '그냥 그만 둠',
  caregivingRoundClosingReasonType: 'FINISHED',
  caregivingRoundNumber: 1,
  endDateTime: '2022-01-01T08:00:00Z',
  id: '01GRN4YX164VKDX72KJ3M4F2X1',
  receptionInfo: {
    accidentNumber: '2022-1111111',
    caregivingManagerInfo: {
      managingUserId: '01GQ23MVTBAKS526S0WGS9CS0A',
      organizationId: null,
      organizationType: 'INTERNAL',
    },
    expectedCaregivingStartDate: '2023-01-01',
    insuranceNumber: '11111-1111',
    patientName: '홍길동',
    receptionId: '01GRNCZZMFT18XYC2J85QFKKGP',
    receptionProgressingStatus: 'CAREGIVING_IN_PROGRESS',
    patientNickName: '',
    patientAge: 0,
    patientSex: '',
    patientPrimaryPhoneNumber: '',
    hospitalAndRoom: '',
    patientDescription: '',
    receivedDateTime: '',
    managingUserId: ''
  },
  remarks: '1회차 해보고 만족해서 계속한다고 함.',
  settlementProgressingStatus: 'NOT_STARTED',
  startDateTime: '2022-01-01T08:00:00Z',
}

const resource = new CaregivingRoundInfoResource(responseData)

describe('caregivingRoundInfoResource ', () => {
  it('constructor test', () => {
    expect(resource.billingProgressingStatus).toBe(
      responseData.billingProgressingStatus,
    )
    resource.cancelDateTime &&
      responseData.cancelDateTime &&
      expect(
        isSameDay(
          resource.cancelDateTime,
          new Date(responseData.cancelDateTime),
        ),
      ).toBe(true)
    expect(resource.caregiverInfo).toBeInstanceOf(CaregiverInfoResource)
    expect(resource.caregivingProgressingStatus).toBe(
      responseData.caregivingProgressingStatus,
    )
    expect(resource.caregivingRoundClosingReasonDetail).toBe(
      responseData.caregivingRoundClosingReasonDetail,
    )
    expect(resource.caregivingRoundClosingReasonType).toBe(
      responseData.caregivingRoundClosingReasonType,
    )
    expect(resource.caregivingRoundNumber).toBe(
      responseData.caregivingRoundNumber,
    )
    resource.endDateTime &&
      responseData.endDateTime &&
      expect(
        isSameDay(resource.endDateTime, new Date(responseData.endDateTime)),
      ).toBe(true)
    expect(resource.id).toBe(responseData.id)
    expect(resource.receptionInfo).toBeInstanceOf(
      CaregivingRoundReceptionInfoResource,
    )
    expect(resource.remarks).toBe(responseData.remarks)
  })
})
