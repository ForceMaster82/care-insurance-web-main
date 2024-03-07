import {faker} from '@faker-js/faker'
import {isSameDay} from 'date-fns'
import {IReceptionSettlement} from '../../../../types/dto'
import {SettlementProgressingStatus} from '../../../../types'
import ReceptionSettlementResource from '../Resource'

const data: IReceptionSettlement = {
  accidentNumber: faker.datatype.uuid(),
  additionalAmount: faker.datatype.number(),
  basicAmount: faker.datatype.number(),
  caregivingRoundId: faker.datatype.uuid(),
  caregivingRoundNumber: faker.datatype.number(),
  dailyCaregivingCharge: faker.datatype.number(),
  expectedSettlementDate: faker.date.soon().toISOString(),
  id: faker.datatype.uuid(),
  lastCalculationDateTime: faker.date.soon().toISOString(),
  lastTransactionDateTime: faker.date.soon().toISOString(),
  patientName: faker.name.fullName(),
  patientNickName: faker.name.fullName(),
  progressingStatus: faker.helpers.arrayElement([
    'CONFIRMED',
    'WAITING',
    'COMPLETED',
  ] as SettlementProgressingStatus[]),
  receptionId: faker.datatype.uuid(),
  settlementCompletionDateTime: faker.date.soon().toISOString(),
  settlementManagerId: faker.datatype.uuid(),
  totalAmount: faker.datatype.number(),
  totalDepositAmount: faker.datatype.number(),
  totalWithdrawalAmount: faker.datatype.number(),
}

describe('model / Resource / ReceptionSettlement', () => {
  const resource = new ReceptionSettlementResource(data)

  it('construct', () => {
    expect(resource.id).toBe(data.id)
    expect(resource.receptionId).toBe(data.receptionId)
    expect(resource.caregivingRoundId).toBe(data.caregivingRoundId)
    expect(resource.accidentNumber).toBe(data.accidentNumber)
    expect(resource.caregivingRoundNumber).toBe(data.caregivingRoundNumber)
    expect(resource.progressingStatus).toBe(data.progressingStatus)
    expect(resource.patientName).toBe(data.patientName)
    expect(resource.patientNickName).toBe(data.patientNickName)
    expect(resource.dailyCaregivingCharge).toBe(data.dailyCaregivingCharge)
    expect(resource.basicAmount).toBe(data.basicAmount)
    expect(resource.additionalAmount).toBe(data.additionalAmount)
    expect(resource.totalAmount).toBe(data.totalAmount)
    expect(resource.lastCalculationDateTime.toISOString()).toBe(
      data.lastCalculationDateTime,
    )
    expect(
      isSameDay(
        resource.expectedSettlementDate,
        new Date(data.expectedSettlementDate),
      ),
    ).toBe(true)
    expect(resource.totalDepositAmount).toBe(data.totalDepositAmount)
    expect(resource.totalWithdrawalAmount).toBe(data.totalWithdrawalAmount)
    expect(
      (resource.lastTransactionDateTime &&
        resource.lastTransactionDateTime.toISOString()) ||
        resource.lastTransactionDateTime,
    ).toBe(data.lastTransactionDateTime)
    expect(
      (resource.settlementCompletionDateTime &&
        resource.settlementCompletionDateTime.toISOString()) ||
        resource.settlementCompletionDateTime,
    ).toBe(data.settlementCompletionDateTime)
    expect(resource.settlementManagerId).toBe(data.settlementManagerId)
  })
})
