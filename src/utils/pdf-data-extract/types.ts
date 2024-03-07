import {TextItem} from 'pdfjs-dist/types/src/display/api'

// common PDF types
export enum TRANSFORM {
  SCALE_X,
  SKEW_Y,
  SKEW_X,
  SCALE_Y,
  TRANSLATE_X,
  TRANSLATE_Y,
}

export type PickedTextItem = Pick<
  TextItem,
  'height' | 'str' | 'transform' | 'width'
>

export type PdfMetadata = {
  text: string
  ty: number
}
