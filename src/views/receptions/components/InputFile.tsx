/* eslint-disable unicorn/filename-case */
import {Box, Button, Input} from '@caredoc/ui-web'
import React, {
  ChangeEvent,
  PropsWithChildren,
  ReactElement,
  useRef,
} from 'react'

interface IProps {
  existingFileName?: string | null
  file: File | null
  onClear: () => void
  onSelect: (file: File) => void
  renderUploadButton?: (onClick: () => void) => ReactElement
}

const InputFile = (props: PropsWithChildren<IProps>): ReactElement => {
  const {
    file,
    onSelect,
    onClear,
    renderUploadButton,
    existingFileName = null,
  } = props

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleOnSelectFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files?.length) {
      return
    }
    onSelect(e.target.files[0])
  }

  const handleOnClickFind = (): void => {
    fileInputRef.current?.click()
  }

  return (
    <Box alignItems="center" flexDirection="row" gap="xs">
      <Box flex={1}>
        <Input
          affix={((file || existingFileName) && 'close-circle') || undefined}
          ellipsis
          onClickAffixIcon={onClear}
          readonly
          value={file?.name || existingFileName || ''}
        />
      </Box>
      {(renderUploadButton && renderUploadButton(handleOnClickFind)) || (
        <Button color="primary" onClick={handleOnClickFind} variant="secondary">
          파일 찾기
        </Button>
      )}
      <input
        accept=".pdf"
        onChange={handleOnSelectFile}
        ref={fileInputRef}
        style={{display: 'none'}}
        type="file"
      />
    </Box>
  )
}

export default InputFile
