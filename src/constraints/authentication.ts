import {Constraints} from '@caredoc/utils-web'
import {AuthenticationCodeValidateData} from '../types/form'

const emailRegex = /^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$/

export const authenticationCodeValidateConstraints: Constraints<AuthenticationCodeValidateData> =
  {
    email: {
      pattern: {
        message: '올바른 이메일 형식으로 입력해 주세요.',
        value: emailRegex,
      },
    },
  }
