import {faker} from '@faker-js/faker'
import BillingTransactionInput from '../Input'
import {BillingTransactionData} from '~types/form'
import {formatDate, getIsoString} from '~utils/date'
import {IBillingTransactionCreate} from '~types/dto'

const dummyData: BillingTransactionData = {
  amount: faker.datatype.number({min: 10_000}).toString(),
  transactionDate: formatDate(faker.datatype.datetime()),
  transactionSubjectId: faker.datatype.string(),
  transactionType: 'WITHDRAWAL',
}

const dummyDataOutput: IBillingTransactionCreate = {
  amount: Number(dummyData.amount),
  transactionDate: getIsoString(dummyData.transactionDate),
  transactionSubjectId: dummyData.transactionSubjectId,
  transactionType: dummyData.transactionType,
}

describe('청구 입출금 input model test', () => {
  it('constructor', () => {
    const inputModel = new BillingTransactionInput()
    expect(inputModel.amount).toBe('0')
    expect(inputModel.transactionType).toBe('DEPOSIT')
    expect(inputModel.transactionDate).toBe(formatDate(new Date()))
    expect(inputModel.transactionSubjectId).toBe('')
  })

  it('data setter & data getter & input getter', () => {
    const inputModel = new BillingTransactionInput()
    inputModel.data = dummyData

    expect(inputModel.data).toStrictEqual(dummyData)
    expect(inputModel.input).toStrictEqual(dummyDataOutput)
  })
})
