import {OrganizationType} from '../../../types'
import {IUser, IUserOrganization} from '../../../types/dto'

class UserResource {
  #id: string

  #name: string

  #organizations: IUserOrganization[]

  #lastLoginDateTime: string

  constructor(data: IUser) {
    const {id, name, organizations, lastLoginDateTime} = data

    this.#id = id
    this.#name = name
    this.#organizations = organizations
    this.#lastLoginDateTime = lastLoginDateTime || ''
  }

  get id(): string {
    return this.#id
  }

  get name(): string {
    return this.#name
  }

  get organizationType(): OrganizationType | null {
    return this.#organizations.at(0)?.organizationType || null
  }

  get organizationId(): string | null {
    return this.#organizations.at(0)?.id || null
  }

  get lastLoginDateTime(): Date {
    return new Date(this.#lastLoginDateTime)
  }
}

export default UserResource
