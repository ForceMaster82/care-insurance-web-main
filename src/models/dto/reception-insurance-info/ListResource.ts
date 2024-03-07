import {IReceptionListData} from '../../../types/dto'

class ReceptionInsuranceInfoListResource {
  #insuranceNumber: string

  #coverageId: string

  constructor(data: IReceptionListData['insuranceInfo']) {
    const {insuranceNumber, coverageId} = data

    this.#insuranceNumber = insuranceNumber
    this.#coverageId = coverageId
  }

  get insuranceNumber(): string {
    return this.#insuranceNumber
  }

  get coverageId(): string {
    return this.#coverageId
  }
}

export default ReceptionInsuranceInfoListResource
