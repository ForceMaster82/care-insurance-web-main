import ReceptionCreateInput from '../CreateInput'
import {ReceptionCreateData} from '~types/form'
import {IReceptionCreate} from '~types/dto'
import {getIsoString} from '~utils/date'

const dataInput: ReceptionCreateData = {
  accidentInfo: {
    accidentDateTime: '2022-12-31',
    accidentNumber: '2022-1111111',
    admissionDateTime: '2022-12-31',
    claimType: 'ACCIDENT',
    hospitalRoomInfo: {
      city: ' ',
      hospitalAndRoom: '케어닥 병원 304호실',
      state: ' ',
    },
    patientDescription: '자력으로 호흡 불가능',
  },
  additionalRequests: '몸무게가 많이 나가서 힘이 센분이여야 합니다.',
  desiredCaregivingPeriod: '180',
  desiredCaregivingStartDate: '2022-12-31',
  fixedDesiredCaregivingPeriod: false,
  insuranceInfo: {
    caregivingLimitPeriod: '180',
    coverageId: '01GPD5EE21TGK5A5VCYWQ9Z73W',
    insuranceNumber: '11111-1111',
    subscriptionDate: '2022-12-31',
  },
  insuranceManagerInfo: {
    branchName: '메리츠 증권 평양 지점',
    phoneNumber: '01011114444',
    receptionistName: '김정은',
  },
  notifyCaregivingProgress: false,
  patientInfo: {
    age: '31',
    height: ' ',
    name: '임석민',
    nickname: '뽀리스',
    primaryContact: {
      phoneNumber: '01011112222',
      relationshipWithPatient: '본인',
    },
    secondaryContact: {
      phoneNumber: '01011113333',
      relationshipWithPatient: '형제',
    },
    sex: 'MALE',
    weight: ' ',
  },
  registerManagerInfo: {
    managingUserId: '01GP2EK7XN2T9PK2Q262FXX5VA',
  },
  urgency: 'URGENT',
}

const dataGetterOutput: ReceptionCreateData = {
  accidentInfo: {
    accidentDateTime: '2022-12-31',
    accidentNumber: '2022-1111111',
    admissionDateTime: '2022-12-31',
    claimType: 'ACCIDENT',
    hospitalRoomInfo: {
      city: ' ',
      hospitalAndRoom: '케어닥 병원 304호실',
      state: ' ',
    },
    patientDescription: '자력으로 호흡 불가능',
  },
  additionalRequests: '몸무게가 많이 나가서 힘이 센분이여야 합니다.',
  desiredCaregivingPeriod: '180',
  desiredCaregivingStartDate: '2022-12-31',
  fixedDesiredCaregivingPeriod: false,
  insuranceInfo: {
    caregivingLimitPeriod: '180',
    coverageId: '01GPD5EE21TGK5A5VCYWQ9Z73W',
    insuranceNumber: '11111-1111',
    subscriptionDate: '2022-12-31',
  },
  insuranceManagerInfo: {
    branchName: '메리츠 증권 평양 지점',
    phoneNumber: '01011114444',
    receptionistName: '김정은',
  },
  notifyCaregivingProgress: false,
  patientInfo: {
    age: '31',
    height: ' ',
    name: '임석민',
    nickname: '뽀리스',
    primaryContact: {
      phoneNumber: '01011112222',
      relationshipWithPatient: '본인',
    },
    secondaryContact: {
      phoneNumber: '01011113333',
      relationshipWithPatient: '형제',
    },
    sex: 'MALE',
    weight: ' ',
  },
  registerManagerInfo: {
    managingUserId: '01GP2EK7XN2T9PK2Q262FXX5VA',
  },
  urgency: 'URGENT',
}
const inputGetterOutput: IReceptionCreate = {
  accidentInfo: {
    accidentDateTime: getIsoString('2022-12-31'),
    accidentNumber: '2022-1111111',
    admissionDateTime: getIsoString('2022-12-31'),
    claimType: 'ACCIDENT',
    hospitalRoomInfo: {
      city: ' ',
      hospitalAndRoom: '케어닥 병원 304호실',
      state: ' ',
    },
    patientDescription: '자력으로 호흡 불가능',
  },
  additionalRequests: '몸무게가 많이 나가서 힘이 센분이여야 합니다.',
  desiredCaregivingPeriod: 180,
  desiredCaregivingStartDate: getIsoString('2022-12-31'),
  insuranceInfo: {
    caregivingLimitPeriod: 180,
    coverageId: '01GPD5EE21TGK5A5VCYWQ9Z73W',
    insuranceNumber: '11111-1111',
    subscriptionDate: getIsoString('2022-12-31'),
  },
  insuranceManagerInfo: {
    branchName: '메리츠 증권 평양 지점',
    phoneNumber: '01011114444',
    receptionistName: '김정은',
  },
  notifyCaregivingProgress: false,
  patientInfo: {
    age: 31,
    height: null,
    name: '임석민',
    nickname: '뽀리스',
    primaryContact: {
      phoneNumber: '01011112222',
      relationshipWithPatient: '본인',
    },
    secondaryContact: {
      phoneNumber: '01011113333',
      relationshipWithPatient: '형제',
    },
    sex: 'MALE',
    weight: null,
  },
  registerManagerInfo: {
    managingUserId: '01GP2EK7XN2T9PK2Q262FXX5VA',
  },
  urgency: 'URGENT',
}

const receptionCreateModel = new ReceptionCreateInput()

describe('접수 등록 생성 모델 test', () => {
  it('접수등록 create input의 getter를 테스트한다.', () => {
    receptionCreateModel.data = dataInput
    expect(receptionCreateModel.data).toStrictEqual(dataGetterOutput)
    expect(receptionCreateModel.input).toStrictEqual(inputGetterOutput)
  })
})
