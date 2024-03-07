import {addSeconds} from 'date-fns'

const getSignedAt = (url: URL): Date | null => {
  const SIGNED_AT_QUERY_KEY = 'X-Amz-Date'
  const signedAtText = url.searchParams.get(SIGNED_AT_QUERY_KEY)

  if (!signedAtText) {
    return null
  }

  const SIGNED_AT_REGEX = /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/
  const signedAtMatchResult = signedAtText.match(SIGNED_AT_REGEX)

  if (!signedAtMatchResult) {
    return null
  }

  const [, year, month, day, hour, minute, second] = signedAtMatchResult
  return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`)
}

export const getExpiredAt = (url: URL): Date | null => {
  const VALID_SECONDS_QUERY_KEY = 'X-Amz-Expires'

  const signedAt = getSignedAt(url)
  const validSecondsText = url.searchParams.get(VALID_SECONDS_QUERY_KEY)

  if (!signedAt || !validSecondsText) {
    return null
  }

  return addSeconds(signedAt, Number(validSecondsText))
}
