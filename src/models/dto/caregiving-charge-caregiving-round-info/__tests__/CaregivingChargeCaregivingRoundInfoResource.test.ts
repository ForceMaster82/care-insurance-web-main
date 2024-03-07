import {faker} from '@faker-js/faker'
import {ICaregivingChargeCaregivingRoundInfo} from '../../../../types/dto'
import CaregivingChargeCaregivingRoundInfoResource from '../Resource'
import {getDateDistance} from '../../../../utils/date'

const caregivingStartDateTime = faker.date.soon(1)
const caregivingEndDateTime = faker.date.soon(10)

const data: ICaregivingChargeCaregivingRoundInfo = {
  caregivingRoundId: faker.datatype.uuid(),
  caregivingRoundNumber: faker.datatype.number({min: 1}),
  dailyCaregivingCharge: faker.datatype.number({max: 200_000, min: 100_000}),
  endDateTime: caregivingEndDateTime.toISOString(),
  receptionId: faker.datatype.uuid(),
  startDateTime: caregivingStartDateTime.toISOString(),
}

describe('model / Resource / CaregivingChargeCaregivingRoundInfo', () => {
  const resource = new CaregivingChargeCaregivingRoundInfoResource(data)

  it('construct', () => {
    expect(resource.caregivingRoundId).toBe(data.caregivingRoundId)
    expect(resource.caregivingRoundNumber).toBe(data.caregivingRoundNumber)
    expect(resource.startDateTime.toISOString()).toBe(
      caregivingStartDateTime.toISOString(),
    )
    expect(resource.endDateTime.toISOString()).toBe(
      caregivingEndDateTime.toISOString(),
    )
    expect(resource.dailyCaregivingCharge).toBe(data.dailyCaregivingCharge)
    expect(resource.receptionId).toBe(data.receptionId)
    expect(resource.caregivingPeriod.days).toBe(
      getDateDistance(new Date(data.endDateTime), new Date(data.startDateTime))
        .days,
    )
    expect(resource.caregivingPeriod.hours).toBe(
      getDateDistance(new Date(data.endDateTime), new Date(data.startDateTime))
        .hours,
    )
  })
})
