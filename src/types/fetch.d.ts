import {
  GLOBAL_SERVER_ERROR_TYPES,
  LOCAL_SERVER_ERROR_TYPES,
} from '../constants/server-error'

export interface IResponse<T> {
  body: T
  headers: Headers
}

export interface IServerError<T = unknown> {
  data?: T
  errorType: GlobalServerErrorType | LocalServerErrorType
  message: string
}

export type GlobalServerErrorType = (typeof GLOBAL_SERVER_ERROR_TYPES)[number]

export type LocalServerErrorType = (typeof LOCAL_SERVER_ERROR_TYPES)[number]

export type MutationVariables<
  PathParams = unknown,
  QueryParams = unknown,
  Payload = unknown,
> = {
  pathParams?: PathParams
  payload?: Payload
  queryParams?: QueryParams
}
