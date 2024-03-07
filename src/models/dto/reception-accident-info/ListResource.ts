import {IReceptionListData} from '../../../types/dto'
import HospitalRoomInfoResource from '../hospital-room-info/Resource'

class ReceptionAccidentInfoListResource {
  #accidentNumber: string

  #hospitalRoomInfo: HospitalRoomInfoResource

  constructor(data: IReceptionListData['accidentInfo']) {
    const {accidentNumber, hospitalRoomInfo} = data

    this.#accidentNumber = accidentNumber
    this.#hospitalRoomInfo = new HospitalRoomInfoResource(hospitalRoomInfo)
  }

  get accidentNumber(): string {
    return this.#accidentNumber
  }

  get hospitalRoomInfo(): HospitalRoomInfoResource {
    return this.#hospitalRoomInfo
  }
}

export default ReceptionAccidentInfoListResource
