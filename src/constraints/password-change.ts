import {Constraints} from '@caredoc/utils-web'
import {IPasswordChange} from '../types/form'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\W\dA-Za-z]{8,20}$/

export const passwordChangeConstraints: Constraints<IPasswordChange> = {
  newPassword: {
    pattern: {
      message:
        '비밀번호는 8~20자리, 영문 대/소문자, 숫자, 특수문자 조합으로 생성해 주세요.',
      value: passwordRegex,
    },
  },
  newPasswordCheck: {
    validate: (value, formValues) =>
      formValues.newPassword === value ||
      '비밀번호가 맞지 않습니다. 다시 확인해 주세요.',
  },
}
