import {differenceInYears} from 'date-fns'
import {Sex} from '../../../types'
import {ICaregiverInfo} from '../../../types/dto'
import AccountInfoResource from '../account-info/Resource'

class CaregiverInfoResource {
  #caregiverOrganizationId: string | null

  #name: string

  #sex: Sex

  #birthDate: string

  #phoneNumber: string

  #insured: boolean

  #dailyCaregivingCharge: number

  #commissionFee: number

  #accountInfo: AccountInfoResource

  constructor(data: ICaregiverInfo) {
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

    this.#caregiverOrganizationId = caregiverOrganizationId
    this.#name = name
    this.#sex = sex
    this.#birthDate = birthDate
    this.#phoneNumber = phoneNumber
    this.#insured = insured
    this.#dailyCaregivingCharge = dailyCaregivingCharge
    this.#commissionFee = commissionFee
    this.#accountInfo = new AccountInfoResource(accountInfo)
  }

  get caregiverOrganizationId(): string | null {
    return this.#caregiverOrganizationId
  }

  get name(): string {
    return this.#name
  }

  get sex(): Sex {
    return this.#sex
  }

  get birthDate(): string {
    return this.#birthDate
  }

  get age(): number {
    return differenceInYears(Date.now(), new Date(this.#birthDate))
  }

  get phoneNumber(): string {
    return this.#phoneNumber
  }

  get insured(): boolean {
    return this.#insured
  }

  get dailyCaregivingCharge(): number {
    return this.#dailyCaregivingCharge
  }

  get commissionFee(): number {
    return this.#commissionFee
  }

  get accountInfo(): AccountInfoResource {
    return this.#accountInfo
  }
}

export default CaregiverInfoResource
