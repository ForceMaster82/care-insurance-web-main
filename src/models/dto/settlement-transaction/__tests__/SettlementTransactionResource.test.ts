import SettlementTransactionResource from '../Resource'
import {ISettlementTransaction} from '~types/dto'

const responseData: ISettlementTransaction = {
  amount: 5000,
  enteredDateTime: '2021-03-21T00:00:00.000Z',
  transactionDate: '2021-04-19T00:00:00.000Z',
  transactionSubjectId: '01GW1160R5ZC9E3P5V57TYQX0E',
  transactionType: 'WITHDRAWAL',
}
const outputData = {
  amount: 5000,
  enteredDateTime: new Date('2021-03-21T00:00:00.000Z'),
  transactionDate: new Date('2021-04-19T00:00:00.000Z'),
  transactionSubjectId: '01GW1160R5ZC9E3P5V57TYQX0E',
  transactionType: 'WITHDRAWAL',
}

const settlementTransactionResourceModel = new SettlementTransactionResource(
  responseData,
)

describe('정산 입출금 resource model test', () => {
  it('정산 resource model의 amount는 입력값 amount와 같아야 한다 ', () => {
    expect(settlementTransactionResourceModel.amount).toBe(outputData.amount)
  })
  it('정산 resource model의 enteredDate 는 입력값 enteredDateTime 와 같아야 한다 ', () => {
    expect(settlementTransactionResourceModel.enteredDateTime).toStrictEqual(
      outputData.enteredDateTime,
    )
  })
  it('정산 resource model의 transactionDate 는 입력값 transactionDate 와 같아야 한다 ', () => {
    expect(settlementTransactionResourceModel.transactionDate).toStrictEqual(
      outputData.transactionDate,
    )
  })
  it('정산 resource model의 transactionSubjectId 는 입력값 transactionSubjectId 와 같아야 한다 ', () => {
    expect(settlementTransactionResourceModel.transactionSubjectId).toBe(
      outputData.transactionSubjectId,
    )
  })
  it('정산 resource model의 transactionType 는 입력값 transactionType 와 같아야 한다 ', () => {
    expect(settlementTransactionResourceModel.transactionType).toBe(
      outputData.transactionType,
    )
  })
})

export default {}
