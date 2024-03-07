import {
  BillingsPageKey,
  MessageStatusesPageKey,
  ReceptionsPathKey,
  SettlementsPageKey,
  StatisticPageKey,
  SubPageTab,
} from '../types'
import {
  BILLINGS_PATH,
  MESSAGE_STATUSES_PATH,
  RECEPTIONS_PATH,
  SETTLEMENTS_PATH,
  STATISTIC_PATH,
} from './route-paths'

export const RECEPTIONS_SUB_PAGE_TABS: SubPageTab<ReceptionsPathKey>[] = [
  {
    path: RECEPTIONS_PATH.DETAIL,
    text: '상세 정보',
    value: 'DETAIL',
  },
  {
    path: RECEPTIONS_PATH.SETTLEMENTS,
    text: '정산',
    value: 'SETTLEMENTS',
  },
  {
    path: RECEPTIONS_PATH.BILLINGS,
    text: '청구',
    value: 'BILLINGS',
  },
]

export const SETTLEMENTS_SUB_PAGE_TABS: SubPageTab<SettlementsPageKey>[] = [
  {
    path: SETTLEMENTS_PATH.WAITING,
    text: '정산',
    value: 'WAITING',
  },
  {
    path: SETTLEMENTS_PATH.IN_TRANSACTION,
    text: '입출금 관리',
    value: 'IN_TRANSACTION',
  },
]

export const BILLINGS_SUB_PAGE_TABS: SubPageTab<BillingsPageKey>[] = [
  {
    path: BILLINGS_PATH.WAITING,
    text: '청구',
    value: 'WAITING',
  },
  {
    path: BILLINGS_PATH.WAITING_DEPOSIT,
    text: '미수 관리',
    value: 'WAITING_DEPOSIT',
  },
  {
    path: BILLINGS_PATH.IN_TRANSACTION,
    text: '입출금 관리',
    value: 'IN_TRANSACTION',
  },
]

export const STATISTIC_SUB_PAGE_TABS: SubPageTab<StatisticPageKey>[] = [
  {
    path: STATISTIC_PATH.MONTHLY_RECEPTION,
    text: '월별 현황',
    value: 'MONTHLY_RECEPTION',
  },
  {
    path: STATISTIC_PATH.DAILY_SETTLEMENT_TRANSACTION,
    text: '정산 입출금 현황',
    value: 'DAILY_SETTLEMENT_TRANSACTION',
  },
  {
    path: STATISTIC_PATH.DAILY_BILLING_TRANSACTION,
    text: '청구 입출금 현황',
    value: 'DAILY_BILLING_TRANSACTION',
  },
  {
    path: STATISTIC_PATH.MONTHLY_RECONCILIATION,
    text: '정산대사 현황',
    value: 'MONTHLY_RECONCILIATION',
  },
  {
    path: STATISTIC_PATH.MONTHLY_REGIONAL_CAREGIVING,
    text: '지역별 간병 현황',
    value: 'MONTHLY_REGIONAL_CAREGIVING',
  },
]

export const MESSAGE_STATUSES_PAGE_TABS: SubPageTab<MessageStatusesPageKey>[] =
  [
    {
      path: MESSAGE_STATUSES_PATH.CAREGIVING_START,
      text: '시작 알림톡',
      value: 'CAREGIVING_START',
    },
    {
      path: MESSAGE_STATUSES_PATH.CAREGIVING_PROGRESS,
      text: '진행 알림톡',
      value: 'CAREGIVING_PROGRESS',
    },
    {
      path: MESSAGE_STATUSES_PATH.CAREGIVING_SATISFACTION_SURVEY,
      text: '종료 비즈콜',
      value: 'CAREGIVING_SATISFACTION_SURVEY',
    },
  ]
