import {isSameDay} from 'date-fns'
import BillingDetailResource from '../Resource'
import {IBillingDetail} from '~types/dto'
import BillingDetailBasicAmountResource from '~models/dto/billing-detail-basic-amount/Resource'

const responseData: IBillingDetail = {
  accidentNumber: '2023-2222222',
  additionalAmount: 60_000,
  additionalHours: 3,
  basicAmounts: [
    {
      caregivingDays: 2,
      dailyCaregivingCharge: 115_000,
      targetAccidentYear: 2019,
      totalAmount: 230_000,
    },
    {
      caregivingDays: 3,
      dailyCaregivingCharge: 135_000,
      targetAccidentYear: 2022,
      totalAmount: 405_000,
    },
  ],
  endDateTime: '2023-02-30T14:00:00Z',
  receptionId: '01GWK30517ZTHWDW1QQ22V6QZC',
  roundNumber: 7,
  startDateTime: '2022-12-30T14:00:00Z',
  totalAmount: 547_500,
  totalDepositAmount: 100_000,
  totalWithdrawalAmount: 100_000,
}

const resource = new BillingDetailResource(responseData)

describe('청구 상세 조회 resource model test', () => {
  it('constructor', () => {
    expect(resource.accidentNumber).toBe(responseData.accidentNumber)
    expect(resource.additionalAmount).toBe(responseData.additionalAmount)
    expect(resource.additionalHours).toBe(responseData.additionalHours)
    for (const basicAmount of resource.basicAmounts) {
      expect(basicAmount).toBeInstanceOf(BillingDetailBasicAmountResource)
    }
    expect(
      isSameDay(resource.endDateTime, new Date(responseData.endDateTime)),
    ).toBe(true)
    expect(resource.receptionId).toBe(responseData.receptionId)
    expect(resource.roundNumber).toBe(responseData.roundNumber)
    expect(
      isSameDay(resource.startDateTime, new Date(responseData.startDateTime)),
    ).toBe(true)
    expect(resource.totalAmount).toBe(responseData.totalAmount)
  })
})
