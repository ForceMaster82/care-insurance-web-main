/* eslint-disable no-alert */
import {space} from '@caredoc/ui-master'
import {Box, Button, Icon, Typography} from '@caredoc/ui-web'
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {Document, Page} from 'react-pdf'
import useResizeObserver from 'use-resize-observer'
import DragScrollBox from 'react-indiana-drag-scroll'
import {PDFDocumentProxy} from 'pdfjs-dist'

interface IProps {
  file?: File | null
}

const DEFAULT_SCALE = 1
const SCALE_STEP = 0.2
const MIN_SCALE = 0 + SCALE_STEP

const PdfViewer = (props: IProps): ReactElement => {
  const {file} = props

  const {ref: pdfViewerWrapperRef, width} = useResizeObserver<HTMLDivElement>({
    box: 'border-box',
  })

  const [scale, setScale] = useState(DEFAULT_SCALE)
  const [numOfPages, setNumOfPages] = useState(0)
  const [rawFile, setRawFile] = useState<ArrayBuffer | null>(null)

  const pdfPageWidth = useMemo(
    () => (typeof width !== 'undefined' && width - 2 * space.xl) || 0,
    [width],
  )

  const handleOnScaleDown = (): void =>
    setScale((value) => {
      const newScaleValue = value - SCALE_STEP

      if (newScaleValue < MIN_SCALE) {
        return value
      }
      return newScaleValue
    })

  const handleOnDocumentLoadSuccess = ({numPages}: PDFDocumentProxy): void => {
    setNumOfPages(numPages)
  }

  const handleOnChangeFile = useCallback((): void => {
    setNumOfPages(0)

    if (!file) {
      setRawFile(null)
    } else {
      file
        .arrayBuffer()
        .then((arrayBuffer) => {
          return setRawFile(arrayBuffer)
        })
        .catch((error) => {
          alert((error as Error).message)
        })
    }
  }, [file])

  useEffect(() => {
    handleOnChangeFile()
  }, [handleOnChangeFile])

  return (
    <Box
      backgroundColor="n300"
      borderRadius="md"
      gap="xl"
      p="lg"
      ref={pdfViewerWrapperRef}
      width="50vw"
    >
      {rawFile && (
        <Box alignSelf="flex-end" flexDirection="row" gap="xs">
          <Button
            color="n400"
            disabled={scale === MIN_SCALE}
            onClick={handleOnScaleDown}
            size="xs"
          >
            <Icon
              fill={(scale === MIN_SCALE && 'fontTertiary') || 'fontPrimary'}
              name="minus"
            />
          </Button>
          <Button
            color="n400"
            onClick={(): void => setScale((value) => value + SCALE_STEP)}
            size="xs"
          >
            <Icon name="plus" size="sm" />
          </Button>
        </Box>
      )}
      <DragScrollBox
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          height: '100%',
        }}
      >
        <Document
          error="파일을 불러올 수 없습니다."
          file={rawFile}
          loading="파일을 불러오고 있습니다..."
          noData={<Typography>PDF Viewer</Typography>}
          onLoadSuccess={handleOnDocumentLoadSuccess}
          options={{
            cMapPacked: true,
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/cmaps/',
          }}
        >
          {Array.from({length: numOfPages}).map((_, index) => (
            <Page
              error="페이지를 불러올 수 없습니다."
              key={`pdf-viewer-page-${index}`}
              pageNumber={index + 1}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              scale={scale}
              width={pdfPageWidth}
            />
          ))}
        </Document>
      </DragScrollBox>
    </Box>
  )
}

export default PdfViewer
