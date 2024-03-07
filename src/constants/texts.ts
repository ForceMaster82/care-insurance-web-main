/* eslint-disable sort-keys-fix/sort-keys-fix */
import {
  BillingProgressingStatus,
  CaregivingChargeModifiedProperty,
  CaregivingMessageSendingStatus,
  CaregivingProgressingStatus,
  CaregivingRoundClosingReasonType,
  CaregivingRoundModifiedProperty,
  CaregivingSatisfactionSurveyReservationStatus,
  ClaimType,
  OrganizationType,
  PeriodType,
  ReceptionModifiedProperty,
  ReceptionProgressingStatus,
  RenewalType,
  SearchCategory,
  SettlementProgressingStatus,
  Sex,
  TransactionType,
  Urgency,
} from '../types'

export const URGENCY: Record<Urgency, string> = {
  NORMAL: '일반',
  URGENT: '긴급',
} as const

export const PERIOD_TYPE: Record<PeriodType, string> = {
  NORMAL: '일반',
  SHORT: '단기',
} as const

export const COVERAGE_RENEWAL_TYPE: Record<RenewalType, string> = {
  TEN_YEAR: '10년형',
  THREE_YEAR: '3년형',
} as const

export enum NOTIFY_CAREGIVING_PROGRESS {
  '미수신',
  '수신',
}

export const CAREGIVING_SATISFACTION_SURVEY_RESERVATION_STATUS: Record<
  CaregivingSatisfactionSurveyReservationStatus,
  string
> = {
  FAILED: '예약 실패',
  READY: '예약 전',
  RESERVED: '예약 완료',
} as const

export const CAREGIVING_MESSAGE_SENDING_STATUS: Record<
  CaregivingMessageSendingStatus,
  string
> = {
  FAILED: '발송 실패',
  READY: '미발송',
  SENT: '발송 완료',
} as const

export enum IS_CANCEL_AFTER_ARRIVED {
  '해당 안함',
  '해당',
}

export const CAREGIVING_CHARGE_MODIFIED_PROPERTY: Record<
  CaregivingChargeModifiedProperty,
  string
> = {
  ADDITIONAL_CHARGE_1: '기타 비용 1',
  ADDITIONAL_CHARGE_2: '기타 비용 2',
  ADDITIONAL_CHARGE_3: '기타 비용 3',
  ADDITIONAL_HOURS_CHARGE: '추가시간',
  CAREGIVER_INSURANCE_FEE: '배상책임보험',
  COMMISSION_FEE: '수수료',
  COVID_19_TESTING_COST: '코로나 검사비',
  EXPECTED_SETTLEMENT_DATE: '정산 예정일자',
  HOLIDAY_CHARGE: '명절 근무',
  IS_CANCEL_AFTER_ARRIVED: '도착 후 취소 여부',
  MEAL_COST: '식대',
  OUTSTANDING_AMOUNT: '간병인 미지급',
  PATIENT_CONDITION_CHARGE: '환자상태',
  TRANSPORTATION_FEE: '교통비',
  VACATION_CHARGE: '유급휴가',
} as const

export enum CAREGIVER_INSURED {
  '가입 안함',
  '가입',
}

export const CAREGIVING_ROUND_MODIFIED_PROPERTY: Record<
  CaregivingRoundModifiedProperty,
  string
> = {
  CAREGIVER_ACCOUNT_BANK: '간병인 계좌정보 (은행명)',
  CAREGIVER_ACCOUNT_HOLDER: '간병인 계좌정보 (예금주)',
  CAREGIVER_ACCOUNT_NUMBER: '간병인 계좌정보 (계좌번호)',
  CAREGIVER_BIRTH_DATE: '간병인 생년월일',
  CAREGIVER_INSURED: '책임보험 가입 여부',
  CAREGIVER_NAME: '간병인 이름',
  CAREGIVER_ORGANIZATION_ID: '간병인 단체 유형',
  CAREGIVER_PHONE_NUMBER: '간병인 연락처',
  CAREGIVER_SEX: '간병인 성별',
  COMMISSION_FEE: '수수료',
  DAILY_CAREGIVING_CHARGE: '일당',
  END_DATE_TIME: '종료일시',
  REMARKS: '메모',
  START_DATE_TIME: '시작일시',
} as const

export const RECEPTION_MODIFIED_PROPERTY: Record<
  ReceptionModifiedProperty,
  string
> = {
  ACCIDENT_DATE_TIME: '사고일시',
  ACCIDENT_NUMBER: '사고번호',
  ADDITIONAL_REQUESTS: '요청사항',
  ADMISSION_DATE_TIME: '입원일시',
  CAREGIVING_LIMIT_PERIOD: '한도일',
  CAREGIVING_MANAGING_USER_ID: '배정 담당자 (이름)',
  CAREGIVING_ORGANIZATION_ID: '배정 담당자 (단체)',
  CAREGIVING_ORGANIZATION_TYPE: '배정 담당자 (단체 유형)',
  CLAIM_TYPE: '청구유형',
  COVERAGE_ID: '가입담보',
  DESIRED_CAREGIVING_PERIOD: '희망기간',
  DESIRED_CAREGIVING_START_DATE: '희망일자',
  EXPECTED_CAREGIVING_LIMIT_DATE: '예상 한도일',
  EXPECTED_CAREGIVING_START_DATE: '간병 예상일자',
  HOSPITAL_AND_ROOM: '병실정보 (병원/병실)',
  HOSPITAL_CITY: '병실정보 (시/군/구)',
  HOSPITAL_STATE: '병실정보 (시/도)',
  INSURANCE_NUMBER: '증권번호',
  NOTIFY_CAREGIVING_PROGRESS: '알림톡/비즈콜 수신',
  PATIENT_AGE: '나이',
  PATIENT_DESCRIPTION: '환자상태',
  PATIENT_HEIGHT: '키',
  PATIENT_NAME: '이름',
  PATIENT_NICKNAME: '닉네임',
  PATIENT_PRIMARY_PHONE_NUMBER: '연락처 I (전화번호)',
  PATIENT_PRIMARY_RELATIONSHIP: '연락처 I (관계)',
  PATIENT_SECONDARY_PHONE_NUMBER: '연락처 II (전화번호)',
  PATIENT_SECONDARY_RELATIONSHIP: '연락처 II (관계)',
  PATIENT_SEX: '성별',
  PATIENT_WEIGHT: '몸무게',
  RECEPTION_APPLICATION_FILE_NAME: '간병인 신청서',
  SUBSCRIPTION_DATE: '청약일자',
} as const

export const TRANSACTION_TYPE_MESSAGE: Record<TransactionType, string> = {
  DEPOSIT: '입금',
  WITHDRAWAL: '출금',
}

export const NOT_EXPOSED_TEXT = '미노출'

export const VALID_INPUT_MESSAGE = '정상적으로 입력되었습니다.'

export const EMPTY_VALUE_TEXT = '-'

export const INSURANCE_COMPANY = '메리츠화재'

/** 접수 진행 상태 */
export const RECEPTION_PROGRESS_STATUS: Record<
  ReceptionProgressingStatus,
  string
> = {
  CANCELED: '접수 취소',
  CANCELED_BY_MEDICAL_REQUEST: '개인구인(의료) 취소',
  CANCELED_BY_PERSONAL_CAREGIVER: '개인구인 취소',
  CANCELED_WHILE_MATCHING: '매칭 중 취소',
  CAREGIVING_IN_PROGRESS: '진행 중',
  COMPLETED: '완료',
  MATCHING: '매칭 중',
  PENDING: '접수 보류',
  PENDING_MATCHING: '매칭 보류',
  RECEIVED: '접수',
} as const

/** 접수 취소 사유 */
export const RECEPTION_CANCELLATION_REASON: Record<
  ReceptionProgressingStatus,
  string
> = {
  CANCELED: '간병 서비스 신청 취소',
  CANCELED_BY_MEDICAL_REQUEST: '석션 등 의료 행위',
  CANCELED_BY_PERSONAL_CAREGIVER: '개인구인 간병인 이용 예정',
  CANCELED_WHILE_MATCHING: '매칭 중 취소',
  CAREGIVING_IN_PROGRESS: '',
  COMPLETED: '',
  MATCHING: '',
  PENDING: '',
  PENDING_MATCHING: '',
  RECEIVED: '',
} as const

/** 간병 회차 진행 상태 */
export const CAREGIVING_PROGRESSING_STATUS: Record<
  CaregivingProgressingStatus,
  string
> = {
  CANCELED_WHILE_REMATCHING: '리매칭 중 취소',
  CAREGIVING_IN_PROGRESS: '간병 중',
  COMPLETED: '간병 종료',
  COMPLETED_RESTARTING: '중단(계속)',
  COMPLETED_USING_PERSONAL_CAREGIVER: '개인구인 종료',
  NOT_STARTED: '미진행',
  PENDING_REMATCHING: '리매칭 보류',
  RECONCILIATION_COMPLETED: '정산대사 완료',
  REMATCHING: '리매칭 중',
} as const

/** 간병 회차 정산 상태 */
export const SETTLEMENT_PROGRESSING_STATUS: Record<
  SettlementProgressingStatus,
  string
> = {
  COMPLETED: '정산 완료',
  CONFIRMED: '정산 확인',
  NOT_STARTED: '미정산',
  WAITING: '정산 대기',
} as const

/** 간병 회차 청구 상태 */
export const BILLING_PROGRESSING_STATUS: Record<
  BillingProgressingStatus,
  string
> = {
  COMPLETED_DEPOSIT: '입금 완료',
  NOT_STARTED: '미청구',
  OVER_DEPOSIT: '과입금',
  UNDER_DEPOSIT: '미입금',
  WAITING_DEPOSIT: '미수',
  WAITING_FOR_BILLING: '청구 대기',
} as const

/** 청구 유형 (질병, 상해) */
export const CLAIM_TYPE: Record<ClaimType, string> = {
  ACCIDENT: '상해',
  SICKNESS: '질병',
} as const

/** 성별 */
export const SEX: Record<Sex, string> = {
  FEMALE: '여자',
  MALE: '남자',
} as const

/** 업체 구분 */
export const ORGANIZATION_TYPE: Record<OrganizationType, string> = {
  AFFILIATED: '제휴사',
  INTERNAL: '케어닥',
  ORGANIZATION: '협회',
} as const

/** 검색 카테고리 */
export const SEARCH_CATEGORY: Record<SearchCategory, string> = {
  accidentNumber: '사고번호',
  caregivingManagerName: '담당자',
  insuranceNumber: '증권번호',
  organizationName: '간병인 소속',
  patientName: '고객명',
  patientPhoneNumber: '연락처',
} as const

/** 간병 회차 종료 사유 */
export const CAREGIVING_ROUND_CLOSING_REASON_TYPE: Record<
  CaregivingRoundClosingReasonType,
  string
> = {
  FINISHED: '간병 서비스 정상 종료',
  FINISHED_USING_PERSONAL_CAREGIVER: '개인구인 간병인 이용 예정',
  FINISHED_CONTINUE: '계속 건 추가',
  FINISHED_CHANGING_CAREGIVER: '(리매칭) 간병인 교체',
  FINISHED_CHANGING_HOSPITAL: '(리매칭) 병원 전원',
  FINISHED_CHANGING_CAREGIVER_AND_HOSPITAL: '(리매칭) 간병인 교체 & 병원 전원',
  FINISHED_RESTARTING: '(리매칭) 간병 중단 중 청구',
  CANCELED_USING_PERSONAL_CAREGIVER: '개인구인 간병인 이용 예정',
  CANCELED_WHILE_REMATCHING: '리매칭 중 취소',
}
