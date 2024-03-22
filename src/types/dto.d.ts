/* eslint-disable max-lines */
/* eslint-disable typescript-sort-keys/interface */
import {
  BillingProgressingStatus,
  CaregivingChargeConfirmStatus,
  CaregivingChargeModifiedProperty,
  CaregivingMessageSendingStatus,
  CaregivingProgressingStatus,
  CaregivingRoundClosingReasonType,
  CaregivingRoundModifiedProperty,
  CaregivingSatisfactionSurveyReservationStatus,
  ClaimType,
  ExternalCaregivingOrganizationType,
  OrganizationType,
  PeriodType,
  ReceptionModifiedProperty,
  ReceptionProgressingStatus,
  ReconciliationClosingStatus,
  ReconciliationIssuedType,
  RenewalType,
  SettlementProgressingStatus,
  Sex,
  TransactionType,
  Urgency,
} from '.'

export interface IReceptionApplication {
  fileName: string
  url: string
}

export interface ICaregivingSatisfactionSurveyCreate {
  receptionId: string
}

export interface ICaregivingSatisfactionSurveyStatus {
  receptionId: string
  lastCaregivingRoundId: string
  reservationStatus: CaregivingSatisfactionSurveyReservationStatus
}

export interface ICaregivingProgressMessageCreate {
  caregivingRoundId: string
}

export interface ICaregivingProgressMessageStatus {
  receptionId: string
  caregivingRoundId: string
  sendingStatus: CaregivingMessageSendingStatus
  sentDate: string | null
}

export interface ICaregivingStartMessageCreate {
  receptionId: string
}

export interface ICaregivingStartMessageStatus {
  receptionId: string
  firstCaregivingRoundId: string
  sendingStatus: CaregivingMessageSendingStatus
  sentDate: string | null
}

export interface IReceptionBilling {
  id: string
  caregivingRoundId: string
  caregivingRoundNumber: number
  startDateTime: string
  endDateTime: string
  billingProgressingStatus: BillingProgressingStatus
  billingDate: string | null
  basicAmount: number
  additionalAmount: number
  totalAmount: number
}

export interface IReceptionCaregivingChargeModification {
  lastModifiedDateTime: string | null
  lastModifierId: string | null
  modificationCount: number
}

export interface IReceptionCaregivingChargeModificationHistoryItem {
  caregivingRoundNumber: number
  modifiedProperty: CaregivingChargeModifiedProperty
  previous: string | number | boolean | null
  modified: string | number | boolean | null
  modifierId: string
  modifiedDateTime: string
}

export interface IReceptionCaregivingRoundModificationHistoryItem {
  caregivingRoundNumber: number
  modifiedProperty: CaregivingRoundModifiedProperty
  previous: string | number | boolean | null
  modified: string | number | boolean | null
  modifierId: string
  modifiedDateTime: string
}

export interface IReceptionCaregivingRoundModification {
  lastModifiedDateTime: string | null
  lastModifierId: string | null
  modificationCount: number
}

export interface IReceptionModificationHistoryItem {
  modifiedProperty: ReceptionModifiedProperty
  previous: string | number | boolean | null
  modified: string | number | boolean | null
  modifierId: string
  modifiedDateTime: string
}

export interface IReceptionModification {
  lastModifiedDateTime: string | null
  lastModifierId: string | null
  modificationCount: number
}

export interface IExternalCaregivingManager {
  id: string
  name: string
  email: string
  phoneNumber: string
  remarks: string | null
  lastLoginDateTime: string
  suspended: boolean
  externalCaregivingOrganizationId: string
}

export interface IExternalCaregivingManagerListData {
  id: string
  externalCaregivingOrganizationId: string
  email: string
  name: string
  lastLoginDateTime: string
  suspended: boolean
}

export interface IInternalCaregivingManager {
  id: string
  userId: string
  email: string
  name: string
  nickname: string
  phoneNumber: string
  lastLoginDateTime: string
  suspended: boolean
  role: string
  remarks: string
}

export interface IInternalCaregivingManagerListData {
  id: string
  userId: string
  email: string
  name: string
  nickname: string
  phoneNumber: string
  lastLoginDateTime: string
  suspended: boolean
}

export interface IUserCredential {
  email: string | null
  password: string | null
  authenticationCode: string | null
  refreshToken: string | null
}

export interface IFilteredUser {
  id: string
}

export interface IPasswordUpdate {
  password: string | null
  currentPassword: string | null
}

export interface IExternalCaregivingOrganizationListData {
  id: string
  name: string
  externalCaregivingOrganizationType: ExternalCaregivingOrganizationType
}

export interface IExternalCaregivingOrganization {
  id: string
  name: string
  externalCaregivingOrganizationType: ExternalCaregivingOrganizationType
  address: string
  contractName: string
  phoneNumber: string
  profitAllocationRatio: number
  businessLicenseFileName: string | null
  businessLicenseUrl: string | null
  accountInfo: IAccountInfo
}

export interface IUserOrganization {
  id: string | null
  organizationType: OrganizationType
}

export interface IUser {
  id: string
  name: string
  organizations: IUserOrganization[]
  lastLoginDateTime: string | null
}

export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface IReconciliationUpdate {
  id: string
  closingStatus: ReconciliationClosingStatus
}

export interface IReconciliation {
  id: string
  closingStatus: ReconciliationClosingStatus
  receptionId: string
  caregivingRoundId: string
  billingAmount: number
  settlementAmount: number
  settlementDepositAmount: number
  settlementWithdrawalAmount: number
  profit: number
  distributedProfit: number
  issuedType: ReconciliationIssuedType | null
}

export interface IReceptionListData {
  id: string
  insuranceInfo: Pick<IReceptionInsuranceInfo, 'insuranceNumber' | 'coverageId'>
  patientInfo: Pick<
    IReceptionPatientInfo,
    'name' | 'age' | 'sex' | 'primaryContact'
  >
  accidentInfo: Pick<
    IReceptionAccidentInfo,
    'accidentNumber' | 'hospitalRoomInfo'
  >
  caregivingManagerInfo: IReceptionCaregivingManagerInfo | null
  progressingStatus: ReceptionProgressingStatus
  desiredCaregivingStartDate: string
  urgency: Urgency
  desiredCaregivingPeriod: string | null
  additionalRequests: string
  periodType: PeriodType
  receivedDateTime: string
}

export interface IReceptionSettlement {
  id: string
  receptionId: string
  caregivingRoundId: string
  accidentNumber: string
  caregivingRoundNumber: number
  progressingStatus: SettlementProgressingStatus
  patientName: string
  patientNickName: string
  dailyCaregivingCharge: number
  basicAmount: number
  additionalAmount: number
  totalAmount: number
  lastCalculationDateTime: string
  expectedSettlementDate: string
  totalDepositAmount: number
  totalWithdrawalAmount: number
  lastTransactionDateTime: string | null
  settlementCompletionDateTime: string | null
  settlementManagerId: string | null
}

export interface ICaregivingChargeAdditionalCharge {
  name: string
  amount: number
}

export type ICaregivingChargeCaregivingRoundInfo = Pick<
  IReceptionCaregivingRound,
  'caregivingRoundNumber'
> & {
  caregivingRoundId: string
  dailyCaregivingCharge: number
  receptionId: string
  startDateTime: string
  endDateTime: string
}

export interface ICaregivingCharge {
  id: string
  caregivingRoundInfo: ICaregivingChargeCaregivingRoundInfo
  additionalHoursCharge: number
  mealCost: number
  transportationFee: number
  holidayCharge: number
  caregiverInsuranceFee: number
  commissionFee: number
  vacationCharge: number
  patientConditionCharge: number
  covid19TestingCost: number
  outstandingAmount: number
  additionalCharges: ICaregivingChargeAdditionalCharge[]
  isCancelAfterArrived: boolean
  caregivingChargeConfirmStatus: CaregivingChargeConfirmStatus
  basicAmount: number
  additionalAmount: number
  totalAmount: number
  expectedSettlementDate: string
}

export interface ICaregivingChargeUpdate {
  additionalHoursCharge: number
  mealCost: number
  transportationFee: number
  holidayCharge: number
  caregiverInsuranceFee: number
  commissionFee: number
  vacationCharge: number
  patientConditionCharge: number
  covid19TestingCost: number
  outstandingAmount: number
  additionalCharges: ICaregivingChargeAdditionalCharge[]
  isCancelAfterArrived: boolean
  expectedSettlementDate: string
  caregivingChargeConfirmStatus: CaregivingChargeConfirmStatus
}

/** 환자 연락처 정보 */
export interface IPatientContact {
  phoneNumber: string
  relationshipWithPatient: string
}

export interface IReceptionInsuranceInfo {
  caregivingLimitPeriod: number
  coverageId: string
  insuranceNumber: string
  subscriptionDate: string
}

export interface IHospitalRoomInfo {
  city: string | null
  hospitalAndRoom: string
  state: string | null
}

export interface IReceptionAccidentInfo {
  accidentDateTime: string
  accidentNumber: string
  admissionDateTime: string
  claimType: ClaimType
  hospitalRoomInfo: IHospitalRoomInfo
  patientDescription: string
}

export interface IReceptionPatientInfo {
  name: string
  nickname: string | null
  age: number
  sex: Sex
  height: number | null
  weight: number | null
  primaryContact: IPatientContact
  secondaryContact: IPatientContact | null
}

export interface ICaregivingManagerInfo {
  managingUserId: string
  organizationId: string | null
  organizationType: OrganizationType
}

export interface IReceptionCaregivingManagerInfo {
  managingUserId: string
  organizationId: string | null
  organizationType: OrganizationType
}

export interface IReceptionInsuranceManagerInfo {
  branchName: string
  phoneNumber: string | null
  receptionistName: string
}

export interface IReceptionInsuranceManagerInfo {
  branchName: string
  phoneNumber: string | null
  receptionistName: string
}

export interface IReceptionRegisterManagerInfo {
  managingUserId: string
}

export interface IReceptionRegisterManagerInfo {
  managingUserId: string
}

export interface IReception {
  id: string
  insuranceInfo: IReceptionInsuranceInfo
  patientInfo: IReceptionPatientInfo
  accidentInfo: IReceptionAccidentInfo
  insuranceManagerInfo: IInsuranceManagerInfo
  caregivingManagerInfo: ICaregivingManagerInfo | null
  registerManagerInfo: IReceptionRegisterManagerInfo
  desiredCaregivingStartDate: string
  urgency: Urgency
  desiredCaregivingPeriod: string | null
  additionalRequests: string
  expectedCaregivingStartDate: string | null
  expectedCaregivingLimitDate: string
  progressingStatus: ReceptionProgressingStatus
  periodType: PeriodType
  receivedDateTime: string
  reasonForCancellation: string | null
  canceledDateTime: string | null
  notifyCaregivingProgress?: boolean
}

export interface IReceptionCreate {
  insuranceInfo: IReceptionInsuranceInfo
  patientInfo: IReceptionPatientInfo
  accidentInfo: IReceptionAccidentInfo
  insuranceManagerInfo: IReceptionInsuranceManagerInfo
  desiredCaregivingStartDate: string
  urgency: Urgency
  desiredCaregivingPeriod: string | null
  additionalRequests: string
  notifyCaregivingProgress: boolean
  registerManagerInfo: IReceptionRegisterManagerInfo
  receivedDateTime: string
}

export interface IReceptionUpdate {
  insuranceInfo: IReceptionInsuranceInfo
  patientInfo: IReceptionPatientInfo
  accidentInfo: IReceptionAccidentInfo
  caregivingManagerInfo: IReceptionCaregivingManagerInfo | null
  desiredCaregivingStartDate: string
  desiredCaregivingPeriod: string
  additionalRequests: string
  expectedCaregivingStartDate: string | null
  expectedCaregivingLimitDate: string
  progressingStatus: ReceptionProgressingStatus
  reasonForCancellation: string | null
  notifyCaregivingProgress: boolean
}
export interface IAccountInfo {
  accountHolder: string | null
  accountNumber: string | null
  bank: string | null
}

export interface ICaregivingRoundReceptionInfo {
  receptionId: string
  receptionProgressingStatus: ReceptionProgressingStatus
  accidentNumber: string
  insuranceNumber: string
  patientName: string
  patientNickName: string
  patientAge: number
  patientSex: string
  patientPrimaryPhoneNumber: string
  hospitalAndRoom: string
  patientDescription : string
  receivedDateTime: string
  managingUserId: string
  expectedCaregivingStartDate?: string | null
  caregivingManagerInfo: IReceptionCaregivingManagerInfo | null
}

export interface ICaregiverInfo {
  caregiverOrganizationId: string | null
  name: string
  sex: Sex
  birthDate: string
  phoneNumber: string
  insured: boolean
  dailyCaregivingCharge: number
  commissionFee: number
  accountInfo: IAccountInfo
}

export interface ICaregivingRoundReceptionInfo {
  accidentNumber: string
  caregivingManagerInfo: ICaregivingManagerInfo | null
  expectedCaregivingStartDate: string | null
  insuranceNumber: string
  patientName: string
  receptionId: string
  receptionProgressingStatus: ReceptionProgressingStatus
}

export interface IReceptionCaregivingRound {
  id: string
  caregivingRoundNumber: number
  caregivingProgressingStatus: CaregivingProgressingStatus
  receptionInfo: ICaregivingRoundReceptionInfo
  startDateTime: string | null
  endDateTime: string | null
  cancelDateTime: string | null
  caregivingRoundClosingReasonType: CaregivingRoundClosingReasonType | null
  caregivingRoundClosingReasonDetail: string | null
  settlementProgressingStatus: SettlementProgressingStatus
  billingProgressingStatus: BillingProgressingStatus
  caregiverInfo: ICaregiverInfo | null
  remarks: string
  expectedSettlementDate: string | null
}

export interface IReceptionCaregivingRoundUpdate {
  caregivingProgressingStatus: CaregivingProgressingStatus
  startDateTime: string | null
  endDateTime: string | null
  caregivingRoundClosingReasonType: CaregivingRoundClosingReasonType | null
  caregivingRoundClosingReasonDetail: string | null
  caregiverInfo: ICaregiverInfo | null
  remarks: string
  expectedSettlementDate: string | null
}

export interface ICaregivingRound {
  id: string
  receptionInfo: ICaregivingRoundReceptionInfo
  caregivingRoundNumber: number
  caregiverName: string
  caregiverPhoneNumber: string
  caregiverSex: string
  caregiverBirthDate: string
  caregivingProgressingStatus: CaregivingProgressingStatus
  settlementProgressingStatus: SettlementProgressingStatus
  billingProgressingStatus: BillingProgressingStatus
  startDateTime: string | null
  endDateTime: string | null
  expectedSettlementDate: string | null
}

export interface ISettlement {
  id: string
  receptionId: string
  caregivingRoundId: string
  accidentNumber: string
  caregivingRoundNumber: number
  progressingStatus: SettlementProgressingStatus
  patientName: string
  dailyCaregivingCharge: number
  basicAmount: number
  additionalAmount: number
  totalAmount: number
  lastCalculationDateTime: string
  expectedSettlementDate: string
  totalDepositAmount: number
  totalWithdrawalAmount: number
  lastTransactionDateTime: string | null
  settlementCompletionDateTime: null | string
  settlementManagerId: null | string
}

export interface ISettlementUpdate {
  id: string
  progressingStatus: SettlementProgressingStatus
  settlementManagerId: string
}

export interface ISettlementTransaction {
  transactionType: TransactionType
  amount: number
  transactionDate: string
  transactionSubjectId: string
  enteredDateTime: string
}

export interface ISettlementTransactionCreate {
  transactionType: TransactionType
  amount: number
  transactionDate: string
  transactionSubjectId: string
}

export interface IDailyTransactionStatistic {
  date: string
  totalDepositAmount: number
  totalWithdrawalAmount: number
}

export interface IDailyCaregivingRoundTransactionStatistic {
  receptionId: string
  caregivingRoundId: string
  date: string
  totalDepositAmount: number
  totalWithdrawalAmount: number
}

export interface ICoverageAnnualCoveredCaregivingCharges {
  targetAccidentYear: number
  caregivingCharge: number
}

export interface ICoverage {
  id: string
  name: string
  renewalType: RenewalType
  targetSubscriptionYear: number
  annualCoveredCaregivingCharges: ICoverageAnnualCoveredCaregivingCharges[]
  lastModifiedDateTime: string
}

export interface ICoverageListData {
  id: string
  name: string
  renewalType: RenewalType
  targetSubscriptionYear: number
  lastModifiedDateTime: string
}
export interface IMonthlyReconciliationStatistic {
  year: number
  month: number
  receptionCount: number
  caregiverCount: number
  totalCaregivingPeriod: number
  totalBillingAmount: number
  totalSettlementAmount: number
  totalProfit: number
  totalDistributedProfit: number
}

export interface IBillingDetail {
  accidentNumber: string
  roundNumber: number
  startDateTime: string
  endDateTime: string
  basicAmounts: IBillingDetailBasicAmount[]
  additionalHours: number
  additionalAmount: number
  totalAmount: number
  totalDepositAmount: number
  totalWithdrawalAmount: number
  receptionId: string
}

export interface IBillingDetailBasicAmount {
  targetAccidentYear: number
  dailyCaregivingCharge: number
  caregivingDays: number
  totalAmount: number
}
export interface IBillingTransaction {
  transactionType: TransactionType
  amount: number
  transactionDate: string
  enteredDateTime: string
  transactionSubjectId: string
}

export type IBillingTransactionCreate = Pick<
  IBillingTransaction,
  'transactionType' | 'amount' | 'transactionDate' | 'transactionSubjectId'
>

export interface IBilling {
  id: string
  receptionId: string
  accidentNumber: string
  patientName: string
  roundNumber: number
  startDateTime: string
  endDateTime: string
  actualUsagePeriod: string
  billingDate: string
  totalAmount: number
  totalDepositAmount: number
  totalWithdrawalAmount: number
  transactionDate: string
  billingProgressingStatus: BillingProgressingStatus
}

export interface IMonthlyRegionalCaregivingStatistic {
  year: number
  month: number
  state: string
  city: string | null
  receptionCount: number
}
export interface IDailyReceptionStatistic {
  receivedDate: string
  receptionCount: number
  canceledReceptionCount: number
  canceledReceptionCountsByReason: ICanceledReceptionCountsByReason
  requestedBillingCount: number
  requestedBillingAmount: number
  depositCount: number
  depositAmount: number
  withdrawalCount: number
  withdrawalAmount: number
  sameDayAssignmentReceptionCount: number
  startedSameDayAssignmentReceptionCount: number
  shortTermReceptionCount: number
  startedShortTermReceptionCount: number
}

export interface ICanceledReceptionCountsByReason {
  CANCELED_BY_PERSONAL_CAREGIVER: number
  CANCELED_BY_MEDICAL_REQUEST: number
}

export interface IPaginationResponse<T> {
  currentPageNumber: number
  lastPageNumber: number
  totalItemCount: number
  items: T[]
}

export interface ICaregivingRoundInfo {
  id: string
  caregivingRoundNumber: number
  caregivingProgressingStatus: CaregivingProgressingStatus
  receptionInfo: ICaregivingRoundReceptionInfo
  startDateTime: string | null
  endDateTime: string | null
  cancelDateTime: string | null
  caregivingRoundClosingReasonType: CaregivingRoundClosingReasonType
  caregivingRoundClosingReasonDetail: string
  settlementProgressingStatus: SettlementProgressingStatus
  billingProgressingStatus: BillingProgressingStatus
  caregiverInfo: ICaregiverInfo
  remarks: string
  expectedSettlementDate: string | null
}
