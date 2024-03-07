import type {FieldPath, FieldValues, RegisterOptions} from 'react-hook-form'
import {JwtPayload} from 'jwt-decode'
import {IPaginationResponse} from './dto'

export type ReconciliationIssuedType = 'FINISH' | 'ADDITIONAL' | 'TRANSACTION'

export type MessageStatusesCaregivingSatisfactionSurveyPageSearchFilterKey =
  | 'DATE'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type MessageStatusesCaregivingProgressPageSearchFilterKey =
  | 'DATE'
  | 'SENDING_STATUS'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type MessageStatusesCaregivingStartPageSearchFilterKey =
  | 'DATE'
  | 'SENDING_STATUS'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type StatisticMonthlyRegionalCaregivingPageSearchFilterKey =
  | 'YEAR'
  | 'MONTH'
  | 'STATE'
  | 'CITY'

export type StatisticMonthlyReconciliationPageSearchFilterKey =
  | 'RECONCILED_YEAR'
  | 'RECONCILED_MONTH'

export type StatisticDailyBillingTransactionPageSearchFilterKey = 'DATE'

export type StatisticDailySettlementTransactionPageSearchFilterKey = 'DATE'

export type ReconciliationPageSearchFilterKey =
  | 'ISSUED_AT_FROM'
  | 'ISSUED_AT_UNTIL'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type BillingInTransactionPageSearchFilterKey =
  | 'TRANSACTION_DATE_FROM'
  | 'TRANSACTION_DATE_UNTIL'
  | 'BILLING_PROGRESSING_STATUS'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type BillingWaitingDepositPageSearchFilterKey =
  | 'BILLING_DATE_FROM'
  | 'BILLING_DATE_UNTIL'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type BillingWaitingPageSearchFilterKey =
  | 'USED_PERIOD_FROM'
  | 'USED_PERIOD_UNTIL'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type SettlementInTransactionPageSearchFilterKey =
  | 'TRANSACTION_DATE_FROM'
  | 'TRANSACTION_DATE_UNTIL'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type SettlementWaitingPageSearchFilterkey =
  | 'FROM'
  | 'UNTIL'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'

export type CaregivingRoundsPageSearchFilterKey =
  | 'FROM'
  | 'UNTIL'
  | 'EXPECTED_CAREGIVING_START_DATE'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'
  | 'RECEPTION_PROGRESSING_STATUS'
  | 'CAREGIVING_PROGRESSING_STATUS'
  | 'SETTLEMENT_PROGRESSING_STATUS'
  | 'BILLING_PROGRESSING_STATUS'

export type ReceptionsPageSearchFilterKey =
  | 'FROM'
  | 'UNTIL'
  | 'SEARCH_CATEGORY'
  | 'SEARCH_KEYWORD'
  | 'CANCELED_RECEPTION'
  | 'EXCLUDE_COMPLETED'
  | 'ORGANIZATION_TYPE'
  | 'URGENCY'
  | 'PERIOD_TYPE'
  | 'RECEIVED_PERIOD'

export type NumberSign = 'POSITIVE' | 'NEGATIVE'

export type CaregivingManagerOrganizationTypeFilterType =
  | OrganizationType
  | 'CAREGIVING_MANAGER_NOT_ASSIGNED'
  | null

export type Period = {days: number; hours: number}

export type MessageStatusesPageKey =
  | 'CAREGIVING_START'
  | 'CAREGIVING_PROGRESS'
  | 'CAREGIVING_SATISFACTION_SURVEY'

export type StatisticPageKey =
  | 'MONTHLY_RECEPTION'
  | 'DAILY_SETTLEMENT_TRANSACTION'
  | 'DAILY_BILLING_TRANSACTION'
  | 'MONTHLY_RECONCILIATION'
  | 'MONTHLY_REGIONAL_CAREGIVING'

export type BillingsPageKey = 'WAITING' | 'WAITING_DEPOSIT' | 'IN_TRANSACTION'

export type SettlementsPageKey = 'WAITING' | 'IN_TRANSACTION'

export type ReceptionsPathKey =
  | 'INDEX'
  | 'REGISTRATION'
  | 'DETAIL'
  | 'SETTLEMENTS'
  | 'BILLINGS'

export type RoutePath<PageKey> = {
  [Property in PageKey]: (id?: string) => string
}

export type SubPageTab<PathKey> = {
  path: (id?: string) => string
  text: string
  value: PathKey
}

export type CaregivingChargeModifiedProperty =
  | 'ADDITIONAL_HOURS_CHARGE'
  | 'MEAL_COST'
  | 'TRANSPORTATION_FEE'
  | 'HOLIDAY_CHARGE'
  | 'CAREGIVER_INSURANCE_FEE'
  | 'COMMISSION_FEE'
  | 'VACATION_CHARGE'
  | 'PATIENT_CONDITION_CHARGE'
  | 'COVID_19_TESTING_COST'
  | 'ADDITIONAL_CHARGE_1'
  | 'ADDITIONAL_CHARGE_2'
  | 'ADDITIONAL_CHARGE_3'
  | 'OUTSTANDING_AMOUNT'
  | 'EXPECTED_SETTLEMENT_DATE'
  | 'IS_CANCEL_AFTER_ARRIVED'

export type CaregivingRoundModifiedProperty =
  | 'CAREGIVER_ORGANIZATION_ID'
  | 'CAREGIVER_NAME'
  | 'CAREGIVER_SEX'
  | 'CAREGIVER_BIRTH_DATE'
  | 'CAREGIVER_PHONE_NUMBER'
  | 'DAILY_CAREGIVING_CHARGE'
  | 'COMMISSION_FEE'
  | 'CAREGIVER_INSURED'
  | 'CAREGIVER_ACCOUNT_BANK'
  | 'CAREGIVER_ACCOUNT_HOLDER'
  | 'CAREGIVER_ACCOUNT_NUMBER'
  | 'START_DATE_TIME'
  | 'END_DATE_TIME'
  | 'REMARKS'

export type ReceptionModifiedProperty =
  | 'INSURANCE_NUMBER'
  | 'SUBSCRIPTION_DATE'
  | 'COVERAGE_ID'
  | 'CAREGIVING_LIMIT_PERIOD'
  | 'PATIENT_NAME'
  | 'PATIENT_AGE'
  | 'PATIENT_SEX'
  | 'PATIENT_PRIMARY_PHONE_NUMBER'
  | 'PATIENT_PRIMARY_RELATIONSHIP'
  | 'PATIENT_SECONDARY_PHONE_NUMBER'
  | 'PATIENT_SECONDARY_RELATIONSHIP'
  | 'ACCIDENT_NUMBER'
  | 'ACCIDENT_DATE_TIME'
  | 'CLAIM_TYPE'
  | 'CAREGIVING_ORGANIZATION_TYPE'
  | 'CAREGIVING_ORGANIZATION_ID'
  | 'CAREGIVING_MANAGING_USER_ID'
  | 'EXPECTED_CAREGIVING_LIMIT_DATE'
  | 'PATIENT_NICKNAME'
  | 'PATIENT_HEIGHT'
  | 'PATIENT_WEIGHT'
  | 'ADMISSION_DATE_TIME'
  | 'HOSPITAL_AND_ROOM'
  | 'HOSPITAL_CITY'
  | 'HOSPITAL_STATE'
  | 'DESIRED_CAREGIVING_START_DATE'
  | 'DESIRED_CAREGIVING_PERIOD'
  | 'PATIENT_DESCRIPTION'
  | 'ADDITIONAL_REQUESTS'
  | 'EXPECTED_CAREGIVING_START_DATE'
  | 'NOTIFY_CAREGIVING_PROGRESS'
  | 'RECEPTION_APPLICATION_FILE_NAME'

export type SearchFilterQueryData = [
  (
    | 'PROGRESSING_STATUS'
    | 'RECEPTION_PROGRESSING_STATUS'
    | 'CAREGIVING_PROGRESSING_STATUS'
    | 'SETTLEMENT_PROGRESSING_STATUS'
    | 'BILLING_PROGRESSING_STATUS'
  ),
  (
    | ReceptionProgressingStatus
    | CaregivingProgressingStatus
    | BillingProgressingStatus
    | SettlementProgressingStatus
  ),
]

export type ListItemOrderProps = Pick<
  IPaginationResponse<unknown>,
  'currentPageNumber' | 'totalItemCount'
> & {
  listItemIndex: number
  pageSize?: number
}

export type TokenPayload = JwtPayload & {
  externalCaregivingManagerIds: string[]
  internalCaregivingManagerId?: string
  tokenType: 'access' | 'refresh'
}

export type Constraints<TFieldValues extends FieldValues> = Partial<{
  [key in FieldPath<TFieldValues>]: RegisterOptions<TFieldValues, key>
}>

export type ReconciliationClosingStatus = 'OPEN' | 'CLOSED'

export type CaregivingChargeConfirmStatus = 'NOT_STARTED' | 'CONFIRMED'

export type CaregivingMessageSendingStatus = 'READY' | 'SENT' | 'FAILED'

export type CaregivingSatisfactionSurveyReservationStatus =
  | 'READY'
  | 'RESERVED'
  | 'FAILED'

export interface IOption<T = string> {
  text: string
  value: T
}

export type CaregivingSearchFilter = {
  BILLING_PROGRESSING_STATUS: BillingProgressingStatus[]
  CAREGIVING_PROGRESSING_STATUS: CaregivingProgressingStatus[]
  RECEPTION_PROGRESSING_STATUS: ReceptionProgressingStatus[]
  SETTLEMENT_PROGRESSING_STATUS: SettlementProgressingStatus[]
}

export type BillingTransactionModalType =
  | 'BILLING_TRANSACTION_LIST'
  | 'BILLING_TRANSACTION_REGISTRATION'

export type BillingWaitingModalType = 'BILLING_AMOUNT_DETAIL'

export type BillingWaitingDepositModalType = 'BILLING_DEPOSIT_REGISTRATION'

export type ReceptionSettlementsModalType =
  | 'SETTLEMENT_TRANSACTION_REGISTRATION'
  | 'SETTLEMENT_TRANSACTION_LIST'
  | 'CAREGIVING_CHARGE_ESTIMATE'
  | 'CAREGIVING_CHARGE_INFO'
  | 'CAREGIVING_CHARGE_INFO_HISTORY'

export type ReceptionBillingsModalType =
  | 'BILLING_TRANSACTION_REGISTRATION'
  | 'BILLING_TRANSACTION_LIST'
  | 'BILLING_DEPOSIT_REGISTRATION'
  | 'COVERAGE_DETAIL'

export type LoginModalType = 'TEMPORARY_PASSWORD_ISSUE'

export type CaregivingSettlementModalType =
  | 'CAREGIVING_CHARGE_ESTIMATE'
  | 'CAREGIVING_CHARGE_INFO'
  | 'CAREGIVING_CHARGE_INFO_HISTORY'

export type SettlementTransactionModalType =
  | 'SETTLEMENT_TRANSACTION_LIST'
  | 'SETTLEMENT_TRANSACTION_REGISTRATION'

export type ReceptionDetailModalType =
  | 'CAREGIVING_CANCEL_WHILE_REMATCHING'
  | 'CAREGIVING_INFO_HISTORY'
  | 'CAREGIVING_MANAGER_ASSIGN'
  | 'CAREGIVING_START'
  | 'CAREGIVING_COMPLETE'
  | 'INSURANCE_MANAGER_INFO'
  | 'RECEPTION_CANCEL'
  | 'RECEPTION_CANCEL_WHILE_MATCHING'
  | 'RECEPTION_INFO_HISTORY'
  | 'CAREGIVING_STOP'
  | 'CAREGIVING_CHARGE_ESTIMATE'
  | 'HOSPITAL_ROOM_INFO'
  | 'SMS_SCRIPT_FOR_CAREGIVER'
  | 'SMS_SCRIPT_FOR_PERSONAL_CAREGIVER_BILLING'
  | 'SMS_SCRIPT_FOR_PERSONAL_CAREGIVER_APPROVAL'
  | 'COVERAGE_DETAIL'
  | 'EXPECTED_CAREGIVING_START_DATE_UPDATE'

export type CaregivingDetailModalInfo = {
  modalData: unknown | null
  modalType: ReceptionDetailModalType
}

/** 간병 접수 진행 상태 */
export type ReceptionProgressingStatus =
  | 'RECEIVED'
  | 'CANCELED'
  | 'CANCELED_BY_PERSONAL_CAREGIVER'
  | 'CANCELED_BY_MEDICAL_REQUEST'
  | 'PENDING'
  | 'MATCHING'
  | 'PENDING_MATCHING'
  | 'CANCELED_WHILE_MATCHING'
  | 'CAREGIVING_IN_PROGRESS'
  | 'COMPLETED'

/** 간병 회차 진행 상태 */
export type CaregivingProgressingStatus =
  | 'NOT_STARTED' // 미진행
  | 'CAREGIVING_IN_PROGRESS' // 간병 중
  | 'COMPLETED_RESTARTING' // 중단 - 계속
  | 'REMATCHING' // 리매칭 중
  | 'PENDING_REMATCHING' //리매칭 중 보류
  | 'CANCELED_WHILE_REMATCHING' // 리매칭 중 취소
  | 'COMPLETED' // 간병 종료
  | 'COMPLETED_USING_PERSONAL_CAREGIVER' // 개인구인 종료
  | 'RECONCILIATION_COMPLETED' // 정산대사 완료

/** 간병 회차 종료 사유 */
export type CaregivingRoundClosingReasonType =
  | 'FINISHED' // 정상 종료
  | 'FINISHED_USING_PERSONAL_CAREGIVER' // 개인구인으로 종료
  | 'FINISHED_CONTINUE' // 같은 간병인 & 병원 계속 이용
  | 'FINISHED_RESTARTING' // 간병 중단 중 청구
  | 'FINISHED_CHANGING_CAREGIVER' // 간병인 교체
  | 'FINISHED_CHANGING_HOSPITAL' // 병원 교체
  | 'FINISHED_CHANGING_CAREGIVER_AND_HOSPITAL' // 간병인 & 병원 교체
  | 'CANCELED_WHILE_REMATCHING' // 리매칭 중 취소
  | 'CANCELED_USING_PERSONAL_CAREGIVER' // 개인구인으로 취소

/** 간병 회차 정산 상태 */
export type SettlementProgressingStatus =
  | 'NOT_STARTED'
  | 'CONFIRMED'
  | 'WAITING'
  | 'COMPLETED'

/** 간병 회차 청구 상태 */
export type BillingProgressingStatus =
  | 'NOT_STARTED'
  | 'WAITING_FOR_BILLING'
  | 'WAITING_DEPOSIT'
  | 'OVER_DEPOSIT'
  | 'UNDER_DEPOSIT'
  | 'COMPLETED_DEPOSIT'

/** 외부 간병 협회 구분 */
export type ExternalCaregivingOrganizationType = 'ORGANIZATION' | 'AFFILIATED'

/** 업체 구분 */
export type OrganizationType = 'INTERNAL' | ExternalCaregivingOrganizationType

/** 정보 읽기/수정 모드 */
export type InfoTreatmentMode = 'VIEW' | 'MODIFICATION'

/** 성별 */
export type Sex = 'MALE' | 'FEMALE'

/** 청구 유형 (질병, 상해) */
export type ClaimType = 'SICKNESS' | 'ACCIDENT'

/** 긴급도 */
export type Urgency = 'NORMAL' | 'URGENT'

/** 취소 */
export type Cancel = 'NORMAL' | 'CANCEL'

/** 완료 */
export type Completed = 'NORMAL' | 'COMPLETED'

/** 기간 구분 */
export type PeriodType = 'NORMAL' | 'SHORT'

/** 검색 카테고리 */
export type SearchCategory =
  | 'accidentNumber'
  | 'patientName'
  | 'insuranceNumber'
  | 'caregivingManagerName'
  | 'patientPhoneNumber'
  | 'organizationName'

/** 입출금 구분 */
export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL'
/** 보험 갱신 */
export type RenewalType = 'THREE_YEAR' | 'TEN_YEAR'

/* 정렬기준 */
export type SortStandardType =
  | 'ID_DESC'
  | 'LAST_TRANSACTION_DATE_TIME_DESC'
  | 'BILLING_DATE_ASC'
  | 'TRANSACTION_DATE_DESC'
  | 'EXPECTED_SETTLEMENT_DATE_DESC_ACCIDENT_NUMBER_DESC'

export type PaginationParams = {
  pageNumber: number
  pageSize: number
}

export type PeriodParams = {
  from: string
  until: string
}

export type SearchQueryParams = {
  searchCategory: SearchCategory
  searchKeyword: string
}
