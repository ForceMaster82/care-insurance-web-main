import ReceptionInsuranceManagerInfoResource from './Resource'
import {ReceptionInsuranceManagerInfoData} from '~types/form'
import {IReceptionInsuranceManagerInfo} from '~types/dto'

class ReceptionInsuranceManagerInfoInput {
  branchName: string

  phoneNumber: string

  receptionistName: string

  constructor(resource?: ReceptionInsuranceManagerInfoResource) {
    this.branchName = resource?.branchName || ''
    this.phoneNumber = resource?.phoneNumber || ''
    this.receptionistName = resource?.receptionistName || ''
  }

  get data(): ReceptionInsuranceManagerInfoData {
    return {
      branchName: this.branchName,
      phoneNumber: this.phoneNumber,
      receptionistName: this.receptionistName,
    }
  }

  set data(data: ReceptionInsuranceManagerInfoData) {
    const {branchName, phoneNumber, receptionistName} = data

    this.branchName = branchName
    this.phoneNumber = phoneNumber
    this.receptionistName = receptionistName
  }

  get input(): IReceptionInsuranceManagerInfo {
    return {
      branchName: this.branchName,
      phoneNumber: this.phoneNumber ? this.phoneNumber : null,
      receptionistName: this.receptionistName,
    }
  }
}

export default ReceptionInsuranceManagerInfoInput
