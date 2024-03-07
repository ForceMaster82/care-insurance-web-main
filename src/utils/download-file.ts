import {isServer} from '@caredoc/utils-web'

export const downloadFile = (fileData: File | File[]): void => {
  if (isServer()) {
    return
  }

  const files = fileData instanceof File ? [fileData] : fileData
  const link = document.createElement('a')

  for (const file of files) {
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name

    link.click()
    URL.revokeObjectURL(url)
  }

  link.remove()
}
