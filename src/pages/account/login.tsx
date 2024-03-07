/* eslint-disable no-alert */
import React, {useState} from 'react'
import {NextPage} from 'next'
import {useRouter} from 'next/router'
import {ModalProvider} from '@caredoc/utils-web'
import {Box} from '@caredoc/ui-web'
import Image from 'next/image'
import {IServerError} from '../../types/fetch'
import {LoginData} from '../../types/form'
import {DEFAULT_PATH} from '../../constants/route-paths'
import {isLocalServerErrorType} from '../../utils/fetcher'
import {SERVER_ERROR_MESSAGE} from '../../constants/server-error'
import useAuthentication from '../../hooks/api/authentication/use-authentication'
import UserCredentialInput from '../../models/dto/user-credential/Input'
import AccountLoginView from '../../views/account-login'
import BackgroundImage from '../../../public/background_login@x1.5.jpg'
import {saveToken} from '~utils/manage-token'

// static import로 변경
// const BACKGROUND_IMAGE_URL =
//   process.env.NEXT_PUBLIC_STATIC_URL + '/background_login@x1.5.jpg'

const LoginPage: NextPage = () => {
  const router = useRouter()

  const {mutate: login} = useAuthentication()

  const [serverError, setServerError] = useState<IServerError | null>(null)

  const handleOnLoginError = (error: Error): void => {
    const errorName = isLocalServerErrorType(error.name)
    const errorMessage =
      (errorName && SERVER_ERROR_MESSAGE[errorName]) || error.message

    switch (errorName) {
      case 'WRONG_CREDENTIAL':
      case 'NOT_REGISTERED_EMAIL_ADDRESS':
        setServerError({errorType: errorName, message: errorMessage})
        break
      default:
        alert(errorMessage)
    }
  }

  const handleOnRequestLogin = (data: LoginData): void => {
    const userCredential = new UserCredentialInput()
    userCredential.loginData = data

    login(
      {
        payload: userCredential.input,
      },
      {
        onError: handleOnLoginError,
        onSuccess: (response) => {
          saveToken(response.body)
          router.push(DEFAULT_PATH)
        },
      },
    )
  }

  return (
    <ModalProvider>
      <Box flexDirection="row" height="100vh" width="100vw">
        <Box flex={1} position="relative">
          <Image
            alt="background"
            fill
            priority
            quality={100}
            src={BackgroundImage}
            style={{objectFit: 'cover'}}
          />
        </Box>
        <AccountLoginView
          onRequestLogin={handleOnRequestLogin}
          resetServerError={(): void => setServerError(null)}
          serverError={serverError}
        />
      </Box>
    </ModalProvider>
  )
}

export default LoginPage
