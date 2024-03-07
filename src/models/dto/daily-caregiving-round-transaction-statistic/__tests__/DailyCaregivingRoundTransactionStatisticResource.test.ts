import {faker} from '@faker-js/faker'
import DailyCaregivingRoundTransactionStatisticResource from '../Resource'
import {IDailyCaregivingRoundTransactionStatistic} from '~types/dto'
const responseData: IDailyCaregivingRoundTransactionStatistic = {
  caregivingRoundId: faker.datatype.string(),
  date: faker.date.toString(),
  receptionId: faker.datatype.string(),
  totalDepositAmount: faker.datatype.number(),
  totalWithdrawalAmount: faker.datatype.number(),
}

describe('일자별 간병 회차별 입출금 총액 resource model을 테스트한다.', () => {
  const caregivingDailyTransactionStatics =
    new DailyCaregivingRoundTransactionStatisticResource(responseData)
  it('constructor', () => {
    expect(caregivingDailyTransactionStatics.date).toBe(responseData.date)
    expect(caregivingDailyTransactionStatics.caregivingRoundId).toBe(
      responseData.caregivingRoundId,
    )
    expect(caregivingDailyTransactionStatics.receptionId).toBe(
      responseData.receptionId,
    )
    expect(caregivingDailyTransactionStatics.totalDepositAmount).toBe(
      responseData.totalDepositAmount,
    )
    expect(caregivingDailyTransactionStatics.totalWithdrawalAmount).toBe(
      responseData.totalWithdrawalAmount,
    )
  })
})
