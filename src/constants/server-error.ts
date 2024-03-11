/* eslint-disable capitalized-comments */
import {GlobalServerErrorType, LocalServerErrorType} from '../types/fetch'

/**
 * 모든 API에 대해 동일하게 처리되어야 하는 전역 에러 타입의 모음입니다.
 */
export const GLOBAL_SERVER_ERROR_TYPES = [
  'NOT_AUTHORIZED',
  'PASSWORD_CHANGE_REQUIRED',
  'ILLEGAL_TOKEN_SUPPLIED',
  'TOKEN_EXPIRED',
  'ILLEGAL_PAGE_REQUEST',
  'REQUIRED_ITEMS_NOT_SUPPLIED',
  'ILLEGAL_SEARCH_QUERY',
  'REFRESH_TOKEN_ALREADY_USED',
] as const

/**
 * API 별로 다르게 처리하는 에러 타입의 모음입니다.
 */
export const LOCAL_SERVER_ERROR_TYPES = [
  'EMAIL_NOT_SUPPLIED',
  'EMAIL_VALIDATION_POLICY_VIOLATION',
  'PASSWORD_VALIDATION_POLICY_VIOLATION',
  'NOT_REGISTERED_EMAIL_ADDRESS',
  'PASSWORD_NOT_SUPPLIED',
  'WRONG_CREDENTIAL',
  'CREDENTIAL_NOT_SUPPLIED',
  'USER_SUSPENDED',
  'REFERENCE_COVERAGE_NOT_EXISTS',
  'RECEPTION_NOT_EXISTS',
  'REFERENCE_ORGANIZATION_NOT_EXISTS',
  'REFERENCE_USER_NOT_EXISTS',
  'INVALID_RECEPTION_STATE_TRANSITION',
  'SETTLEMENT_NOT_EXISTS',
  'INVALID_CAREGIVING_CHARGE_ACTIONABLE_STATUS',
  'INVALID_CAREGIVING_CHARGE_CONFIRM_STATUS_TRANSITION',
  'CAREGIVING_ROUND_NOT_EXISTS',
  'BILLING_NOT_EXISTS',
  'REFERENCE_INTERNAL_CAREGIVING_MANAGER_NOT_EXISTS',
  'INVALID_SETTLEMENT_PROGRESSING_STATUS_TRANSITION',
  'REFERENCE_SETTLEMENT_NOT_EXISTS',
  'REFERENCE_RECONCILIATION_NOT_EXISTS',
  'INVALID_RECONCILIATION_CLOSING_STATUS_TRANSITION',
  'RECEPTION_APPLICATION_NOT_FOUND',
    'ACCIDENT_NUMBER_EXISTS',
    'INSURANCE_NUMBER_EXISTS',
] as const

/**
 * 범용적으로 사용되는 에러 메세지입니다.
 */
export const SERVER_ERROR_MESSAGE: Partial<
  Record<GlobalServerErrorType | LocalServerErrorType, string>
> = {
  CAREGIVING_ROUND_NOT_EXISTS:
    '조회하고자 하는 간병 회차 정보가 존재하지 않습니다.',
  ILLEGAL_TOKEN_SUPPLIED:
    '인증 토큰이 올바르지 않습니다. 다시 로그인 해주세요.',
  INVALID_RECEPTION_STATE_TRANSITION:
    '지정한 상태로 접수를 변경할 수 없습니다.',
  NOT_REGISTERED_EMAIL_ADDRESS: '존재하지 않는 아이디(이메일)입니다.',
  PASSWORD_CHANGE_REQUIRED:
    '임시 비밀번호로 로그인했습니다. 새로운 비밀번호로 변경해 주세요.',
  RECEPTION_NOT_EXISTS: '접수 정보가 존재하지 않습니다.',
  REFERENCE_COVERAGE_NOT_EXISTS: '존재하지 않는 가입 담보를 선택했습니다.',
  SETTLEMENT_NOT_EXISTS: '조회하고자 하는 정산이 존재하지 않습니다.',
  TOKEN_EXPIRED: '인증 토큰이 만료되었습니다. 다시 로그인 해주세요.',
  USER_SUSPENDED: '사용할 수 없는 계정입니다.',
  WRONG_CREDENTIAL:
    '잘못된 로그인 정보입니다. 아이디(이메일) 또는 비밀번호를 확인해 주세요.',
  ACCIDENT_NUMBER_EXISTS: '사고번호는 이미 등록되어 있습니다.',
  INSURANCE_NUMBER_EXISTS: '증권번호는 이미 등록되어 있습니다.',
}

/**
 * 범용 에러 메세지를 사용하지 않는 경우, 별도의 상수를 생성하여 관리합니다.
 */
export const PASSWORD_CHANGE_SERVER_ERROR_MESSAGE: Partial<
  Record<LocalServerErrorType, string>
> = {
  WRONG_CREDENTIAL: '기존 비밀번호가 일치하지 않습니다.',
}
