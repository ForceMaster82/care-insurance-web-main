import {IUserCredential} from '../../../types/dto'
import {AuthenticationCodeValidateData, LoginData} from '../../../types/form'

class UserCredentialInput {
  email: string

  password: string

  authenticationCode: string

  refreshToken: string

  constructor() {
    this.email = ''
    this.password = ''
    this.authenticationCode = ''
    this.refreshToken = ''
  }

  get loginData(): LoginData {
    return {
      email: this.email,
      password: this.password,
    }
  }

  set loginData(data: LoginData) {
    const {email, password} = data

    this.email = email
    this.password = password
  }

  get authenticationCodeValidateData(): AuthenticationCodeValidateData {
    return {
      authenticationCode: this.authenticationCode,
      email: this.email,
    }
  }

  set authenticationCodeValidateData(data: AuthenticationCodeValidateData) {
    const {email, authenticationCode} = data

    this.email = email
    this.authenticationCode = authenticationCode
  }

  get input(): IUserCredential {
    return {
      authenticationCode:
        (Boolean(this.authenticationCode) && this.authenticationCode) || null,
      email: (Boolean(this.email) && this.email) || null,
      password: (Boolean(this.password) && this.password) || null,
      refreshToken: (Boolean(this.refreshToken) && this.refreshToken) || null,
    }
  }
}

export default UserCredentialInput
