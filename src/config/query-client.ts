/* eslint-disable no-alert */
import {QueryClientConfig} from '@tanstack/react-query'
import {useRouter} from 'next/router'
import {
  ACCOUNT_PATH,
  DEFAULT_PATH,
  RECEPTIONS_PATH,
} from '../constants/route-paths'
import {SERVER_ERROR_MESSAGE} from '../constants/server-error'
import {GlobalServerErrorType} from '../types/fetch'
import {removeToken} from '../utils/manage-token'
import {isGlobalServerErrorType} from '../utils/fetcher'

const useQueryClientConfig = (): QueryClientConfig => {
  const router = useRouter()

  const handleOnQueryServerError = (
    errorType: GlobalServerErrorType,
    defaultErrorMessage?: string,
  ): void => {
    const errorMessage = SERVER_ERROR_MESSAGE[errorType] || defaultErrorMessage

    switch (errorType) {
      case 'PASSWORD_CHANGE_REQUIRED':
        router.push(ACCOUNT_PATH.SHOULD_PASSWORD_CHANGE)
        break
      case 'ILLEGAL_TOKEN_SUPPLIED':
      case 'TOKEN_EXPIRED':
        errorMessage && alert(errorMessage)
        removeToken()
        router.push(ACCOUNT_PATH.LOGIN)
        break
      case 'NOT_AUTHORIZED': {
        const isReceptionSubPage =
          location.pathname.startsWith(RECEPTIONS_PATH.INDEX()) &&
          location.pathname !== RECEPTIONS_PATH.INDEX()

        if (!isReceptionSubPage) {
          errorMessage && alert(errorMessage)
          router.push(DEFAULT_PATH)
        }

        break
      }
      default:
        defaultErrorMessage && alert(defaultErrorMessage)
    }
  }

  const handleOnMutationServerError = (
    errorType: GlobalServerErrorType,
    defaultErrorMessage?: string,
  ): void => {
    const errorMessage = SERVER_ERROR_MESSAGE[errorType] || defaultErrorMessage

    switch (errorType) {
      case 'PASSWORD_CHANGE_REQUIRED':
        router.push(ACCOUNT_PATH.SHOULD_PASSWORD_CHANGE)
        break
      case 'ILLEGAL_TOKEN_SUPPLIED':
      case 'TOKEN_EXPIRED':
        errorMessage && alert(errorMessage)
        removeToken()
        router.push(ACCOUNT_PATH.LOGIN)
        break
      case 'NOT_AUTHORIZED':
        errorMessage && alert(errorMessage)
        break
      default:
        defaultErrorMessage && alert(defaultErrorMessage)
    }
  }

  const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
      mutations: {
        onSettled: (_, error): void => {
          if (!(error instanceof Error)) {
            return
          }
          const errorType = isGlobalServerErrorType(error.name)
          errorType && handleOnMutationServerError(errorType, error.message)
        },
      },
      queries: {
        cacheTime: 0,
        onSettled: (_, error): void => {
          if (!(error instanceof Error)) {
            return
          }
          const errorType = isGlobalServerErrorType(error.name)
          errorType && handleOnQueryServerError(errorType, error.message)
        },
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error instanceof Error) {
            const errorType = isGlobalServerErrorType(error.name)
            if (
              errorType === 'REFRESH_TOKEN_ALREADY_USED' &&
              failureCount < 2
            ) {
              return true
            }
          }
          return false
        },
      },
    },
  }

  return queryClientConfig
}

export default useQueryClientConfig
