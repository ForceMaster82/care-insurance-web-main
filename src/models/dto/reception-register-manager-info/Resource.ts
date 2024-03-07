import {IReceptionRegisterManagerInfo} from '../../../types/dto'

class ReceptionRegisterManagerInfoResource {
  #managingUserId: string

  constructor(data: IReceptionRegisterManagerInfo) {
    this.#managingUserId = data.managingUserId
  }

  get managingUserId(): string {
    return this.#managingUserId
  }
}

export default ReceptionRegisterManagerInfoResource
