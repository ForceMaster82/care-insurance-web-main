import {EMPTY_VALUE_TEXT, ORGANIZATION_TYPE} from '../constants'
import HospitalRoomInfoResource from '../models/dto/hospital-room-info/Resource'
import {OrganizationType, Period} from '../types'
import {
  IExternalCaregivingManager,
  IExternalCaregivingOrganization,
  IInternalCaregivingManager,
} from '../types/dto'
import {HospitalRoomInfoData} from '../types/form'

export const generateHospitalRoomInfoText = (
  hospitalRoomInfo: HospitalRoomInfoData | HospitalRoomInfoResource,
): string => {
  const {state, city, hospitalAndRoom} = hospitalRoomInfo
  const stateAndCityText =
    ((state && `${state} `) || '') + ((city && `${city} `) || '')
  return `${stateAndCityText}${hospitalAndRoom}`
}

export const generateCaregivingManagerInfoText = (
  organizationType: OrganizationType,
  caregivingManager: IInternalCaregivingManager | IExternalCaregivingManager,
  externalCaregivingOrganization?: IExternalCaregivingOrganization | null,
): string => {
  const organizationName =
    (organizationType === 'INTERNAL' && ORGANIZATION_TYPE['INTERNAL']) ||
    externalCaregivingOrganization?.name ||
    EMPTY_VALUE_TEXT
  const caregivingManagerName = caregivingManager.name

  return `${caregivingManagerName} (${organizationName})`
}

export const generatePeriodText = (
  period: Period,
  omitHours = false,
): string => {
  const {days, hours} = period

  return `${days}일 ${(hours !== 0 && !omitHours && `${hours}시간`) || ''}`
}
