import {
  CaregivingProgressingStatus,
  CaregivingRoundClosingReasonType,
} from '../../../types'
import {IReceptionCaregivingRoundUpdate} from '../../../types/dto'
import {ReceptionCaregivingRoundData} from '../../../types/form'
import {formatDate, formatDateTimeText, getIsoString} from '../../../utils/date'
import CaregiverInfoInput from '../caregiver-info/Input'
import ReceptionCaregivingRoundResource from './Resource'

class ReceptionCaregivingRoundInput {
  caregivingProgressingStatus: CaregivingProgressingStatus | null

  startDateTime: string

  endDateTime: string

  caregivingRoundClosingReasonType: CaregivingRoundClosingReasonType | null

  caregivingRoundClosingReasonDetail: string | null

  caregiverInfo: CaregiverInfoInput

  remarks: string

  expectedSettlementDate: string

  constructor(resource?: ReceptionCaregivingRoundResource) {
    this.caregivingProgressingStatus =
      resource?.caregivingProgressingStatus || null
    this.startDateTime =
      (resource?.startDateTime && formatDateTimeText(resource.startDateTime)) ||
      ''
    this.endDateTime =
      (resource?.endDateTime && formatDateTimeText(resource.endDateTime)) || ''
    this.caregivingRoundClosingReasonType =
      resource?.caregivingRoundClosingReasonType || null
    this.caregivingRoundClosingReasonDetail =
      resource?.caregivingRoundClosingReasonDetail || null
    this.caregiverInfo =
      (resource?.caregiverInfo &&
        new CaregiverInfoInput(resource.caregiverInfo)) ||
      new CaregiverInfoInput()
    this.remarks = resource?.remarks || ''
    this.expectedSettlementDate = (resource?.expectedSettlementDate && formatDate(resource.expectedSettlementDate)) ||
        ''
  }

  get data(): ReceptionCaregivingRoundData {
    return {
      caregiverInfo: this.caregiverInfo.data,
      caregivingProgressingStatus: this.caregivingProgressingStatus,
      caregivingRoundClosingReasonDetail:
        this.caregivingRoundClosingReasonDetail,
      caregivingRoundClosingReasonType: this.caregivingRoundClosingReasonType,
      endDateTime: this.endDateTime,
      remarks: this.remarks,
      startDateTime: this.startDateTime,
      expectedSettlementDate : this.expectedSettlementDate,
    }
  }

  set data(data: ReceptionCaregivingRoundData) {
    const {
      caregivingProgressingStatus,
      startDateTime,
      endDateTime,
      caregivingRoundClosingReasonType,
      caregivingRoundClosingReasonDetail,
      caregiverInfo,
      remarks,
      expectedSettlementDate,
    } = data

    this.caregivingProgressingStatus = caregivingProgressingStatus
    this.startDateTime = startDateTime
    this.endDateTime = endDateTime
    this.caregivingRoundClosingReasonType = caregivingRoundClosingReasonType
    this.caregivingRoundClosingReasonDetail = caregivingRoundClosingReasonDetail
    this.caregiverInfo.data = caregiverInfo
    this.remarks = remarks
    this.expectedSettlementDate = expectedSettlementDate
  }

  get input(): IReceptionCaregivingRoundUpdate {
    return {
      caregiverInfo:
        (Boolean(
          this.caregiverInfo.input.name &&
            this.caregiverInfo.input.sex &&
            this.caregiverInfo.input.birthDate &&
            this.caregiverInfo.input.phoneNumber &&
            this.caregiverInfo.input.dailyCaregivingCharge,
        ) &&
          this.caregiverInfo.input) ||
        null,
      caregivingProgressingStatus: this
        .caregivingProgressingStatus as CaregivingProgressingStatus,
      caregivingRoundClosingReasonDetail:
        (Boolean(this.caregivingRoundClosingReasonDetail) &&
          this.caregivingRoundClosingReasonDetail) ||
        null,
      caregivingRoundClosingReasonType: this.caregivingRoundClosingReasonType,
      endDateTime:
        (Boolean(this.endDateTime) && getIsoString(this.endDateTime)) || null,
      remarks: this.remarks,
      startDateTime:
        (Boolean(this.startDateTime) && getIsoString(this.startDateTime)) ||
        null,
      expectedSettlementDate: this.expectedSettlementDate,
    }
  }
}

export default ReceptionCaregivingRoundInput
