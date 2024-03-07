import {faker} from '@faker-js/faker'
import DailyTransactionStatisticResource from '../Resource'
import {IDailyTransactionStatistic} from '~types/dto'

const responseData: IDailyTransactionStatistic = {
  date: faker.date.past().toString(),
  totalDepositAmount: faker.datatype.number({max: 10_000_000, min: -30_000}),
  totalWithdrawalAmount: faker.datatype.number({max: 10_000_000, min: -30_000}),
}

describe('일별 입출금 총액 resource model을 테스트한다. ', () => {
  const transactionInfo = new DailyTransactionStatisticResource(responseData)
  it('constructor test', () => {
    expect(transactionInfo.date).toBe(responseData.date)
    expect(transactionInfo.totalDepositAmount).toBe(
      responseData.totalDepositAmount,
    )
    expect(transactionInfo.totalWithdrawalAmount).toBe(
      responseData.totalWithdrawalAmount,
    )
  })
})
