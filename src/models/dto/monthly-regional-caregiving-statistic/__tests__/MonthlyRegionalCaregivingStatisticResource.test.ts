import MonthlyRegionalCaregivingStatisticResource from '../Resource'

const responseData = {
  city: '강남구',
  month: 11,
  receptionCount: 24_265,
  state: '서울특별시',
  year: 2023,
}

const resource = new MonthlyRegionalCaregivingStatisticResource(responseData)

describe('월별 지역별 통계 resource model test', () => {
  it('constructor', () => {
    expect(resource.city).toBe(responseData.city)
    expect(resource.month).toBe(responseData.month)
    expect(resource.state).toBe(responseData.state)
    expect(resource.city).toBe(responseData.city)
    expect(resource.receptionCount).toBe(responseData.receptionCount)
  })
})
