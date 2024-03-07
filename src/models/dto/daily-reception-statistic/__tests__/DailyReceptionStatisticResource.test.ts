import {isSameDay} from 'date-fns'
import DailyReceptionStatisticResource from '../Resource'
import {IDailyReceptionStatistic} from '~types/dto'

const responseData: IDailyReceptionStatistic = {
  canceledReceptionCount: 2,
  canceledReceptionCountsByReason: {
    CANCELED_BY_MEDICAL_REQUEST: 0,
    CANCELED_BY_PERSONAL_CAREGIVER: 1,
  },
  depositAmount: 42_809_000,
  depositCount: 74,
  receivedDate: '2022-12-31',
  receptionCount: 21,
  requestedBillingAmount: 44_893_000,
  requestedBillingCount: 79,
  sameDayAssignmentReceptionCount: 6,
  shortTermReceptionCount: 2,
  startedSameDayAssignmentReceptionCount: 5,
  startedShortTermReceptionCount: 2,
  withdrawalAmount: 0,
  withdrawalCount: 0,
}

const resourceModel = new DailyReceptionStatisticResource(responseData)
describe('일별 접수 현황 조회 resource model test', () => {
  it('constructor', () => {
    expect(resourceModel.canceledReceptionCount).toBe(
      responseData.canceledReceptionCount,
    )
    expect(resourceModel.canceledReceptionCountsByReason).toBe(
      responseData.canceledReceptionCountsByReason,
    )
    expect(resourceModel.depositAmount).toBe(responseData.depositAmount)
    expect(
      isSameDay(
        resourceModel.receivedDate,
        new Date(responseData.receivedDate),
      ),
    ).toBe(true)
    expect(resourceModel.receptionCount).toBe(responseData.receptionCount)
    expect(resourceModel.requestedBillingAmount).toBe(
      responseData.requestedBillingAmount,
    )
    expect(resourceModel.requestedBillingCount).toBe(
      responseData.requestedBillingCount,
    )
    expect(resourceModel.sameDayAssignmentReceptionCount).toBe(
      responseData.sameDayAssignmentReceptionCount,
    )
    expect(resourceModel.shortTermReceptionCount).toBe(
      responseData.shortTermReceptionCount,
    )
    expect(resourceModel.startedSameDayAssignmentReceptionCount).toBe(
      responseData.startedSameDayAssignmentReceptionCount,
    )
    expect(resourceModel.startedShortTermReceptionCount).toBe(
      responseData.startedShortTermReceptionCount,
    )
    expect(resourceModel.withdrawalAmount).toBe(responseData.withdrawalAmount)
    expect(resourceModel.withdrawalCount).toBe(responseData.withdrawalCount)
  })
})
