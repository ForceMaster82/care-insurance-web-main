export type PdfMetadataType =
  | 'DOC_NAME'
  | 'SECTION_1'
  | 'SECTION_2'
  | 'SECTION_3'

type AxisRange = {
  fixedValue?: number
  max?: number
  min?: number
}

export type Point = {
  x: AxisRange
  y: AxisRange
}
