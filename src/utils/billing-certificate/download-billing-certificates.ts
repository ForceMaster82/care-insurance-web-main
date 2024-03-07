import {downloadFile} from '../download-file'
import {getFilenameFromHttpHeaders} from '../get-filename-from-http-headers'
import {fetchBillingCertificates} from './fetch-billing-certificates'

export const downloadBillingCertificates = async (
  billingIds: string[],
): Promise<void> => {
  try {
    const responses = await fetchBillingCertificates(billingIds)
    const files = responses.map(
      (response) =>
        new File(
          [response.body],
          getFilenameFromHttpHeaders(response.headers) || '',
          {
            type: response.headers.get('Content-Type') || 'image/jpeg',
          },
        ),
    )
    downloadFile(files)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : error
    // eslint-disable-next-line no-alert
    alert(errorMessage)
  }
}
