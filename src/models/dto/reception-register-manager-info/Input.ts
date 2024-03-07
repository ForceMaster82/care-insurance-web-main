import ReceptionRegisterManagerInfoResource from './Resource'
import {ReceptionRegisterManagerInfoData} from '~types/form'
import {IReceptionRegisterManagerInfo} from '~types/dto'

class ReceptionRegisterManagerInfoInput {
  managingUserId: string | null

  constructor(resource?: ReceptionRegisterManagerInfoResource) {
    this.managingUserId = resource?.managingUserId || null
  }

  get input(): IReceptionRegisterManagerInfo {
    return {
      managingUserId: this.managingUserId as string,
    }
  }

  get data(): ReceptionRegisterManagerInfoData {
    return {
      managingUserId: this.managingUserId as string,
    }
  }

  set data(data: ReceptionRegisterManagerInfoData) {
    const {managingUserId} = data

    this.managingUserId = managingUserId
  }
}

export default ReceptionRegisterManagerInfoInput
