/* eslint-disable sort-keys-fix/sort-keys-fix */
import {TextContent, TextItem} from 'pdfjs-dist/types/src/display/api'
import _ from 'lodash'
import {getDocument, GlobalWorkerOptions} from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import {PdfMetadata, PickedTextItem, TRANSFORM} from '../types'
import {PdfMetadataType, Point} from './types'
import {PDF_DATA_MAP, PDF_METADATA_TEXT} from './constants'
import {MeritzReception} from './reception'

/**
 * @param file 접수 PDF 파일을 입력합니다.
 * @returns PDF 파일에서 추출한 텍스트를 pdfjs 라이브러리에서 다루는 데이터 형태(TextContent)로 반환합니다.
 */
const extractTextContent = async (file: File): Promise<TextContent | null> => {
  GlobalWorkerOptions.workerSrc = pdfjsWorker

  const arrayBuffer = await file.arrayBuffer()

  const loadingTask = getDocument({
    cMapPacked: true,
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/cmaps/',
    data: arrayBuffer,
  })
  const pdf = await loadingTask.promise
  const totalPageNum = pdf.numPages

  if (totalPageNum < 1 || totalPageNum > 1) {
    return null
  }

  const page = await pdf.getPage(1)
  const textContent = await page.getTextContent()

  return textContent
}

/**
 * @param textContent PDF 파일에서 추출한 텍스트로, pdfjs 라이브러리에서 다루는 데이터 형태입니다. extractTextContent()를 사용하여 값을 얻을 수 있습니다.
 * @returns textContent에서 정보를 추출하는데 유의미한 값을 가지는 데이터만 필터링하고 필요한 형태로 가공(PickedTextItem[])하여 반환합니다.
 */
const extractTextItems = (textContent: TextContent): PickedTextItem[] => {
  return textContent.items
    .filter(
      (item) =>
        'height' in item &&
        'str' in item &&
        'width' in item &&
        'transform' in item &&
        item.height !== 0,
    )
    .map((item) => {
      const {hasEOL, height, str, width, transform} = item as TextItem
      return {
        transformStr: transform.join(' '),
        transform,
        str,
        width,
        height,
        hasEOL,
      }
    })
}

/**
 * @param textItems 정보를 추출하기 위해 가공된 텍스트 데이터입니다. extractTextItems()를 사용하여 값을 얻을 수 있습니다.
 * @returns textItem의 y값을 key, 해당 y값을 가지는 모든 textItems를 value로 하는 Map을 반환합니다.
 */
const groupByY = (
  textItems: PickedTextItem[],
): Map<number, PickedTextItem[]> => {
  const textItemsByY = new Map<number, PickedTextItem[]>()

  for (const item of textItems) {
    const key = item.transform[TRANSFORM.TRANSLATE_Y]
    const value = textItemsByY.get(key)

    if (value) {
      textItemsByY.set(key, [...value, item])
    } else {
      textItemsByY.set(key, [item])
    }
  }

  return textItemsByY
}

/**
 * @description 접수 PDF 파일이 접수 정보 추출에 필요한 최소한의 메타 정보가 존재하는 양식인 지 검사할 때 사용합니다.
 * @param textItemsGroupedByY textItems를 동일한 y값을 가지는 것끼리 묶은 데이터입니다. groupByY()를 사용하여 값을 얻을 수 있습니다.
 * @returns 접수 PDF 파일이 접수 정보를 추출할 수 있는 올바른 양식인 경우 메타 정보를 반환합니다. 그 외의 경우 null을 반환합니다.
 */
const getPdfMetadata = (
  textItemsGroupedByY: Map<number, PickedTextItem[]>,
): Map<PdfMetadataType, PdfMetadata> | null => {
  const pdfMetadataTexts = _.values(PDF_METADATA_TEXT)
  let foundMetadataCount = 0
  const result = new Map<PdfMetadataType, PdfMetadata>()

  for (const [key, textItems] of textItemsGroupedByY) {
    if (foundMetadataCount === pdfMetadataTexts.length) {
      break
    }
    const metadataTextItem = textItems.find((item) =>
      pdfMetadataTexts.includes(item.str),
    )
    if (metadataTextItem) {
      const metadataType = _.findKey(
        PDF_METADATA_TEXT,
        (metadataText) => metadataText === metadataTextItem.str,
      )
      if (!metadataType) {
        continue
      }
      result.set(metadataType as PdfMetadataType, {
        text: metadataTextItem.str,
        ty: key,
      })
      foundMetadataCount += 1
    }
  }

  return foundMetadataCount === pdfMetadataTexts.length ? result : null
}

/**
 * @description 여러 x값(열)에 존재하는 텍스트를 공백 문자(" ")로 연결합니다.
 * @param textItems 정보를 추출하기 위해 가공된 텍스트 데이터입니다. extractTextItems()를 사용하여 값을 얻을 수 있습니다.
 * @param point 텍스트를 연결할 x값의 범위를 참조하는데 사용합니다.
 * @returns point.x.min ~ point.x.max 사이의 모든 텍스트를 연결한 하나의 텍스트를 반환합니다.
 */
const joinTextsOfY = (textItems: PickedTextItem[], point: Point): string => {
  const textPieces: string[] = []

  if (typeof point.x.fixedValue !== 'undefined') {
    const matchedTextItem = textItems?.find(
      (item) => point.x.fixedValue === item.transform[TRANSFORM.TRANSLATE_X],
    )
    matchedTextItem?.str && textPieces.push(matchedTextItem.str)
  } else {
    for (const textItem of textItems) {
      if (
        typeof point.x.min !== 'undefined' &&
        textItem.transform[TRANSFORM.TRANSLATE_X] < point.x.min
      ) {
        continue
      }
      if (
        typeof point.x.max !== 'undefined' &&
        textItem.transform[TRANSFORM.TRANSLATE_X] > point.x.max
      ) {
        break
      }
      textPieces.push(textItem.str)
    }
  }
  return textPieces.join(' ')
}

/**
 * @description 여러 y값(행)에 존재하는 텍스트를 줄바꿈 문자("\n")로 연결합니다.
 * @param textItemsGroupedByY textItems를 동일한 y값을 가지는 것끼리 묶은 데이터입니다. groupByY()를 사용하여 값을 얻을 수 있습니다.
 * @param point 텍스트를 연결할 y값의 범위를 참조하는데 사용합니다.
 * @returns point.y.min ~ point.y.max 사이의 모든 텍스트를 연결한 하나의 텍스트를 반환합니다.
 */
const joinTextsOfYs = (
  textItemsGroupedByY: Map<number, PickedTextItem[]>,
  point: Point,
): string => {
  const textPieces: string[] = []

  for (const [currentY, currentTextItems] of textItemsGroupedByY.entries()) {
    if (typeof point.y.max !== 'undefined' && currentY > point.y.max) {
      continue
    }
    if (typeof point.y.min !== 'undefined' && currentY < point.y.min) {
      break
    }
    const joinedTextOfY = joinTextsOfY(currentTextItems, point)
    Boolean(joinedTextOfY) && textPieces.push(joinedTextOfY)
  }
  return textPieces.join('\n')
}

/**
 * @description Meritz 접수 PDF 파일에서 정보를 추출합니다.
 */
export const extractMeritzReceptionData = async (
  file: File,
): Promise<MeritzReception> => {
  const textContent = await extractTextContent(file)

  if (!textContent) {
    throw new Error('PDF 파일에서 텍스트를 추출할 수 없습니다.')
  }

  const textItems = extractTextItems(textContent).sort(
    (a, b) =>
      b.transform[TRANSFORM.TRANSLATE_Y] - a.transform[TRANSFORM.TRANSLATE_Y],
  )
  const textItemsGroupedByY = groupByY(textItems)
  const pdfMetadata = getPdfMetadata(textItemsGroupedByY)

  if (!pdfMetadata) {
    throw new Error('PDF 파일의 메타 데이터가 올바르지 않습니다.')
  }

  const meritzReception = new MeritzReception()

  for (const [key, point] of PDF_DATA_MAP.entries()) {
    let textOfKey = ''

    if (typeof point.y.fixedValue !== 'undefined') {
      // 한 데이터가 하나의 y값(행)에 존재하는 경우
      // 해당 y값(행)에 존재하는 텍스트만 연결합니다.
      const textItems = textItemsGroupedByY.get(point.y.fixedValue)
      textItems && (textOfKey = joinTextsOfY(textItems, point))
    } else {
      // 한 데이터가 여러 y값(행)에 흩어져 있는 경우
      // 가능한 y값 범위의 모든 텍스트를 연결합니다.
      textOfKey = joinTextsOfYs(textItemsGroupedByY, point)
    }
    meritzReception.set(key, textOfKey)
  }

  return meritzReception
}
