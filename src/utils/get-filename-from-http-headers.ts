export const getFilenameFromHttpHeaders = (headers: Headers): string | null => {
  const contentDisposition = headers.get('Content-Disposition')
  const filenameRegex = /(?<=filename=").+(?=\..+")/
  const filename = contentDisposition?.match(filenameRegex)?.at(0)

  if (!filename) {
    return null
  }

  const decodedFilename = decodeURIComponent(filename)

  return decodedFilename
}
