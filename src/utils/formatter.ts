import PatientContactResource from '../models/dto/patient-contact/Resource'

const DATE_MAX_LENGTH = 8
const PHONE_NUMBER_MAX_LENGTH = 11
const AREA_CODES = [
  '02',
  '032',
  '042',
  '051',
  '052',
  '053',
  '062',
  '064',
  '031',
  '033',
  '041',
  '043',
  '054',
  '055',
  '061',
  '063',
]

export const removeNotNumber = (text: string): string => text.replace(/\D/g, '')

export const formatMaskedPhoneNumberWithHyphen = (
  originalText: string,
): string => {
  const text = originalText.slice(0, PHONE_NUMBER_MAX_LENGTH)

  return text.replace(/^(\d{0,3})(\*{0,4})(\d{0,4})$/g, '$1-$2-$3')
}

export const formatPhoneNumberWithHyphen = (originalText: string): string => {
  const isLandline = AREA_CODES.some((areaCode) =>
    originalText.startsWith(areaCode),
  )

  let text = removeNotNumber(originalText).slice(0, PHONE_NUMBER_MAX_LENGTH)

  if (isLandline) {
    text = text
      .replace(/^(02|\d{3})(\d{3,4})(\d{4})/g, '$1-$2-$3')
      .replace(/-{1,2}$/g, '')
  } else {
    text =
      text.length === PHONE_NUMBER_MAX_LENGTH
        ? text
            .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/-{1,2}$/g, '')
        : text
            .replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, '$1-$2-$3')
            .replace(/-{1,2}$/g, '')
  }

  return text
}

export const formatAccountNumber = (text: string): string => {
  return text.replace(/[^\d-]+/g, '')
}

export const formatNumberWithComma = (value: number | string): string => {
  return String(value)
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .replace(/^(0)([1-9])$/, (_, p1, p2) => `${p2}`)
}

export const formatStaticNumberWithComma = (
  value: number,
  options?: Intl.NumberFormatOptions,
): string => {
  return value.toLocaleString('ko-KR', options)
}

export const formatPatientContactInfo = (
  data: PatientContactResource,
  isMasked = false,
): string => {
  return `${(isMasked
    ? formatMaskedPhoneNumberWithHyphen
    : formatPhoneNumberWithHyphen)(data.phoneNumber)} (${
    data.relationshipWithPatient
  })`
}

export const formatDateText = (data: string): string => {
  const slicedData = removeNotNumber(data).slice(0, DATE_MAX_LENGTH)

  return slicedData.replace(/^(\d{4})(\d{2})(\d{2})$/g, '$1-$2-$3')
}
