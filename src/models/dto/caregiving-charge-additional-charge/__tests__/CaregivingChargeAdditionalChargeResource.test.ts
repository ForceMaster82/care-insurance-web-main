import {faker} from '@faker-js/faker'
import {ICaregivingChargeAdditionalCharge} from '../../../../types/dto'
import CaregivingChargeAdditionalChargeResource from '../Resource'

const data: ICaregivingChargeAdditionalCharge = {
  amount: faker.datatype.number({max: 50_000, min: 10_000}),
  name: faker.commerce.productName(),
}

describe('model / Resource / CaregivingChargeAdditionalCharge', () => {
  const resource = new CaregivingChargeAdditionalChargeResource(data)

  it('construct', () => {
    expect(resource.name).toBe(data.name)
    expect(resource.amount).toBe(data.amount)
  })
})
