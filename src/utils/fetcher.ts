import {
  GLOBAL_SERVER_ERROR_TYPES,
  LOCAL_SERVER_ERROR_TYPES,
} from '../constants/server-error'
import {IResponse, IServerError} from '../types/fetch'
import {generateUnionTypeChecker} from './generate-union-type-checker'
import {
  getAccessToken,
  getRefreshToken,
  isAccessTokenExpired,
  refreshAccessToken,
  saveToken,
} from './manage-token'

const parseResponseBody = (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('Content-Type')

  if (contentType?.includes('application/json')) {
    return response.json()
  }

  if (contentType?.includes('text')) {
    return response.text()
  }

  if (contentType?.includes('form-data')) {
    return response.formData()
  }

  return response.blob()
}

export const generateServerError = async (
  response: Response,
): Promise<Error> => {
  const body = (await response.json()) as IServerError

  const error = new Error(body.message, {
    cause: {data: body.data, status: response.status},
  })
  error.name = body.errorType

  return error
}

export const isGlobalServerErrorType = generateUnionTypeChecker(
  ...GLOBAL_SERVER_ERROR_TYPES,
)

export const isLocalServerErrorType = generateUnionTypeChecker(
  ...LOCAL_SERVER_ERROR_TYPES,
)

export async function fetcher<T>(
  path: string,
  _init?: RequestInit,
): Promise<IResponse<T>> {
  const refreshToken = getRefreshToken()

  if (refreshToken && isAccessTokenExpired()) {
    const newToken = await refreshAccessToken(refreshToken)

    saveToken(newToken)
  }

  const accessToken = getAccessToken()

  const authorization = Boolean(accessToken) && {
    authorization: `Bearer ${accessToken}`,
  }

  const init = {
    ..._init,
    headers: {
      ...(_init &&
        _init?.method !== 'GET' && {
          'Content-type': 'application/json',
        }),
      ..._init?.headers,
      ...authorization,
    },
    method: _init?.method || 'GET',
  } satisfies RequestInit

  if (path.startsWith('/')) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      init,
    )
    if (!response.ok) {
      throw await generateServerError(response)
    }

    const headers = response.headers
    const body = (await parseResponseBody(response)) as T

    return {body, headers}
  }

  const response = await fetch(path, init)
  if (!response.ok) {
    throw await generateServerError(response)
  }

  const headers = response.headers
  const body = (await parseResponseBody(response)) as T

  return {body, headers}
}

export async function binaryfetcher<T>(
  path: string,
  _init?: RequestInit,
): Promise<IResponse<T>> {
  const refreshToken = getRefreshToken()

  if (refreshToken && isAccessTokenExpired()) {
    const newToken = await refreshAccessToken(refreshToken)

    saveToken(newToken)
  }

  const accessToken = getAccessToken()

  const authorization = Boolean(accessToken) && {
    authorization: `Bearer ${accessToken}`,
  }

  const init = {
    ..._init,
    headers: {
      ..._init?.headers,
      ...authorization,
    },
    method: _init?.method || 'GET',
  } satisfies RequestInit

  if (path.startsWith('/')) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}`,
      init,
    )
    if (!response.ok) {
      throw await generateServerError(response)
    }

    const headers = response.headers
    const body = (await parseResponseBody(response)) as T

    return {body, headers}
  }

  const response = await fetch(path, init)
  if (!response.ok) {
    throw await generateServerError(response)
  }

  const headers = response.headers
  const body = (await parseResponseBody(response)) as T

  return {body, headers}
}

export const isUnauthorized = (error: unknown): boolean => {
  return error instanceof Error
    ? isGlobalServerErrorType(error.name) === 'NOT_AUTHORIZED'
    : false
}
