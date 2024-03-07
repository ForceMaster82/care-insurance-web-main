import {OrganizationType} from '../../../types'
import {ICaregivingManagerInfo} from '../../../types/dto'

class ReceptionCaregivingManagerInfoResource {
  #organizationType: OrganizationType

  #organizationId: string | null

  #managingUserId: string

  constructor(data: ICaregivingManagerInfo) {
    const {organizationType, organizationId, managingUserId} = data

    this.#organizationType = organizationType
    this.#organizationId = organizationId
    this.#managingUserId = managingUserId
  }

  get organizationType(): OrganizationType {
    return this.#organizationType
  }

  get organizationId(): string | null {
    return this.#organizationId
  }

  get managingUserId(): string {
    return this.#managingUserId
  }
}

export default ReceptionCaregivingManagerInfoResource
