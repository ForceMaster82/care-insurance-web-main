import {IReceptionInsuranceManagerInfo} from '../../../types/dto'

class ReceptionInsuranceManagerInfoResource {
  #branchName: string

  #phoneNumber: string | null

  #receptionistName: string

  constructor(data: IReceptionInsuranceManagerInfo) {
    const {branchName, phoneNumber, receptionistName} = data

    this.#branchName = branchName
    this.#phoneNumber = phoneNumber
    this.#receptionistName = receptionistName
  }

  get branchName(): string {
    return this.#branchName
  }

  get phoneNumber(): string {
    return this.#phoneNumber || ''
  }

  get receptionistName(): string {
    return this.#receptionistName
  }
}

export default ReceptionInsuranceManagerInfoResource
