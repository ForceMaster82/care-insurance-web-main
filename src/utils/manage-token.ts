import jwtDecode, {JwtPayload} from 'jwt-decode'
import Cookies from 'js-cookie'
import {generateServerError} from './fetcher'
import {IToken} from '~types/dto'
import {TokenPayload} from '~types'

const API_PATH = '/api/v1/authentications'

export const getAccessToken = (): string | undefined => {
  return Cookies.get('accessToken')
}

export const getRefreshToken = (): string | undefined => {
  return Cookies.get('refreshToken')
}

const saveAccessToken = (accessToken: string): void => {
  Cookies.set('accessToken', accessToken, {
    secure: true,
  })
}

const saveRefreshToken = (refreshToken: string): void => {
  Cookies.set('refreshToken', refreshToken, {
    secure: true,
  })
}

export const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token)
  let isExpired = false
  if (decoded.exp) {
    const buffer = 60_000
    // eslint-disable-next-line no-magic-numbers
    isExpired = decoded.exp < (Date.now() + buffer) / 1000
  }
  return isExpired
}

export const isAccessTokenExpired = (): boolean => {
  const accessToken = getAccessToken()

  return !accessToken || isTokenExpired(accessToken)
}

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<IToken> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${API_PATH}`,
    {
      body: JSON.stringify({refreshToken}),
      headers: {'Content-type': 'application/json'},
      method: 'POST',
    },
  )

  if (!response) {
    throw new Error(`토큰 갱신 요청의 응답이 올바르지 않습니다.`)
  }

  if (!response.ok) {
    throw await generateServerError(response)
  }

  const newToken: IToken = await response.json()
  return newToken
}

export const saveToken = (token: IToken): void => {
  const {accessToken, refreshToken} = token

  saveAccessToken(accessToken)
  saveRefreshToken(refreshToken)
}

export const removeToken = (): void => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

export const getUserIdFromToken = (): string | null => {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return null
  }
  const decoded = jwtDecode<TokenPayload>(accessToken)
  const userId = decoded.sub || null

  return userId
}

export const getInternalCaregivingManagerIdFromToken = (): string | null => {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return null
  }
  const decoded = jwtDecode<TokenPayload>(accessToken)
  const internalCaregivingManagerId =
    decoded.internalCaregivingManagerId || null

  return internalCaregivingManagerId
}

export const getExternalCaregivingManagerIdFromToken = (): string | null => {
  const accessToken = getAccessToken()

  if (!accessToken) {
    return null
  }
  const decoded = jwtDecode<TokenPayload>(accessToken)
  const externalCaregivingManagerIds = decoded.externalCaregivingManagerIds

  return (
    (externalCaregivingManagerIds.length > 0 &&
      externalCaregivingManagerIds[0]) ||
    null
  )
}
