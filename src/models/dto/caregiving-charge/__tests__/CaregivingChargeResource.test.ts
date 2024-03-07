import {faker} from '@faker-js/faker'
import {CaregivingChargeConfirmStatus} from '../../../../types'
import {
  ICaregivingCharge,
  ICaregivingChargeCaregivingRoundInfo,
} from '../../../../types/dto'
import CaregivingChargeResource from '../Resource'
import CaregivingChargeCaregivingRoundInfoResource from '../../caregiving-charge-caregiving-round-info/Resource'
import CaregivingChargeAdditionalChargeResource from '../../caregiving-charge-additional-charge/Resource'

const caregivingRoundInfoData: ICaregivingChargeCaregivingRoundInfo = {
  caregivingRoundId: faker.datatype.uuid(),
  caregivingRoundNumber: faker.datatype.number({min: 1}),
  dailyCaregivingCharge: faker.datatype.number({max: 200_000, min: 100_000}),
  endDateTime: faker.date.soon(5).toISOString(),
  receptionId: faker.datatype.uuid(),
  startDateTime: faker.date.soon(1).toISOString(),
}

const data: ICaregivingCharge = {
  additionalAmount: faker.datatype.number(),
  additionalCharges: [
    {
      amount: faker.datatype.number(),
      name: faker.commerce.productName(),
    },
  ],
  additionalHoursCharge: faker.datatype.number(),
  basicAmount: faker.datatype.number(),
  caregiverInsuranceFee: faker.datatype.number(),
  caregivingChargeConfirmStatus: faker.helpers.arrayElement([
    'NOT_STARTED',
    'CONFIRMED',
  ] as CaregivingChargeConfirmStatus[]),
  caregivingRoundInfo: caregivingRoundInfoData,
  commissionFee: faker.datatype.number(),
  covid19TestingCost: faker.datatype.number(),
  holidayCharge: faker.datatype.number(),
  id: faker.datatype.uuid(),
  isCancelAfterArrived: faker.datatype.boolean(),
  mealCost: faker.datatype.number(),
  outstandingAmount: faker.datatype.number(),
  patientConditionCharge: faker.datatype.number(),
  totalAmount: faker.datatype.number(),
  transportationFee: faker.datatype.number(),
  vacationCharge: faker.datatype.number(),
}

describe('model / Resource / CaregivingCharge', () => {
  const resource = new CaregivingChargeResource(data)
  it('construct', () => {
    expect(resource.id).toBe(data.id)
    expect(resource.caregivingRoundInfo).toBeInstanceOf(
      CaregivingChargeCaregivingRoundInfoResource,
    )
    expect(resource.additionalHoursCharge).toBe(data.additionalHoursCharge)
    expect(resource.mealCost).toBe(data.mealCost)
    expect(resource.transportationFee).toBe(data.transportationFee)
    expect(resource.holidayCharge).toBe(data.holidayCharge)
    expect(resource.caregiverInsuranceFee).toBe(data.caregiverInsuranceFee)
    expect(resource.commissionFee).toBe(data.commissionFee)
    expect(resource.vacationCharge).toBe(data.vacationCharge)
    expect(resource.patientConditionCharge).toBe(data.patientConditionCharge)
    expect(resource.covid19TestingCost).toBe(data.covid19TestingCost)
    expect(resource.outstandingAmount).toBe(data.outstandingAmount)
    for (const additionalCharge of resource.additionalCharges) {
      expect(additionalCharge).toBeInstanceOf(
        CaregivingChargeAdditionalChargeResource,
      )
    }
    expect(resource.isCancelAfterArrived).toBe(data.isCancelAfterArrived)
    expect(resource.caregivingChargeConfirmStatus).toBe(
      data.caregivingChargeConfirmStatus,
    )
    expect(resource.basicAmount).toBe(data.basicAmount)
    expect(resource.additionalAmount).toBe(data.additionalAmount)
    expect(resource.totalAmount).toBe(data.totalAmount)
  })
})
