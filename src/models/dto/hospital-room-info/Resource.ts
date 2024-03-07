import {IHospitalRoomInfo} from '../../../types/dto'

class HospitalRoomInfoResource {
  #state: string | null

  #city: string | null

  #hospitalAndRoom: string

  constructor(data: IHospitalRoomInfo) {
    const {state, city, hospitalAndRoom} = data

    this.#state = state
    this.#city = city
    this.#hospitalAndRoom = hospitalAndRoom
  }

  get state(): string {
    return this.#state || ''
  }

  get city(): string {
    return this.#city || ''
  }

  get hospitalAndRoom(): string {
    return this.#hospitalAndRoom
  }
}

export default HospitalRoomInfoResource
