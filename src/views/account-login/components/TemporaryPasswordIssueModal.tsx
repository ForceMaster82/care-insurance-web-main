/* eslint-disable no-alert */
/* eslint-disable unicorn/filename-case */
import {Box, Button, Input, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import Modal from '../../../components/Modal'
import {buttonWidths} from '../../../constants'
import {AuthenticationCodeValidateData} from '../../../types/form'
import {authenticationCodeValidateConstraints} from '../../../constraints/authentication'
import useUserFiltered from '../../../hooks/api/user/use-user-filtered'
import useUserAuthenticationCode from '../../../hooks/api/user/use-user-authentication-code'
import useAuthentication from '../../../hooks/api/authentication/use-authentication'
import UserCredentialInput from '../../../models/dto/user-credential/Input'
import {isLocalServerErrorType} from '../../../utils/fetcher'
import {SERVER_ERROR_MESSAGE} from '../../../constants/server-error'
import {useCheckValidField} from '../../../hooks/form/use-check-valid-field'
import useUserPasswordUpdate from '../../../hooks/api/user/use-user-password-update'
import {getUserIdFromToken} from '../../../utils/manage-token'
import FormattingInput from '../../../components/inputs/FormattingInput'
import {removeNotNumber} from '../../../utils/formatter'

interface IProps {
  onModalClose: () => void
}

const TemporaryPasswordIssueModal = (props: IProps): ReactElement => {
  const {onModalClose} = props

  const {register, watch, setError, resetField, handleSubmit, control} =
    useForm<AuthenticationCodeValidateData>({
      defaultValues: new UserCredentialInput().authenticationCodeValidateData,
      mode: 'onChange',
    })
  const {isValidField, errors} = useCheckValidField(control)

  const {refetch: getFilteredUser} = useUserFiltered({email: watch('email')})

  const {
    mutate: requestAuthenticationCode,
    isSuccess: isSuccessRequestAuthenticationCode,
  } = useUserAuthenticationCode()

  const {
    mutate: validateAuthenticationCode,
    isSuccess: isSuccessValidateAuthenticationCode,
    reset: resetValidateAuthenticationCode,
  } = useAuthentication()

  const {mutate: updateUserPassword} = useUserPasswordUpdate()

  const handleOnClickAuthenticationCodeRequest = async (): Promise<void> => {
    resetField('authenticationCode')
    resetValidateAuthenticationCode()

    const {data: filteredUser} = await getFilteredUser()

    if (filteredUser) {
      requestAuthenticationCode({pathParams: {userId: filteredUser.id}})
    } else {
      setError('email', {
        message: SERVER_ERROR_MESSAGE.NOT_REGISTERED_EMAIL_ADDRESS,
      })
    }
  }

  const handleOnValidateAuthenticationCode: SubmitHandler<
    AuthenticationCodeValidateData
  > = (data) => {
    if (!data.email || !data.authenticationCode) {
      return
    }

    const input = new UserCredentialInput()
    input.authenticationCodeValidateData = data

    validateAuthenticationCode(
      {
        payload: input.input,
      },
      {
        onError: (error) => {
          const errorType = isLocalServerErrorType(error.name)
          const errorMessage =
            (errorType && SERVER_ERROR_MESSAGE[errorType]) || error.message

          switch (errorType) {
            case 'WRONG_CREDENTIAL':
              setError('authenticationCode', {
                message: '인증번호를 다시 확인해 주세요.',
              })
              break
            case 'NOT_REGISTERED_EMAIL_ADDRESS':
              setError('email', {
                message: errorMessage,
              })
              break
            default:
              alert(errorMessage)
          }
        },
      },
    )
  }

  const handleOnClickTemporaryPasswordIssue = (): void => {
    const userId = getUserIdFromToken()

    if (!userId) {
      return
    }

    updateUserPassword(
      {
        pathParams: {userId},
        payload: {
          currentPassword: null,
          password: null,
        },
      },
      {
        onSuccess: () => {
          alert('이메일로 임시 비밀번호를 전송하였습니다.')
          onModalClose()
        },
      },
    )
  }

  return (
    <Modal
      buttonText="인증 완료"
      description={
        '임시 비밀번호 발급을 위해 이메일 인증이 필요합니다.\n아이디(이메일)를 입력해 주세요.'
      }
      disabled={!isSuccessValidateAuthenticationCode}
      modalWidth="sm"
      onClose={onModalClose}
      onSubmit={handleOnClickTemporaryPasswordIssue}
      title="임시 비밀번호 발급"
    >
      <form onSubmit={handleSubmit(handleOnValidateAuthenticationCode)}>
        <Box gap="sm">
          <Box gap="xs">
            <Typography textColor="fontPrimary" variant="body1">
              아이디
            </Typography>
            <Box flexDirection="row" gap="xs">
              <Box flex={1}>
                <Input
                  errors={errors.email?.message}
                  register={register(
                    'email',
                    authenticationCodeValidateConstraints.email,
                  )}
                  size="md"
                />
              </Box>
              <Box width={buttonWidths.md}>
                <Button
                  color="primary"
                  disabled={!isValidField('email')}
                  onClick={handleOnClickAuthenticationCodeRequest}
                  size="md"
                  variant="primary"
                >
                  인증 요청
                </Button>
              </Box>
            </Box>
          </Box>

          {isSuccessRequestAuthenticationCode && (
            <Box gap="xs">
              <Typography textColor="fontPrimary" variant="body1">
                인증번호
              </Typography>
              <Box flexDirection="row" gap="xs">
                <Box flex={1}>
                  <FormattingInput
                    constraints={{}}
                    control={control}
                    errors={errors.authenticationCode?.message}
                    fieldName="authenticationCode"
                    formatter={removeNotNumber}
                    hint={
                      isSuccessValidateAuthenticationCode
                        ? '인증되었습니다.'
                        : ''
                    }
                    isValidated={isSuccessValidateAuthenticationCode}
                    size="md"
                  />
                </Box>

                <Box width={buttonWidths.md}>
                  <button type="submit">
                    <Button
                      color="primary"
                      disabled={
                        Boolean(errors.authenticationCode) ||
                        !watch('authenticationCode')
                      }
                      size="md"
                      variant="primary"
                    >
                      확인
                    </Button>
                  </button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </form>
    </Modal>
  )
}

export default TemporaryPasswordIssueModal
