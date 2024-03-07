import {GetServerSideProps, NextPage} from 'next'
import {useRouter} from 'next/router'
import React from 'react'
import {SubmitHandler} from 'react-hook-form'
import useUserPasswordUpdate from '../../hooks/api/user/use-user-password-update'
import {IPasswordChange} from '../../types/form'
import {
  getExternalCaregivingManagerIdFromToken,
  getInternalCaregivingManagerIdFromToken,
  getUserIdFromToken,
  removeToken,
} from '../../utils/manage-token'
import {ACCOUNT_PATH, DEFAULT_PATH} from '../../constants/route-paths'
import useAuthentication from '../../hooks/api/authentication/use-authentication'
import useInternalCaregivingManagerDetail from '../../hooks/api/internal-caregiving-manager/use-internal-caregiving-manager-detail'
import useExternalCaregivingManagerDetail from '../../hooks/api/external-caregiving-manager/use-external-caregiving-manager-detail'
import {isLocalServerErrorType} from '../../utils/fetcher'
import {SERVER_ERROR_MESSAGE} from '../../constants/server-error'
import UserCredentialInput from '../../models/dto/user-credential/Input'
import AccountPasswordChangeView from '~views/account-password-change'

interface IProps {
  shouldPasswordChange: boolean
}

const PasswordChangePage: NextPage<IProps> = ({shouldPasswordChange}) => {
  const router = useRouter()

  const {data: internalCaregivingManager} = useInternalCaregivingManagerDetail({
    internalCaregivingManagerId: getInternalCaregivingManagerIdFromToken(),
  })
  const externalCaregivingManager = useExternalCaregivingManagerDetail({
    externalCaregivingManagerId: getExternalCaregivingManagerIdFromToken(),
  })
  const caregivingManager =
    internalCaregivingManager || externalCaregivingManager

  const {mutateAsync: updateUserPassword} = useUserPasswordUpdate()
  const {mutateAsync: login} = useAuthentication()

  const handleOnCancel = (): void => {
    if (shouldPasswordChange) {
      removeToken()
      router.push(ACCOUNT_PATH.LOGIN)
    } else {
      router.back()
    }
  }

  const handleOnSubmit: SubmitHandler<IPasswordChange> = async (
    data,
  ): Promise<void> => {
    const userId = getUserIdFromToken()

    if (!userId) {
      return
    }

    try {
      await updateUserPassword({
        pathParams: {
          userId,
        },
        payload: {
          currentPassword: data.currentPassword,
          password: data.newPassword,
        },
      })

      if (caregivingManager) {
        const userCredential = new UserCredentialInput()
        userCredential.loginData = {
          email: caregivingManager.email,
          password: data.newPassword,
        }

        await login({
          payload: userCredential.input,
        })

        if (shouldPasswordChange) {
          router.replace(DEFAULT_PATH)
        } else {
          router.back()
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        const errorType = isLocalServerErrorType(error)
        // eslint-disable-next-line no-alert
        errorType && alert(SERVER_ERROR_MESSAGE[errorType] || error.message)
      }
    }
  }

  return (
    <AccountPasswordChangeView
      onCancel={handleOnCancel}
      onSubmit={handleOnSubmit}
      shouldPasswordChange={shouldPasswordChange}
    />
  )
}

export default PasswordChangePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const shouldPasswordChange = Boolean(context.query['isForced'])

  return {
    props: {shouldPasswordChange},
  }
}
