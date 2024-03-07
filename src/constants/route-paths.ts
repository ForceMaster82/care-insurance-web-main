import {
  BillingsPageKey,
  MessageStatusesPageKey,
  ReceptionsPathKey,
  RoutePath,
  SettlementsPageKey,
  StatisticPageKey,
} from '../types'

export const ACCOUNT_PATH = {
  LOGIN: '/account/login',
  PASSWORD_CHANGE: '/account/password-change',
  SHOULD_PASSWORD_CHANGE: '/account/password-change?isForced=true',
}

export const CAREGIVING_ROUNDS_PATH = {
  INDEX: '/caregiving-rounds',
}

export const RECEPTIONS_PATH: RoutePath<ReceptionsPathKey> = {
  BILLINGS: (receptionId) => `/receptions/${receptionId}/billings`,
  DETAIL: (receptionId) => `/receptions/${receptionId}/detail`,
  INDEX: () => '/receptions',
  REGISTRATION: () => '/receptions/registration',
  SETTLEMENTS: (receptionId) => `/receptions/${receptionId}/settlements`,
}

export const SETTLEMENTS_PATH: RoutePath<SettlementsPageKey> = {
  IN_TRANSACTION: () => '/settlements/in-transaction',
  WAITING: () => '/settlements/waiting',
}

export const BILLINGS_PATH: RoutePath<BillingsPageKey> = {
  IN_TRANSACTION: () => '/billings/in-transaction',
  WAITING: () => '/billings/waiting',
  WAITING_DEPOSIT: () => '/billings/waiting-deposit',
}

export const RECONCILIATION_PATH = {
  INDEX: '/reconciliation',
}

export const STATISTIC_PATH: RoutePath<StatisticPageKey> = {
  DAILY_BILLING_TRANSACTION: () => '/statistic/daily-billing-transaction',
  DAILY_SETTLEMENT_TRANSACTION: () => '/statistic/daily-settlement-transaction',
  MONTHLY_RECEPTION: () => '/statistic/monthly-reception',
  MONTHLY_RECONCILIATION: () => '/statistic/monthly-reconciliation',
  MONTHLY_REGIONAL_CAREGIVING: () => '/statistic/monthly-regional-caregiving',
}

export const MESSAGE_STATUSES_PATH: RoutePath<MessageStatusesPageKey> = {
  CAREGIVING_PROGRESS: () => '/message-statuses/caregiving-progress',
  CAREGIVING_SATISFACTION_SURVEY: () =>
    '/message-statuses/caregiving-satisfaction-survey',
  CAREGIVING_START: () => '/message-statuses/caregiving-start',
}

export const DEFAULT_PATH = CAREGIVING_ROUNDS_PATH.INDEX
