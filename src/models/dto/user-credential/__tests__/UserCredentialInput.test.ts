import {faker} from '@faker-js/faker'
import UserCredentialInput from '../Input'

describe('model / Input / UserCredential', () => {
  const input = new UserCredentialInput()

  it('construct', () => {
    expect(input.email).toBe('')
    expect(input.password).toBe('')
    expect(input.authenticationCode).toBe('')
    expect(input.refreshToken).toBe('')
  })

  it('getter / authenticationCodeValidateData', () => {
    expect(input.authenticationCodeValidateData).toStrictEqual({
      authenticationCode: input.authenticationCode,
      email: input.email,
    })
  })

  it('getter / input', () => {
    expect(input.input).toStrictEqual({
      authenticationCode:
        (Boolean(input.authenticationCode) && input.authenticationCode) || null,
      email: (Boolean(input.email) && input.email) || null,
      password: (Boolean(input.password) && input.password) || null,
      refreshToken: (Boolean(input.refreshToken) && input.refreshToken) || null,
    })
  })

  it('setter / authenticationCodeValidateData', () => {
    const newAuthenticationCodeValidateData = {
      authenticationCode: faker.random.word(),
      email: faker.internet.email(),
    }

    input.authenticationCodeValidateData = newAuthenticationCodeValidateData

    expect(input.email).toBe(newAuthenticationCodeValidateData.email)
    expect(input.authenticationCode).toBe(
      newAuthenticationCodeValidateData.authenticationCode,
    )
  })
})
