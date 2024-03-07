import ReconciliationMonthlyStatics from '../Resource'
import {IMonthlyReconciliationStatistic} from '~types/dto'

const responseData: IMonthlyReconciliationStatistic = {
  caregiverCount: 78,
  month: 11,
  receptionCount: 74,
  totalBillingAmount: 76_997_000,
  totalCaregivingPeriod: 597,
  totalDistributedProfit: 1_093_140,
  totalProfit: 1_821_900,
  totalSettlementAmount: 75_175_100,
  year: 2023,
}

const reconciliationMonthlyStaticsResource = new ReconciliationMonthlyStatics(
  responseData,
)

describe('월별 정산대사 현황 resource model을 테스트 한다.', () => {
  it('월별 정상대사 현황 resource model의 입력값은 IReconciliationMonthlyStatus에 맞는 필드가있어야 한다  ', () => {
    expect(reconciliationMonthlyStaticsResource.year).toBeDefined()
    expect(reconciliationMonthlyStaticsResource.month).toBeDefined()
    expect(reconciliationMonthlyStaticsResource.receptionCount).toBeDefined()
    expect(reconciliationMonthlyStaticsResource.caregiverCount).toBeDefined()
    expect(
      reconciliationMonthlyStaticsResource.totalCaregivingPeriod,
    ).toBeDefined()
    expect(
      reconciliationMonthlyStaticsResource.totalSettlementAmount,
    ).toBeDefined()
    expect(reconciliationMonthlyStaticsResource.totalProfit).toBeDefined()
    expect(
      reconciliationMonthlyStaticsResource.totalDistributedProfit,
    ).toBeDefined()
  })

  it('월별 정상대사 현황 resource model의 입력값은 responseData와 값이 같아야 한다.', () => {
    expect(reconciliationMonthlyStaticsResource.year).toBe(responseData.year)
    expect(reconciliationMonthlyStaticsResource.month).toBe(responseData.month)
    expect(reconciliationMonthlyStaticsResource.receptionCount).toBe(
      responseData.receptionCount,
    )
    expect(reconciliationMonthlyStaticsResource.caregiverCount).toBe(
      responseData.caregiverCount,
    )
    expect(reconciliationMonthlyStaticsResource.totalCaregivingPeriod).toBe(
      responseData.totalCaregivingPeriod,
    )
    expect(reconciliationMonthlyStaticsResource.totalSettlementAmount).toBe(
      responseData.totalSettlementAmount,
    )
    expect(reconciliationMonthlyStaticsResource.totalProfit).toBe(
      responseData.totalProfit,
    )
    expect(reconciliationMonthlyStaticsResource.totalDistributedProfit).toBe(
      responseData.totalDistributedProfit,
    )
  })
})
