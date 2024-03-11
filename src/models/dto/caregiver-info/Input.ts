import {Sex} from '../../../types'
import {ICaregiverInfo} from '../../../types/dto'
import {CaregiverInfoData} from '../../../types/form'
import {
  formatPhoneNumberWithHyphen,
  formatStaticNumberWithComma,
  removeNotNumber,
} from '../../../utils/formatter'
import AccountInfoInput from '../account-info/Input'
import CaregiverInfoResource from './Resource'
import {getIsoString} from '~utils/date'

class CaregiverInfoInput {
  caregiverOrganizationId: string | null

  name: string

  sex: Sex

  birthDate: string

  phoneNumber: string

  insured: boolean

  dailyCaregivingCharge: string

  commissionFee: string

  accountInfo: AccountInfoInput

  constructor(resource?: CaregiverInfoResource) {
    this.caregiverOrganizationId = resource?.caregiverOrganizationId || null
    this.name = resource?.name || ''
    this.sex = resource?.sex || 'FEMALE'
    this.birthDate = resource?.birthDate || '1970-01-01'
    this.phoneNumber = resource
      ? formatPhoneNumberWithHyphen(resource.phoneNumber)
      : ''
    this.insured = resource?.insured || false
    this.dailyCaregivingCharge = resource
      ? formatStaticNumberWithComma(resource.dailyCaregivingCharge).toString()
      : '0'
    this.commissionFee = resource
      ? formatStaticNumberWithComma(resource.commissionFee).toString()
      : '0'
    this.accountInfo = new AccountInfoInput(resource?.accountInfo)
  }

  get data(): CaregiverInfoData {
    return {
      accountInfo: this.accountInfo.data,
      birthDate: this.birthDate,
      caregiverOrganizationId: this.caregiverOrganizationId,
      commissionFee: this.commissionFee,
      dailyCaregivingCharge: this.dailyCaregivingCharge,
      insured: this.insured,
      name: this.name,
      phoneNumber: this.phoneNumber,
      sex: this.sex,
    }
  }

  set data(data: CaregiverInfoData) {
    const {
      caregiverOrganizationId,
      name,
      sex,
      birthDate,
      phoneNumber,
      insured,
      dailyCaregivingCharge,
      commissionFee,
      accountInfo,
    } = data

    this.caregiverOrganizationId = caregiverOrganizationId
    this.name = name
    this.sex = sex
    this.birthDate = birthDate
    this.phoneNumber = phoneNumber
    this.insured = insured
    this.dailyCaregivingCharge = dailyCaregivingCharge
    this.commissionFee = commissionFee
    this.accountInfo.data = accountInfo
  }

  get input(): ICaregiverInfo {
    return {
      accountInfo: this.accountInfo.data,
      birthDate: this.birthDate, //getIsoString(this.birthDate),
      caregiverOrganizationId:
        (this.caregiverOrganizationId !== 'CAREDOC' &&
          this.caregiverOrganizationId) ||
        null,
      commissionFee: Number(removeNotNumber(this.commissionFee)),
      dailyCaregivingCharge: Number(
        removeNotNumber(this.dailyCaregivingCharge),
      ),
      insured: this.insured,
      name: this.name,
      phoneNumber: removeNotNumber(this.phoneNumber),
      sex: this.sex,
    }
  }
}

export default CaregiverInfoInput
