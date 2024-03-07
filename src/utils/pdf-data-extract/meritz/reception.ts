/* eslint-disable no-magic-numbers */
import ReceptionCreateInput from '../../../models/dto/reception/CreateInput'
import {ClaimType, Sex} from '../../../types'
import {PatientContactData, ReceptionCreateData} from '../../../types/form'

const matchDateTimeText = (value: string): RegExpMatchArray | null => {
  return value.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/)
}

const matchDateText = (value: string): RegExpMatchArray | null => {
  return value.match(/(\d{4})-(\d{2})-(\d{2})/)
}

export class MeritzReception {
  accidentNumber = ''

  insuranceNumber = ''

  _patientBasicInfo = ''

  _accidentDateTime = ''

  _claimTypeText = ''

  _subscriptionDate = ''

  _caregivingLimitPeriod = ''

  patientDescription = ''

  _admissionDateTime = ''

  hospitalAndRoom = ''

  _desiredCaregivingStartDate = ''

  _patientContact = ''

  additionalRequests = ''

  insuranceCompanyBranchName = ''

  insuranceManagerName = ''

  insuranceManagerPhoneNumber = ''

  get patientBasicInfo(): {age: number; name: string; sex: Sex} | null {
    const matchResult = this._patientBasicInfo.match(/(.+)\((.), (\d+)\)/)

    if (!matchResult) {
      return null
    }
    return {
      age: Number(matchResult[3]),
      name: matchResult[1],
      sex: matchResult[2] === '남' ? 'MALE' : 'FEMALE',
    }
  }

  get accidentDateTime(): string {
    const matchResult = matchDateTimeText(this._accidentDateTime)

    if (!matchResult) {
      return ''
    }
    const [, year, month, day, hour, minute] = matchResult

    return `${year}-${month}-${day}T${hour}:${minute}:00`
  }

  get claimType(): ClaimType | null {
    return (
      (this._claimTypeText === '상해' && 'ACCIDENT') ||
      (this._claimTypeText === '질병' && 'SICKNESS') ||
      null
    )
  }

  get subscriptionDate(): string {
    const matchResult = matchDateText(this._subscriptionDate)

    if (!matchResult) {
      return ''
    }
    const [, year, month, day] = matchResult

    return `${year}-${month}-${day}`
  }

  get caregivingLimitPeriod(): string {
    const matchResult = this._caregivingLimitPeriod.match(/\d+/)

    if (!matchResult) {
      return ''
    }
    return Number(matchResult).toString()
  }

  get admissionDateTime(): string {
    const matchResult = matchDateTimeText(this._admissionDateTime)

    if (!matchResult) {
      return ''
    }
    const [, year, month, day, hour, minute] = matchResult

    return `${year}-${month}-${day}T${hour}:${minute}:00`
  }

  get desiredCaregivingStartDate(): string {
    const matchResult = matchDateText(this._desiredCaregivingStartDate)

    if (!matchResult) {
      return ''
    }
    const [, year, month, day] = matchResult

    return `${year}-${month}-${day}`
  }

  get patientContacts(): PatientContactData[] {
    const matchResult = [
      ...this._patientContact.matchAll(/(\d{3}(?:-\d{3,4}){2})(.?\((.+)\))?/g),
    ]

    return matchResult.map(([, phoneNumber, , relationshipWithPatient]) => ({
      phoneNumber: phoneNumber || '',
      relationshipWithPatient: relationshipWithPatient || '',
    }))
  }

  get patientPrimaryContact(): PatientContactData {
    const hasData = this.patientContacts.length > 0

    return {
      phoneNumber: (hasData && this.patientContacts[0].phoneNumber) || '',
      relationshipWithPatient:
        (hasData && this.patientContacts[0].relationshipWithPatient) || '',
    }
  }

  get patientSecondaryContact(): PatientContactData {
    const hasData = this.patientContacts.length > 1

    return {
      phoneNumber: (hasData && this.patientContacts[1].phoneNumber) || '',
      relationshipWithPatient:
        (hasData && this.patientContacts[1].relationshipWithPatient) || '',
    }
  }

  set<K extends keyof this>(property: K, value: this[K]): void {
    this[property] = value
  }

  getReceptionCreateData(): ReceptionCreateData {
    const input = new ReceptionCreateInput()

    return {
      ...input.data,
      accidentInfo: {
        ...input.accidentInfo.data,
        accidentDateTime: this.accidentDateTime,
        accidentNumber: this.accidentNumber,
        admissionDateTime: this.admissionDateTime,
        claimType: this.claimType,
        hospitalRoomInfo: {
          ...input.accidentInfo.hospitalRoomInfo.data,
          hospitalAndRoom: this.hospitalAndRoom,
        },
        patientDescription: this.patientDescription,
      },
      additionalRequests: this.additionalRequests,
      desiredCaregivingStartDate: this.desiredCaregivingStartDate,
      insuranceInfo: {
        ...input.insuranceInfo.data,
        caregivingLimitPeriod: this.caregivingLimitPeriod,
        insuranceNumber: this.insuranceNumber,
        subscriptionDate: this.subscriptionDate,
      },
      insuranceManagerInfo: {
        ...input.insuranceManagerInfo.data,
        branchName: this.insuranceCompanyBranchName,
        phoneNumber: this.insuranceManagerPhoneNumber,
        receptionistName: this.insuranceManagerName,
      },
      patientInfo: {
        ...input.patientInfo.data,
        age: this.patientBasicInfo?.age.toString() || '',
        name: this.patientBasicInfo?.name || '',
        primaryContact: this.patientPrimaryContact,
        secondaryContact: this.patientSecondaryContact,
        sex: this.patientBasicInfo?.sex || 'MALE',
      },
    }
  }
}
