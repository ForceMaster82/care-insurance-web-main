import {faker} from '@faker-js/faker'
import {CaregivingChargeConfirmStatus} from '../../../../types'
import {
  ICaregivingCharge,
  ICaregivingChargeCaregivingRoundInfo,
  ICaregivingChargeUpdate,
} from '../../../../types/dto'
import CaregivingChargeInput from '../Input'
import CaregivingChargeAdditionalChargeInput from '../../caregiving-charge-additional-charge/Input'
import CaregivingChargeResource from '../Resource'
import {CaregivingChargeData} from '../../../../types/form'
import {formatDate} from '../../../../utils/date'

const caregivingRoundInfoData: ICaregivingChargeCaregivingRoundInfo = {
  caregivingRoundId: faker.datatype.uuid(),
  caregivingRoundNumber: faker.datatype.number({min: 1}),
  dailyCaregivingCharge: faker.datatype.number({max: 200_000, min: 100_000}),
  endDateTime: faker.date.soon(5).toISOString(),
  receptionId: faker.datatype.uuid(),
  startDateTime: faker.date.soon(1).toISOString(),
}

const source: ICaregivingCharge = {
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
  expectedSettlementDate: faker.datatype.datetime().toISOString(),
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

const resource = new CaregivingChargeResource(source)

describe('model / Input / CaregivingCharge', () => {
  describe('construct without data', () => {
    const input = new CaregivingChargeInput()

    it('construct', () => {
      expect(input.additionalHoursCharge).toBe('0')
      expect(input.mealCost).toBe('0')
      expect(input.transportationFee).toBe('0')
      expect(input.holidayCharge).toBe('0')
      expect(input.commissionFee).toBe('0')
      expect(input.vacationCharge).toBe('0')
      expect(input.covid19TestingCost).toBe('0')
      expect(input.outstandingAmount).toBe('0')
      expect(input.additionalCharges.length).toBe(3)
      for (const additionalCharge of input.additionalCharges) {
        expect(additionalCharge).toBeInstanceOf(
          CaregivingChargeAdditionalChargeInput,
        )
      }
      expect(input.isCancelAfterArrived).toBe(false)
      expect(input.expectedSettlementDate).toBe('')
      expect(input.caregivingChargeConfirmStatus).toBe(
        'NOT_STARTED' as CaregivingChargeConfirmStatus,
      )
    })

    it('getter / sumOfAdditionalCharges', () => {
      expect(input.sumOfAdditionalCharges).toBe(0)
    })

    it('getter / sumOfPayments', () => {
      expect(input.sumOfPayments).toBe(0)
    })

    it('getter / input', () => {
      expect(input.input).toEqual({
        additionalCharges: [],
        additionalHoursCharge: 0,
        caregiverInsuranceFee: 0,
        caregivingChargeConfirmStatus: 'NOT_STARTED',
        commissionFee: -0,
        covid19TestingCost: 0,
        expectedSettlementDate: '',
        holidayCharge: 0,
        isCancelAfterArrived: false,
        mealCost: 0,
        outstandingAmount: 0,
        patientConditionCharge: 0,
        transportationFee: 0,
        vacationCharge: 0,
      } as ICaregivingChargeUpdate)
    })

    it('getter / data', () => {
      expect(input.data).toEqual({
        additionalCharges: input.additionalCharges,
        additionalHoursCharge: input.additionalHoursCharge,
        caregiverInsuranceFee: input.caregiverInsuranceFee,
        caregivingChargeConfirmStatus: input.caregivingChargeConfirmStatus,
        commissionFee: input.commissionFee,
        covid19TestingCost: input.covid19TestingCost,
        expectedSettlementDate: input.expectedSettlementDate,
        holidayCharge: input.holidayCharge,
        isCancelAfterArrived: input.isCancelAfterArrived,
        mealCost: input.mealCost,
        outstandingAmount: input.outstandingAmount,
        patientConditionCharge: input.patientConditionCharge,
        transportationFee: input.transportationFee,
        vacationCharge: input.vacationCharge,
      } as CaregivingChargeData)
    })

    it('set additionalCharge', () => {
      const name = faker.commerce.productName()
      const amount = faker.datatype.number().toString()

      input.setAdditionalCharge(0, 'name', name)
      input.setAdditionalCharge(0, 'amount', amount)

      expect(input.additionalCharges[0].name).toBe(name)
      expect(input.additionalCharges[0].amount).toBe(amount)
    })
  })

  describe('construct with data', () => {
    const input = new CaregivingChargeInput(resource)

    it('construct', () => {
      expect(input.additionalHoursCharge).toBe(
        resource.additionalHoursCharge.toString(),
      )
      expect(input.mealCost).toBe(resource.mealCost.toString())
      expect(input.transportationFee).toBe(
        resource.transportationFee.toString(),
      )
      expect(input.holidayCharge).toBe(resource.holidayCharge.toString())
      expect(input.commissionFee).toBe(resource.commissionFee.toString())
      expect(input.vacationCharge).toBe(resource.vacationCharge.toString())
      expect(input.covid19TestingCost).toBe(
        resource.covid19TestingCost.toString(),
      )
      expect(input.outstandingAmount).toBe(
        resource.outstandingAmount.toString(),
      )
      expect(input.additionalCharges.length).toBe(3)
      for (const additionalCharge of input.additionalCharges) {
        expect(additionalCharge).toBeInstanceOf(
          CaregivingChargeAdditionalChargeInput,
        )
      }
      expect(input.isCancelAfterArrived).toBe(resource.isCancelAfterArrived)
      expect(input.expectedSettlementDate).toBe(
        formatDate(resource.expectedSettlementDate),
      )
      expect(input.caregivingChargeConfirmStatus).toBe(
        resource.caregivingChargeConfirmStatus,
      )
    })

    it('getter / sumOfAdditionalCharges', () => {
      let sumOfAdditionalCharges = 0
      for (const additionalCharge of input.additionalCharges) {
        sumOfAdditionalCharges += Number(additionalCharge.amount)
      }

      expect(input.sumOfAdditionalCharges).toBe(sumOfAdditionalCharges)
    })

    it('getter / sumOfPayments', () => {
      const sumOfPayments =
        Number(input.additionalHoursCharge) +
        Number(input.covid19TestingCost) +
        Number(input.mealCost) +
        Number(input.transportationFee) +
        Number(input.holidayCharge) +
        Number(input.patientConditionCharge) +
        Number(input.caregiverInsuranceFee) +
        Number(input.vacationCharge) +
        Number(input.outstandingAmount) +
        Number(input.sumOfAdditionalCharges) -
        Number(input.commissionFee)

      expect(input.sumOfPayments).toBe(sumOfPayments)
    })

    it('getter / input', () => {
      expect(input.input).toEqual({
        additionalCharges: input.additionalCharges
          .filter((item) => !item.isEmpty)
          .map((item) => item.input),
        additionalHoursCharge: Number(input.additionalHoursCharge),
        caregiverInsuranceFee: Number(input.caregiverInsuranceFee),
        caregivingChargeConfirmStatus: input.caregivingChargeConfirmStatus,
        commissionFee: -Number(input.commissionFee),
        covid19TestingCost: Number(input.covid19TestingCost),
        expectedSettlementDate: input.expectedSettlementDate,
        holidayCharge: Number(input.holidayCharge),
        isCancelAfterArrived: input.isCancelAfterArrived,
        mealCost: Number(input.mealCost),
        outstandingAmount: Number(input.outstandingAmount),
        patientConditionCharge: Number(input.patientConditionCharge),
        transportationFee: Number(input.transportationFee),
        vacationCharge: Number(input.vacationCharge),
      } as ICaregivingChargeUpdate)
    })

    it('set additionalCharge', () => {
      const name = faker.commerce.productName()
      const amount = faker.datatype.number().toString()

      input.setAdditionalCharge(0, 'name', name)
      input.setAdditionalCharge(0, 'amount', amount)

      expect(input.additionalCharges[0].name).toBe(name)
      expect(input.additionalCharges[0].amount).toBe(amount)
    })
  })
})
