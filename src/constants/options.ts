import {IComboBoxItemData} from '@caredoc/ui-web'
import {
  BILLING_PROGRESSING_STATUS,
  CAREGIVING_MESSAGE_SENDING_STATUS,
  CAREGIVING_PROGRESSING_STATUS,
  CAREGIVING_ROUND_CLOSING_REASON_TYPE,
  ORGANIZATION_TYPE,
  RECEPTION_CANCELLATION_REASON,
  RECEPTION_PROGRESS_STATUS,
  SEARCH_CATEGORY,
  SETTLEMENT_PROGRESSING_STATUS,
} from './texts'
import {
  BillingProgressingStatus,
  CaregivingManagerOrganizationTypeFilterType,
  CaregivingMessageSendingStatus,
  CaregivingProgressingStatus,
  CaregivingRoundClosingReasonType,
  ClaimType,
  IOption,
  OrganizationType,
  ReceptionProgressingStatus,
  SearchCategory,
  SettlementProgressingStatus,
  Sex,
} from '~types'

/** 접수 관리 - 간병 관리자 소속 필터 */
export const caregivingManagerOrganizationTypeFilters: IComboBoxItemData<CaregivingManagerOrganizationTypeFilterType>[] =
  [
    {data: null, label: '소속 전체'},
    {data: 'INTERNAL', label: ORGANIZATION_TYPE['INTERNAL']},
    {data: 'AFFILIATED', label: ORGANIZATION_TYPE['AFFILIATED']},
    {data: 'ORGANIZATION', label: ORGANIZATION_TYPE['ORGANIZATION']},
    {data: 'CAREGIVING_MANAGER_NOT_ASSIGNED', label: '미배정'},
  ]

/** 간병 관리 - 접수 상태 필터 */
export const receptionProgressingStatusFilters: IOption<ReceptionProgressingStatus>[] =
  [
    {text: RECEPTION_PROGRESS_STATUS['RECEIVED'], value: 'RECEIVED'},
    {text: RECEPTION_PROGRESS_STATUS['CANCELED'], value: 'CANCELED'},
    {
      text: RECEPTION_PROGRESS_STATUS['CANCELED_BY_PERSONAL_CAREGIVER'],
      value: 'CANCELED_BY_PERSONAL_CAREGIVER',
    },
    {
      text: RECEPTION_PROGRESS_STATUS['CANCELED_BY_MEDICAL_REQUEST'],
      value: 'CANCELED_BY_MEDICAL_REQUEST',
    },
    {text: RECEPTION_PROGRESS_STATUS['PENDING'], value: 'PENDING'},
    {text: RECEPTION_PROGRESS_STATUS['MATCHING'], value: 'MATCHING'},
    {
      text: RECEPTION_PROGRESS_STATUS['PENDING_MATCHING'],
      value: 'PENDING_MATCHING',
    },
    {
      text: RECEPTION_PROGRESS_STATUS['CANCELED_WHILE_MATCHING'],
      value: 'CANCELED_WHILE_MATCHING',
    },
    {
      text: RECEPTION_PROGRESS_STATUS['CAREGIVING_IN_PROGRESS'],
      value: 'CAREGIVING_IN_PROGRESS',
    },
    {text: RECEPTION_PROGRESS_STATUS['COMPLETED'], value: 'COMPLETED'},
  ]

/** 간병 관리 - 간병 상태 필터 */
export const caregivingProgressingStatusFilters: IOption<CaregivingProgressingStatus>[] =
  [
    {text: CAREGIVING_PROGRESSING_STATUS['NOT_STARTED'], value: 'NOT_STARTED'},
    {
      text: CAREGIVING_PROGRESSING_STATUS['CAREGIVING_IN_PROGRESS'],
      value: 'CAREGIVING_IN_PROGRESS',
    },
    {
      text: CAREGIVING_PROGRESSING_STATUS['COMPLETED_RESTARTING'],
      value: 'COMPLETED_RESTARTING',
    },
    {text: CAREGIVING_PROGRESSING_STATUS['REMATCHING'], value: 'REMATCHING'},
    {
      text: CAREGIVING_PROGRESSING_STATUS['PENDING_REMATCHING'],
      value: 'PENDING_REMATCHING',
    },
    {
      text: CAREGIVING_PROGRESSING_STATUS['CANCELED_WHILE_REMATCHING'],
      value: 'CANCELED_WHILE_REMATCHING',
    },
    {
      text: CAREGIVING_PROGRESSING_STATUS['COMPLETED'],
      value: 'COMPLETED',
    },
    {
      text: CAREGIVING_PROGRESSING_STATUS['COMPLETED_USING_PERSONAL_CAREGIVER'],
      value: 'COMPLETED_USING_PERSONAL_CAREGIVER',
    },
    {
      text: CAREGIVING_PROGRESSING_STATUS['RECONCILIATION_COMPLETED'],
      value: 'RECONCILIATION_COMPLETED',
    },
  ]

/** 간병 관리 - 정산 상태 필터 */
export const settlementProgressingStatusFilters: IOption<SettlementProgressingStatus>[] =
  [
    {text: SETTLEMENT_PROGRESSING_STATUS['NOT_STARTED'], value: 'NOT_STARTED'},
    {text: SETTLEMENT_PROGRESSING_STATUS['CONFIRMED'], value: 'CONFIRMED'},
    {text: SETTLEMENT_PROGRESSING_STATUS['WAITING'], value: 'WAITING'},
    {text: SETTLEMENT_PROGRESSING_STATUS['COMPLETED'], value: 'COMPLETED'},
  ]

/** 간병 관리 - 청구 상태 필터 */
export const billingProgressingStatusFilters: IOption<BillingProgressingStatus>[] =
  [
    {text: BILLING_PROGRESSING_STATUS['NOT_STARTED'], value: 'NOT_STARTED'},
    {
      text: BILLING_PROGRESSING_STATUS['WAITING_FOR_BILLING'],
      value: 'WAITING_FOR_BILLING',
    },
    {
      text: BILLING_PROGRESSING_STATUS['COMPLETED_DEPOSIT'],
      value: 'COMPLETED_DEPOSIT',
    },
  ]

/** 배정 담당처 */
export const organizationTypes: IComboBoxItemData<OrganizationType>[] = [
  {data: 'INTERNAL', label: '케어닥'},
  {data: 'ORGANIZATION', label: '협회'},
  {data: 'AFFILIATED', label: '제휴사'},
]

/** 성별 */
export const sexItems: IComboBoxItemData<Sex>[] = [
  {data: 'MALE', label: '남자'},
  {data: 'FEMALE', label: '여자'},
]

/** 청구 유형 (질병, 상해) */
export const claimTypes: IComboBoxItemData<ClaimType>[] = [
  {data: 'SICKNESS', label: '질병'},
  {data: 'ACCIDENT', label: '상해'},
]

/** 접수 관리 페이지 검색 카테고리 */
export const receptionSearchCategories: IComboBoxItemData<SearchCategory>[] = [
  {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
  {data: 'insuranceNumber', label: SEARCH_CATEGORY['insuranceNumber']},
  {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
  {
    data: 'caregivingManagerName',
    label: SEARCH_CATEGORY['caregivingManagerName'],
  },
  {data: 'patientPhoneNumber', label: SEARCH_CATEGORY['patientPhoneNumber']},
]

/** 간병 관리 페이지 검색 카테고리  */
export const caregivingSearchCategories: IComboBoxItemData<SearchCategory>[] = [
  {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
  {data: 'insuranceNumber', label: SEARCH_CATEGORY['insuranceNumber']},
  {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
]

/** 정산 관리 - 정산 페이지 검색 카테고리 */
export const settlementWaitingSearchCategories: IComboBoxItemData<SearchCategory>[] =
  [
    {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
    {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
    {data: 'organizationName', label: SEARCH_CATEGORY['organizationName']},
  ]

/** 정산 관리 - 입출금 관리 페이지 검색 카테고리 */
export const settlementTransactionSearchCategories: IComboBoxItemData<SearchCategory>[] =
  [
    {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
    {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
  ]

/** 청구 관리 - 청구 페이지 검색 카테고리 */
export const billingWaitingSearchCategories: IComboBoxItemData<SearchCategory>[] =
  [
    {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
    {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
  ]

/** 청구 관리 - 미수 페이지 검색 카테고리 */
export const billingWaitingDepositSearchCategories: IComboBoxItemData<SearchCategory>[] =
  [
    {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
    {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
  ]

/** 청구 관리 - 입출금 관리 페이지 검색 카테고리 */
export const billingTransactionSearchCategories: IComboBoxItemData<SearchCategory>[] =
  [
    {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
    {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
  ]

/** 정산대사 페이지 검색 카테고리 */
export const reconciliationSearchCategories: IComboBoxItemData<SearchCategory>[] =
  [
    {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
    {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
  ]

/** 알림톡/비즈콜 검색 카테고리 */
export const notificationSearchCategories: IComboBoxItemData<SearchCategory>[] =
  [
    {data: 'accidentNumber', label: SEARCH_CATEGORY['accidentNumber']},
    {data: 'patientName', label: SEARCH_CATEGORY['patientName']},
  ]

/** 알림톡 전송 상태 필터 */
export const caregivingMessageSendingStatus: IComboBoxItemData<CaregivingMessageSendingStatus | null>[] =
  [
    {data: null, label: '전체'},
    {data: 'READY', label: CAREGIVING_MESSAGE_SENDING_STATUS['READY']},
    {data: 'SENT', label: CAREGIVING_MESSAGE_SENDING_STATUS['SENT']},
    {data: 'FAILED', label: CAREGIVING_MESSAGE_SENDING_STATUS['FAILED']},
  ]

/** 접수 취소 사유 */
export const receptionCancelReasons: IComboBoxItemData<ReceptionProgressingStatus>[] =
  [
    {data: 'CANCELED', label: RECEPTION_CANCELLATION_REASON['CANCELED']},
    {
      data: 'CANCELED_BY_PERSONAL_CAREGIVER',
      label: RECEPTION_CANCELLATION_REASON['CANCELED_BY_PERSONAL_CAREGIVER'],
    },
    {
      data: 'CANCELED_BY_MEDICAL_REQUEST',
      label: RECEPTION_CANCELLATION_REASON['CANCELED_BY_MEDICAL_REQUEST'],
    },
  ]

/** 간병 종료 사유 */
export const caregivingRoundClosingReasons: IComboBoxItemData<CaregivingRoundClosingReasonType>[] =
  [
    {data: 'FINISHED', label: CAREGIVING_ROUND_CLOSING_REASON_TYPE['FINISHED']},
    {
      data: 'FINISHED_USING_PERSONAL_CAREGIVER',
      label:
        CAREGIVING_ROUND_CLOSING_REASON_TYPE[
          'FINISHED_USING_PERSONAL_CAREGIVER'
        ],
    },
    {
      data: 'FINISHED_CONTINUE',
      label: CAREGIVING_ROUND_CLOSING_REASON_TYPE['FINISHED_CONTINUE'],
    },
    {
      data: 'FINISHED_CHANGING_CAREGIVER',
      label:
        CAREGIVING_ROUND_CLOSING_REASON_TYPE['FINISHED_CHANGING_CAREGIVER'],
    },
    {
      data: 'FINISHED_CHANGING_HOSPITAL',
      label: CAREGIVING_ROUND_CLOSING_REASON_TYPE['FINISHED_CHANGING_HOSPITAL'],
    },
    {
      data: 'FINISHED_CHANGING_CAREGIVER_AND_HOSPITAL',
      label:
        CAREGIVING_ROUND_CLOSING_REASON_TYPE[
          'FINISHED_CHANGING_CAREGIVER_AND_HOSPITAL'
        ],
    },
    {
      data: 'FINISHED_RESTARTING',
      label: CAREGIVING_ROUND_CLOSING_REASON_TYPE['FINISHED_RESTARTING'],
    },
  ]

/** 간병 리매칭 취소 사유 */
export const caregivingRoundCancelReasons: IComboBoxItemData<CaregivingRoundClosingReasonType>[] =
  [
    {
      data: 'CANCELED_WHILE_REMATCHING',
      label: CAREGIVING_ROUND_CLOSING_REASON_TYPE['CANCELED_WHILE_REMATCHING'],
    },
    {
      data: 'CANCELED_USING_PERSONAL_CAREGIVER',
      label:
        CAREGIVING_ROUND_CLOSING_REASON_TYPE[
          'CANCELED_USING_PERSONAL_CAREGIVER'
        ],
    },
  ]

/** 은행 및 증권사 목록 */
export const bankList: IComboBoxItemData<string>[] = [
  {data: '경남은행', label: '경남은행'},
  {data: '광주은행', label: '광주은행'},
  {data: '국민은행', label: '국민은행'},
  {data: '기업은행', label: '기업은행'},
  {data: '농협은행', label: '농협은행'},
  {data: '대구은행', label: '대구은행'},
  {data: '도이치은행', label: '도이치은행'},
  {data: '부산은행', label: '부산은행'},
  {data: '비엔피파리바은행', label: '비엔피파리바은행'},
  {data: '산림조합중앙회', label: '산림조합중앙회'},
  {data: '산업은행', label: '산업은행'},
  {data: '새마을금고중앙회', label: '새마을금고중앙회'},
  {data: '수협은행', label: '수협은행'},
  {data: '신한은행', label: '신한은행'},
  {data: '신협', label: '신협'},
  {data: '우리은행', label: '우리은행'},
  {data: '우체국', label: '우체국'},
  {data: '저축은행', label: '저축은행'},
  {data: '전북은행', label: '전북은행'},
  {data: '제이피모건체이스은행', label: '제이피모건체이스은행'},
  {data: '제주은행', label: '제주은행'},
  {data: '중국건설은행', label: '중국건설은행'},
  {data: '중국공상은행', label: '중국공상은행'},
  {data: '중국은행', label: '중국은행'},
  {data: '카카오뱅크', label: '카카오뱅크'},
  {data: '케이뱅크', label: '케이뱅크'},
  {data: '토스뱅크', label: '토스뱅크'},
  {data: '하나은행', label: '하나은행'},
  {data: '한국씨티은행', label: '한국씨티은행'},
  {data: 'BOA', label: 'BOA'},
  {data: 'HSBC', label: 'HSBC'},
  {data: 'SC제일은행', label: 'SC제일은행'},
  {data: '교보증권', label: '교보증권'},
  {data: '다올투자증권', label: '다올투자증권'},
  {data: '대신증권', label: '대신증권'},
  {data: '메리츠증권주식회사', label: '메리츠증권주식회사'},
  {data: '미래에셋증권', label: '미래에셋증권'},
  {data: '부국증권', label: '부국증권'},
  {data: '삼성증권', label: '삼성증권'},
  {data: '상상인증권', label: '상상인증권'},
  {data: '신영증권', label: '신영증권'},
  {data: '신한투자증권', label: '신한투자증권'},
  {data: '유안타증권', label: '유안타증권'},
  {data: '유진투자증권', label: '유진투자증권'},
  {data: '이베스트투자증권', label: '이베스트투자증권'},
  {data: '카카오페이증권', label: '카카오페이증권'},
  {data: '케이프투자증권', label: '케이프투자증권'},
  {data: '키움증권', label: '키움증권'},
  {data: '토스증권', label: '토스증권'},
  {data: '하나증권', label: '하나증권'},
  {data: '하이투자증권', label: '하이투자증권'},
  {data: '한국투자증권', label: '한국투자증권'},
  {data: '한국포스증권', label: '한국포스증권'},
  {data: '한화투자증권', label: '한화투자증권'},
  {data: '현대차증권', label: '현대차증권'},
  {data: 'BNK투자증권', label: 'BNK투자증권'},
  {data: 'DB금융투자', label: 'DB금융투자'},
  {data: 'IBK투자증권', label: 'IBK투자증권'},
  {data: 'KB증권', label: 'KB증권'},
  {data: 'NH투자증권', label: 'NH투자증권'},
  {data: 'SK증권', label: 'SK증권'},
]
