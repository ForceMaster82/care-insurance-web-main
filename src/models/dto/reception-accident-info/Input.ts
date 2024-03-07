import {ClaimType} from '../../../types'
import {IReceptionAccidentInfo} from '../../../types/dto'
import {ReceptionAccidentInfoData} from '../../../types/form'
import {formatDateTimeText, getIsoString} from '../../../utils/date'
import HospitalRoomInfoInput from '../hospital-room-info/Input'
import ReceptionAccidentInfoResource from './Resource'

class ReceptionAccidentInfoInput {
  accidentNumber: string

  accidentDateTime: string

  claimType: ClaimType | null

  patientDescription: string

  admissionDateTime: string

  hospitalRoomInfo: HospitalRoomInfoInput

  constructor(resource?: ReceptionAccidentInfoResource) {
    this.accidentNumber = resource?.accidentNumber || ''
    this.accidentDateTime =
      (resource?.accidentDateTime &&
        formatDateTimeText(resource.accidentDateTime)) ||
      ''
    this.claimType = resource?.claimType || null
    this.patientDescription = resource?.patientDescription || ''
    this.admissionDateTime =
      (resource?.admissionDateTime &&
        formatDateTimeText(resource.admissionDateTime)) ||
      ''
    this.hospitalRoomInfo = new HospitalRoomInfoInput(
      resource?.hospitalRoomInfo,
    )
  }

  get data(): ReceptionAccidentInfoData {
    return {
      accidentDateTime: this.accidentDateTime,
      accidentNumber: this.accidentNumber,
      admissionDateTime: this.admissionDateTime,
      claimType: this.claimType,
      hospitalRoomInfo: this.hospitalRoomInfo.data,
      patientDescription: this.patientDescription,
    }
  }

  set data(data: ReceptionAccidentInfoData) {
    const {
      accidentNumber,
      accidentDateTime,
      claimType,
      patientDescription,
      admissionDateTime,
      hospitalRoomInfo,
    } = data

    this.accidentNumber = accidentNumber
    this.accidentDateTime = accidentDateTime
    this.claimType = claimType
    this.patientDescription = patientDescription
    this.admissionDateTime = admissionDateTime
    this.hospitalRoomInfo.data = hospitalRoomInfo
  }

  get input(): IReceptionAccidentInfo {
    return {
      accidentDateTime: getIsoString(this.accidentDateTime),
      accidentNumber: this.accidentNumber,
      admissionDateTime: getIsoString(this.admissionDateTime),
      claimType: this.claimType as ClaimType,
      hospitalRoomInfo: this.hospitalRoomInfo.input,
      patientDescription: this.patientDescription,
    }
  }
}

export default ReceptionAccidentInfoInput
