import {faker} from '@faker-js/faker'
import {isSameDay} from 'date-fns'
import BillingResource from '../Resource'
import {IBilling} from '~types/dto'

const responseData: IBilling = {
  accidentNumber: faker.datatype.string(),
  actualUsagePeriod: '10일 5시간',
  billingDate: faker.date.future().toISOString(),
  billingProgressingStatus: 'UNDER_DEPOSIT',
  endDateTime: faker.date.future().toISOString(),
  id: faker.datatype.string(),
  patientName: faker.datatype.string(),
  receptionId: faker.datatype.string(),
  roundNumber: faker.datatype.number(15),
  startDateTime: faker.date.future().toISOString(),
  totalAmount: faker.datatype.number({min: 100_000}),
  totalDepositAmount: faker.datatype.number({min: 100_000}),
  totalWithdrawalAmount: faker.datatype.number({min: 100_000}),
  transactionDate: faker.date.future().toISOString(),
}
const billingResource = new BillingResource(responseData)

describe('청구 조회 resource model test', () => {
  it('constructor', () => {
    expect(billingResource.accidentNumber).toBe(responseData.accidentNumber)
    expect(billingResource.actualUsagePeriod).toBe(
      responseData.actualUsagePeriod,
    )
    expect(
      isSameDay(
        billingResource.billingDate,
        new Date(responseData.billingDate),
      ),
    ).toBe(true)
    expect(billingResource.billingProgressingStatus).toBe(
      responseData.billingProgressingStatus,
    )
    expect(
      isSameDay(
        billingResource.endDateTime,
        new Date(responseData.endDateTime),
      ),
    ).toBe(true)
    expect(billingResource.id).toBe(responseData.id)
    expect(billingResource.patientName).toBe(responseData.patientName)
    expect(billingResource.receptionId).toBe(responseData.receptionId)
    expect(billingResource.roundNumber).toBe(responseData.roundNumber)
    expect(
      isSameDay(
        billingResource.startDateTime,
        new Date(responseData.startDateTime),
      ),
    ).toBe(true)
    expect(billingResource.totalAmount).toBe(responseData.totalAmount)
    expect(
      isSameDay(
        billingResource.transactionDate,
        new Date(responseData.transactionDate),
      ),
    ).toBe(true)
  })
})
