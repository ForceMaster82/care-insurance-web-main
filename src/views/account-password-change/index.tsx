import {Box, Button, Input, Typography} from '@caredoc/ui-web'
import React, {ReactElement, useEffect} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import InputLabel from '../account-login/components/InputLabel'
import {IPasswordChange} from '../../types/form'
import {passwordChangeConstraints} from '../../constraints/password-change'
import {useCheckValidField} from '../../hooks/form/use-check-valid-field'
import {inputWidths, VALID_INPUT_MESSAGE} from '~constants'

interface IAccountPasswordChangeViewProps {
  onCancel: () => void
  onSubmit: SubmitHandler<IPasswordChange>
  shouldPasswordChange: boolean
}

const AccountPasswordChangeView = (
  props: IAccountPasswordChangeViewProps,
): ReactElement => {
  const {onCancel, onSubmit, shouldPasswordChange} = props

  const {register, formState, watch, trigger, handleSubmit, control} =
    useForm<IPasswordChange>({
      defaultValues: {
        currentPassword: '',
        newPassword: '',
        newPasswordCheck: '',
      },
      mode: 'onChange',
    })
  const {isValidField, errors} = useCheckValidField<IPasswordChange>(control)

  const currentPassword = watch('currentPassword')
  const newPassword = watch('newPassword')
  const newPasswordCheck = watch('newPasswordCheck')

  useEffect(() => {
    trigger('newPasswordCheck')
  }, [newPassword, trigger])

  return (
    <Box
      alignItems="center"
      backgroundColor="bgPrimary"
      justifyContent="center"
      minHeight="100vh"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box gap="xl" width={inputWidths.xxl}>
          <Box gap="lg">
            <Box pb="md">
              <Typography textColor="fontPrimary" variant="heading6">
                {(shouldPasswordChange &&
                  '로그인 시 사용할\n신규 비밀번호를 설정해 주세요.') ||
                  '변경할 비밀번호를 설정해 주세요.'}
              </Typography>
            </Box>
            <Box gap="sm">
              <Box gap="xs">
                <InputLabel>기존 비밀번호</InputLabel>
                <Input
                  register={register('currentPassword')}
                  size="lg"
                  type="password"
                />
              </Box>
              <Box gap="xs">
                <InputLabel>신규 비밀번호</InputLabel>
                <Input
                  errors={errors.newPassword?.message}
                  hint={
                    (isValidField('newPassword') && VALID_INPUT_MESSAGE) ||
                    '8~20자리, 영문 대/소문자, 숫자, 특수문자 조합'
                  }
                  isValidated={isValidField('newPassword')}
                  register={register(
                    'newPassword',
                    passwordChangeConstraints.newPassword,
                  )}
                  size="lg"
                  type="password"
                />
              </Box>
              <Box gap="xs">
                <InputLabel>비밀번호 확인</InputLabel>
                <Input
                  errors={errors.newPasswordCheck?.message}
                  hint={
                    (isValidField('newPasswordCheck') && VALID_INPUT_MESSAGE) ||
                    ''
                  }
                  isValidated={isValidField('newPasswordCheck')}
                  register={register(
                    'newPasswordCheck',
                    passwordChangeConstraints.newPasswordCheck,
                  )}
                  size="lg"
                  type="password"
                />
              </Box>
            </Box>
            <Box flexDirection="row" gap="xs">
              <Box flex={1}>
                <Button
                  color="fontSecondary"
                  onClick={onCancel}
                  size="lg"
                  variant="tertiary"
                >
                  취소
                </Button>
              </Box>
              <Box flex={1}>
                <button type="submit">
                  <Button
                    color="primary"
                    disabled={
                      !(
                        currentPassword &&
                        newPassword &&
                        newPasswordCheck &&
                        formState.isValid
                      )
                    }
                    size="lg"
                    variant="primary"
                  >
                    확인
                  </Button>
                </button>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  )
}

export default AccountPasswordChangeView
