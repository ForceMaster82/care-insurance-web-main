import {IHospitalRoomInfo} from '../../../types/dto'
import {HospitalRoomInfoData} from '../../../types/form'
import HospitalRoomInfoResource from './Resource'

class HospitalRoomInfoInput {
  state: string

  city: string

  hospitalAndRoom: string

  constructor(resource?: HospitalRoomInfoResource) {
    this.state = resource?.state || ''
    this.city = resource?.city || ''
    this.hospitalAndRoom = resource?.hospitalAndRoom || ''
  }

  get data(): HospitalRoomInfoData {
    return {
      city: this.city,
      hospitalAndRoom: this.hospitalAndRoom,
      state: this.state,
    }
  }

  set data(data: HospitalRoomInfoData) {
    const {state, city, hospitalAndRoom} = data

    this.state = state
    this.city = city
    this.hospitalAndRoom = hospitalAndRoom
  }

  get input(): IHospitalRoomInfo {
    return {
      city: (Boolean(this.city) && this.city) || null,
      hospitalAndRoom: this.hospitalAndRoom,
      state: (Boolean(this.state) && this.state) || null,
    }
  }
}

export default HospitalRoomInfoInput
