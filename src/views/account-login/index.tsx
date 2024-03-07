import React, {ReactElement} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {Box, Button, Input, Link, Typography} from '@caredoc/ui-web'
import {useModalStore} from '@caredoc/utils-web'
import {colors} from '@caredoc/ui-master'
import {inputWidths} from '../../constants'
import {IServerError} from '../../types/fetch'
import {LoginData} from '../../types/form'
import {LoginModalType} from '../../types'
import CaredocSignature from '../../components/svg/caredoc/Signature'
import InputLabel from './components/InputLabel'
import TemporaryPasswordIssueModal from './components/TemporaryPasswordIssueModal'

const VIEW_WIDTH = 600
const CAREDOC_SIGNATURE_WIDTH = 190.9
const CAREDOC_SIGNATURE_HEIGHT = 54

interface ILoginViewProps {
  onRequestLogin: (data: LoginData) => void
  resetServerError: () => void
  serverError: IServerError | null
}

const AccountLoginView = (props: ILoginViewProps): ReactElement => {
  const {onRequestLogin, serverError, resetServerError} = props

  const modalStore = useModalStore<LoginModalType>()

  const {register, formState, handleSubmit} = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleOnClickTemporaryPasswordIssue = (): void => {
    const handleOnClickCloseModal = (): void =>
      modalStore.delete('TEMPORARY_PASSWORD_ISSUE')

    modalStore.create(
      'TEMPORARY_PASSWORD_ISSUE',
      <TemporaryPasswordIssueModal onModalClose={handleOnClickCloseModal} />,
    )
  }

  const handleOnSubmit: SubmitHandler<LoginData> = (data) => {
    onRequestLogin(data)
  }

  return (
    <Box
      alignItems="center"
      alignSelf="flex-end"
      backgroundColor="bgPrimary"
      justifyContent="center"
      minHeight="100vh"
      width={VIEW_WIDTH}
    >
      <Box gap="xl" width={inputWidths.xxl}>
        <Box alignItems="center" gap="sm">
          <CaredocSignature
            fill={colors.primary}
            height={CAREDOC_SIGNATURE_HEIGHT}
            width={CAREDOC_SIGNATURE_WIDTH}
          />
          <Typography textColor="fontTertiary" variant="subtitle1">
            보험현물서비스 운영관리 시스템
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Box gap="lg">
            <Box gap="sm">
              <Box gap="xs">
                <InputLabel>아이디</InputLabel>
                <Input
                  dirty
                  errors={
                    (serverError?.errorType ===
                      'NOT_REGISTERED_EMAIL_ADDRESS' &&
                      serverError.message) ||
                    formState.errors.email?.message
                  }
                  register={register('email', {
                    onChange: resetServerError,
                    required: {
                      message: '아이디(이메일)를 입력해 주세요.',
                      value: true,
                    },
                  })}
                  size="lg"
                />
              </Box>
              <Box gap="xs">
                <InputLabel>비밀번호</InputLabel>
                <Input
                  dirty
                  errors={
                    (serverError?.errorType === 'WRONG_CREDENTIAL' &&
                      serverError.message) ||
                    formState.errors.password?.message
                  }
                  register={register('password', {
                    onChange: resetServerError,
                    required: {
                      message: '비밀번호를 입력해 주세요.',
                      value: true,
                    },
                  })}
                  size="lg"
                  type="password"
                />
              </Box>
            </Box>
            <button type="submit">
              <Button color="primary" size="lg">
                로그인
              </Button>
            </button>
          </Box>
        </form>
        <Link
          color="fontSecondary"
          onClick={handleOnClickTemporaryPasswordIssue}
        >
          비밀번호를 잊어버리셨나요?
        </Link>
        <Typography
          textAlign="center"
          textColor="fontTertiary"
          variant="caption2"
        >
          Copyright ⓒ CAREDOC Corp. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default AccountLoginView
