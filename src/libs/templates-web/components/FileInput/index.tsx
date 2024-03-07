import {type IInput, Input} from '@caredoc/ui-web'
import React, {ChangeEvent, ReactElement, useRef, useState} from 'react'

export interface IFileInputProps {
  disabled?: boolean
  errors?: string[]
  inputProps?: IInput
  multiple?: boolean
  onFileChanged: (files: FileList | null) => void
  renderTarget?: (openInput: () => void) => ReactElement
}

const FileInput = ({
  disabled,
  errors = [],
  multiple = false,
  onFileChanged,
  inputProps,
  renderTarget,
}: IFileInputProps) => {
  const ref = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')

  const handleOnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: {files},
    } = event

    setFileName(files?.length ? files[0].name : '')
    onFileChanged(files)
  }

  const handleOnPressFileUpload = () => {
    ref.current?.click()
  }

  const renderTargetComponent = () => {
    if (renderTarget) {
      return renderTarget(handleOnPressFileUpload)
    }

    return (
      <Input
        {...inputProps}
        affix="chart"
        disabled={disabled}
        errors={errors}
        onClickAffixIcon={handleOnPressFileUpload}
        readonly
        value={fileName}
      />
    )
  }

  return (
    <>
      {renderTargetComponent()}
      <input
        disabled={disabled}
        multiple={multiple}
        onChange={handleOnFileChange}
        ref={ref}
        style={{display: 'none'}}
        type="file"
      />
    </>
  )
}

export default FileInput
