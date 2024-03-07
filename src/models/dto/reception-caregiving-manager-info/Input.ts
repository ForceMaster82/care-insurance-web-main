import {OrganizationType} from '../../../types'
import {IReceptionCaregivingManagerInfo} from '../../../types/dto'
import {ReceptionCaregivingManagerInfoData} from '../../../types/form'
import ReceptionCaregivingManagerInfoResource from './Resource'

class ReceptionCaregivingManagerInfoInput {
  organizationType: OrganizationType | null

  organizationId: string | null

  managingUserId: string | null

  constructor(resource?: ReceptionCaregivingManagerInfoResource) {
    this.organizationType = resource?.organizationType || null
    this.organizationId = resource?.organizationId || null
    this.managingUserId = resource?.managingUserId || null
  }

  get data(): ReceptionCaregivingManagerInfoData {
    return {
      managingUserId: this.managingUserId,
      organizationId: this.organizationId,
      organizationType: this.organizationType,
    }
  }

  set data(data: ReceptionCaregivingManagerInfoData) {
    const {organizationType, organizationId, managingUserId} = data

    this.organizationType = organizationType
    this.organizationId = organizationId
    this.managingUserId = managingUserId
  }

  get input(): IReceptionCaregivingManagerInfo {
    return {
      managingUserId: this.managingUserId as string,
      organizationId: this.organizationId,
      organizationType: this.organizationType as OrganizationType,
    }
  }
}

export default ReceptionCaregivingManagerInfoInput
