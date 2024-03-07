import ReceptionInsuranceInfoInput from '../models/dto/reception-insurance-info/Input'
import PatientContactInput from '../models/dto/patient-contact/Input'
import ReceptionPatientInfoInput from '../models/dto/reception-patient-info/Input'
import ReceptionAccidentInfoInput from '../models/dto/reception-accident-info/Input'
import HospitalRoomInfoInput from '../models/dto/hospital-room-info/Input'
import ReceptionCaregivingManagerInfoInput from '../models/dto/reception-caregiving-manager-info/Input'
import ReceptionUpdateInput from '../models/dto/reception/UpdateInput'
import AccountInfoInput from '../models/dto/account-info/Input'
import CaregiverInfoInput from '../models/dto/caregiver-info/Input'
import ReceptionCaregivingRoundInput from '../models/dto/reception-caregiving-round/Input'
import CaregivingChargeAdditionalChargeInput from '../models/dto/caregiving-charge-additional-charge/Input'
import CaregivingChargeInput from '../models/dto/caregiving-charge/Input'
import {ClaimType, Sex} from '.'
import SettlementTransactionCreateInput from '~models/dto/settlement-transaction/CreateInput'
import ReceptionRegisterManagerInfoInput from '~models/dto/reception-register-manager-info/Input'
import ReceptionInsuranceManagerInfoInput from '~models/dto/reception-insurance-manager-info/Input'
import ReceptionCreateInput from '~models/dto/reception/CreateInput'
import BillingTransactionInput from '~models/dto/billing-transaction/Input'

export interface AuthenticationCodeValidateData {
  authenticationCode: string
  email: string
}

export interface IPasswordChange {
  currentPassword: string
  newPassword: string
  newPasswordCheck: string
}

export type LoginData = {
  email: string
  password: string
}

export type CaregivingChargeData = Pick<
  CaregivingChargeInput,
  | 'additionalCharges'
  | 'additionalHoursCharge'
  | 'caregiverInsuranceFee'
  | 'caregivingChargeConfirmStatus'
  | 'commissionFee'
  | 'covid19TestingCost'
  | 'expectedSettlementDate'
  | 'holidayCharge'
  | 'isCancelAfterArrived'
  | 'mealCost'
  | 'outstandingAmount'
  | 'patientConditionCharge'
  | 'transportationFee'
  | 'vacationCharge'
>

export type CaregivingChargeAdditionalChargeData = Pick<
  CaregivingChargeAdditionalChargeInput,
  'name' | 'amount' | 'sign'
>

export type SettlementTransactionCreateData = Pick<
  SettlementTransactionCreateInput,
  'amount' | 'transactionDate' | 'transactionSubjectId' | 'transactionType'
>
export type ReceptionUpdateData = Pick<
  ReceptionUpdateInput,
  | 'desiredCaregivingStartDate'
  | 'desiredCaregivingPeriod'
  | 'additionalRequests'
  | 'expectedCaregivingStartDate'
  | 'expectedCaregivingLimitDate'
  | 'progressingStatus'
  | 'reasonForCancellation'
  | 'notifyCaregivingProgress'
> & {
  accidentInfo: ReceptionAccidentInfoData
  caregivingManagerInfo: ReceptionCaregivingManagerInfoData
  insuranceInfo: ReceptionInsuranceInfoData
  patientInfo: ReceptionPatientInfoData
}

export type ReceptionCreateData = Pick<
  ReceptionCreateInput,
  | 'desiredCaregivingStartDate'
  | 'additionalRequests'
  | 'desiredCaregivingPeriod'
  | 'notifyCaregivingProgress'
  | 'urgency'
  | 'fixedDesiredCaregivingPeriod'
  | 'receivedDateTime'
> & {
  accidentInfo: ReceptionAccidentInfoData
  insuranceInfo: ReceptionInsuranceInfoData
  insuranceManagerInfo: ReceptionInsuranceManagerInfoData
  patientInfo: ReceptionPatientInfoData
  registerManagerInfo: ReceptionRegisterManagerInfoData
}

export type ReceptionCaregivingManagerInfoData = Pick<
  ReceptionCaregivingManagerInfoInput,
  'organizationType' | 'organizationId' | 'managingUserId'
>

export type ReceptionRegisterManagerInfoData = Pick<
  ReceptionRegisterManagerInfoInput,
  'managingUserId'
>

export type ReceptionInsuranceManagerInfoData = Pick<
  ReceptionInsuranceManagerInfoInput,
  'branchName' | 'phoneNumber' | 'receptionistName'
>

export type ReceptionAccidentInfoData = Pick<
  ReceptionAccidentInfoInput,
  | 'accidentNumber'
  | 'accidentDateTime'
  | 'claimType'
  | 'patientDescription'
  | 'admissionDateTime'
> & {
  hospitalRoomInfo: HospitalRoomInfoData
}

export type HospitalRoomInfoData = Pick<
  HospitalRoomInfoInput,
  'state' | 'city' | 'hospitalAndRoom'
>

export type ReceptionPatientInfoData = Pick<
  ReceptionPatientInfoInput,
  'name' | 'nickname' | 'age' | 'sex' | 'height' | 'weight'
> & {
  primaryContact: PatientContactData
  secondaryContact: PatientContactData
}

export type PatientContactData = Pick<
  PatientContactInput,
  'phoneNumber' | 'relationshipWithPatient'
>

export type ReceptionInsuranceInfoData = Pick<
  ReceptionInsuranceInfoInput,
  | 'insuranceNumber'
  | 'subscriptionDate'
  | 'coverageId'
  | 'caregivingLimitPeriod'
>

export type AccountInfoData = Pick<
  AccountInfoInput,
  'bank' | 'accountNumber' | 'accountHolder'
>

export type CaregiverInfoData = Pick<
  CaregiverInfoInput,
  | 'caregiverOrganizationId'
  | 'name'
  | 'sex'
  | 'birthDate'
  | 'phoneNumber'
  | 'insured'
  | 'dailyCaregivingCharge'
  | 'commissionFee'
> & {
  accountInfo: AccountInfoData
}

export type ReceptionCaregivingRoundData = Pick<
  ReceptionCaregivingRoundInput,
  | 'caregivingProgressingStatus'
  | 'startDateTime'
  | 'endDateTime'
  | 'caregivingRoundClosingReasonType'
  | 'caregivingRoundClosingReasonDetail'
  | 'remarks'
> & {
  caregiverInfo: CaregiverInfoData
}

export interface IReceptionDataForm {
  accidentDateTime: string
  accidentNumber: string
  additionalRequests: string
  admissionDateTime: string
  agreeNotification: boolean
  branchName: string
  caregivingLimitPeriod: number | null
  claimType: ClaimType | null
  coverageId: string | null
  desiredCaregivingStartDate: string
  desiredPeriod: number | null
  hospitalAndRoom: string
  insuranceNumber: string
  patientAge: number | null
  patientDescription: string
  patientName: string
  patientNickname: string
  patientSex: Sex | null
  primaryContactPhoneNumber: string
  primaryContactRelationshipWithPatient: string
  receptionName: string
  receptionPhoneNumber: string
  secondaryContactPhoneNumber: string
  secondaryContactPhoneNumberRelationshipWithPatient: string
  subscriptionDate: string
}

export type BillingTransactionData = Pick<
  BillingTransactionInput,
  'amount' | 'transactionDate' | 'transactionType' | 'transactionSubjectId'
>
