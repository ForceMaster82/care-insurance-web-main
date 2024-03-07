import {faker} from '@faker-js/faker'
import BillingDetailBasicAmountResource from '../Resource'
import {IBillingDetailBasicAmount} from '~types/dto'

const responseData: IBillingDetailBasicAmount = {
  caregivingDays: faker.datatype.number({max: 8, min: 1}),
  dailyCaregivingCharge: faker.datatype.number({min: 100_000}),
  targetAccidentYear: faker.datatype.number({max: 2023, min: 2000}),
  totalAmount: faker.datatype.number({max: 1_000_000, min: 100_000}),
}

const resource = new BillingDetailBasicAmountResource(responseData)

describe('청구 상세조회 basic amount resource model test', () => {
  it('constructor', () => {
    expect(resource.caregivingDays).toBe(responseData.caregivingDays)
    expect(resource.dailyCaregivingCharge).toBe(
      responseData.dailyCaregivingCharge,
    )
    expect(resource.targetAccidentYear).toBe(responseData.targetAccidentYear)
    expect(resource.totalAmount).toBe(responseData.totalAmount)
  })
})
