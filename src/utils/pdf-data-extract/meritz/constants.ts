import {MeritzReception} from './reception'
import {PdfMetadataType, Point} from './types'

export const PDF_DATA_MAP = new Map<keyof MeritzReception, Point>([
  ['accidentNumber', {x: {fixedValue: 132.501}, y: {max: 701, min: 691}}],
  ['insuranceNumber', {x: {fixedValue: 475}, y: {max: 701, min: 691}}],
  ['_patientBasicInfo', {x: {fixedValue: 132.501}, y: {max: 675, min: 665}}],
  [
    '_accidentDateTime',
    {x: {max: 196.38, min: 132.501}, y: {max: 649, min: 639}},
  ],
  ['_claimTypeText', {x: {fixedValue: 475}, y: {max: 649, min: 639}}],
  ['_subscriptionDate', {x: {fixedValue: 132.501}, y: {max: 623, min: 613}}],
  ['_caregivingLimitPeriod', {x: {min: 475}, y: {max: 598, min: 588}}],
  ['patientDescription', {x: {min: 132}, y: {max: 501, min: 491}}],
  ['_admissionDateTime', {x: {min: 135}, y: {max: 409, min: 399}}],
  ['hospitalAndRoom', {x: {min: 135}, y: {max: 383, min: 373}}],
  ['_desiredCaregivingStartDate', {x: {min: 135}, y: {max: 357, min: 347}}],
  ['_patientContact', {x: {min: 135}, y: {max: 305, min: 295}}],
  ['additionalRequests', {x: {min: 135}, y: {max: 256, min: 246}}],
  ['insuranceCompanyBranchName', {x: {min: 135}, y: {max: 171, min: 161}}],
  ['insuranceManagerName', {x: {min: 135}, y: {max: 145, min: 135}}],
  ['insuranceManagerPhoneNumber', {x: {min: 135}, y: {max: 119, min: 109}}],
])

export const PDF_METADATA_TEXT: Record<PdfMetadataType, string> = {
  DOC_NAME: '간병인 신청서',
  SECTION_1: '사고 정보',
  SECTION_2: '입원 정보',
  SECTION_3: '담당자 정보',
} as const
