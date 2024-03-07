import {Period} from '../../../types'
import {ICaregivingChargeCaregivingRoundInfo} from '../../../types/dto'
import {getDateDistance} from '../../../utils/date'

class CaregivingChargeCaregivingRoundInfoResource {
  #caregivingRoundId: string

  #caregivingRoundNumber: number

  #startDateTime: string

  #endDateTime: string

  #dailyCaregivingCharge: number

  #receptionId: string

  constructor(data: ICaregivingChargeCaregivingRoundInfo) {
    const {
      caregivingRoundId,
      caregivingRoundNumber,
      startDateTime,
      endDateTime,
      dailyCaregivingCharge,
      receptionId,
    } = data

    this.#caregivingRoundId = caregivingRoundId
    this.#caregivingRoundNumber = caregivingRoundNumber
    this.#startDateTime = startDateTime
    this.#endDateTime = endDateTime
    this.#dailyCaregivingCharge = dailyCaregivingCharge
    this.#receptionId = receptionId
  }

  get caregivingRoundId(): string {
    return this.#caregivingRoundId
  }

  get caregivingRoundNumber(): number {
    return this.#caregivingRoundNumber
  }

  get startDateTime(): Date {
    return new Date(this.#startDateTime)
  }

  get endDateTime(): Date {
    return new Date(this.#endDateTime)
  }

  get dailyCaregivingCharge(): number {
    return this.#dailyCaregivingCharge
  }

  get receptionId(): string {
    return this.#receptionId
  }

  get caregivingPeriod(): Period {
    return getDateDistance(this.endDateTime, this.startDateTime)
  }
}

export default CaregivingChargeCaregivingRoundInfoResource
