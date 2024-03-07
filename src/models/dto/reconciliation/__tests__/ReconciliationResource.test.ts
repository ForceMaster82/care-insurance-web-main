import {faker} from '@faker-js/faker'
import {ReconciliationClosingStatus} from '../../../../types'
import {IReconciliation} from '../../../../types/dto'
import ReconciliationResource from '../Resource'

const data: IReconciliation = {
  billingAmount: faker.datatype.number(),
  caregivingRoundId: faker.datatype.uuid(),
  closingStatus: faker.helpers.arrayElement([
    'OPEN',
    'CLOSED',
  ] as ReconciliationClosingStatus[]),
  distributedProfit: faker.datatype.number(),
  id: faker.datatype.uuid(),
  profit: faker.datatype.number(),
  receptionId: faker.datatype.uuid(),
  settlementAmount: faker.datatype.number(),
  settlementDepositAmount: faker.datatype.number(),
  settlementWithdrawalAmount: faker.datatype.number(),
}

describe('model / Resource / Reconciliation', () => {
  const resource = new ReconciliationResource(data)

  it('construct', () => {
    expect(resource.id).toBe(data.id)
    expect(resource.closingStatus).toBe(data.closingStatus)
    expect(resource.receptionId).toBe(data.receptionId)
    expect(resource.caregivingRoundId).toBe(data.caregivingRoundId)
    expect(resource.billingAmount).toBe(data.billingAmount)
    expect(resource.settlementAmount).toBe(data.settlementAmount)
    expect(resource.settlementDepositAmount).toBe(data.settlementDepositAmount)
    expect(resource.settlementWithdrawalAmount).toBe(
      data.settlementWithdrawalAmount,
    )
    expect(resource.profit).toBe(data.profit)
    expect(resource.distributedProfit).toBe(data.distributedProfit)
    expect(resource.caredocProfit).toBe(data.profit - data.distributedProfit)
  })
})
