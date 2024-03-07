import SettlementTransactionCreateInput from '~models/dto/settlement-transaction/CreateInput'
import {ISettlementTransactionCreate} from '~types/dto'
import {SettlementTransactionCreateData} from '~types/form'
import {getIsoString} from '~utils/date'

const mockData: SettlementTransactionCreateData = {
  amount: '1,000',
  transactionDate: '2022-12-31',
  transactionSubjectId: '1234_4567',
  transactionType: 'DEPOSIT',
}

const mockInput: ISettlementTransactionCreate = {
  amount: 1000,
  transactionDate: getIsoString('2022-12-31'),
  transactionSubjectId: '1234_4567',
  transactionType: 'DEPOSIT',
}

describe('정산 입출금 내역 추가 Input model test', () => {
  const settlementTransactionCreateInputModel =
    new SettlementTransactionCreateInput()

  settlementTransactionCreateInputModel.data = mockData

  it('정산 입출금 내역 추가 data setter test', () => {
    expect(settlementTransactionCreateInputModel.data).toStrictEqual(mockData)
  })

  it('정산 입출금 관리 모델 input setter test ', () => {
    expect(settlementTransactionCreateInputModel.input).toStrictEqual(mockInput)
  })
})

export default {}
