import {Constraints} from '../types'
import {ReceptionCreateData, ReceptionUpdateData} from '~types/form'

const receptionConstraints = {
  'accidentInfo.accidentDateTime': {
    required: {
      message: '사고일시를 입력해 주세요.',
      value: true,
    },
  },
  'accidentInfo.accidentNumber': {
    required: {
      message: '사고번호를 입력해 주세요.',
      value: true,
    },
  },
  'accidentInfo.admissionDateTime': {
    required: {
      message: '입원일시를 입력해 주세요.',
      value: true,
    },
  },
  'accidentInfo.claimType': {
    required: {
      message: '청구유형을 선택해 주세요.',
      value: true,
    },
  },
  'accidentInfo.hospitalRoomInfo.hospitalAndRoom': {
    required: {
      message: '병실정보를 입력해 주세요.',
      value: true,
    },
  },
  desiredCaregivingStartDate: {
    required: {
      message: '희망일자를 입력해 주세요.',
      value: true,
    },
  },
  'insuranceInfo.caregivingLimitPeriod': {
    required: {
      message: '한도일을 입력해 주세요.',
      value: true,
    },
  },
  'insuranceInfo.coverageId': {
    required: {
      message: '가입담보를 선택해 주세요.',
      value: true,
    },
  },
  'insuranceInfo.insuranceNumber': {
    required: {
      message: '증권번호를 입력해 주세요.',
      value: true,
    },
  },
  'insuranceInfo.subscriptionDate': {
    required: {
      message: '청약일자를 입력해 주세요.',
      value: true,
    },
  },
  'patientInfo.age': {
    required: {
      message: '고객의 나이를 입력해 주세요.',
      value: true,
    },
  },
  'patientInfo.name': {
    required: {
      message: '고객명을 입력해 주세요.',
      value: true,
    },
  },
  'patientInfo.primaryContact.phoneNumber': {
    required: {
      message: '연락처 I의 정보를 모두 입력해 주세요.',
      value: true,
    },
  },
  'patientInfo.primaryContact.relationshipWithPatient': {
    required: {
      message: '연락처 I의 정보를 모두 입력해 주세요.',
      value: true,
    },
  },
  'patientInfo.sex': {
    required: {
      message: '고객의 성별을 선택해 주세요.',
      value: true,
    },
  },
}

export const receptionUpdateConstraints: Constraints<ReceptionUpdateData> = {
  ...receptionConstraints,
  'accidentInfo.hospitalRoomInfo': {
    validate: ({hospitalAndRoom}) =>
      Boolean(hospitalAndRoom) || '병실정보를 입력해 주세요.',
  },
  desiredCaregivingPeriod: {
    required: {
      message: '희망기간을 입력해 주세요.',
      value: true,
    },
  },
  expectedCaregivingLimitDate: {
    required: {
      message: '예상 한도일자를 입력해 주세요.',
      value: true,
    },
  },
}

export const receptionCreateConstraints: Constraints<ReceptionCreateData> = {
  ...receptionConstraints,
  desiredCaregivingPeriod: {
    validate: (value, {fixedDesiredCaregivingPeriod}) => {
      if (fixedDesiredCaregivingPeriod) {
        return true
      }
      return Boolean(value) || '희망기간을 입력해 주세요.'
    },
  },
  'insuranceManagerInfo.branchName': {
    required: {
      message: '보험사 접수부점을 입력해 주세요.',
      value: true,
    },
  },
  'insuranceManagerInfo.receptionistName': {
    required: {
      message: '보험자 접수자의 이름을 입력해 주세요.',
      value: true,
    },
  },
  receivedDateTime: {
    required: {
      message: '접수 등록일자를 입력해 주세요.',
      value: true,
    },
  },
}
