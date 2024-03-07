import {isSameDay} from 'date-fns'
import SettlementResource from '~models/dto/settlement/Resource'
import {ISettlement} from '~types/dto'

const responseData: ISettlement = {
  accidentNumber: '2022-1111111',
  additionalAmount: 20_000,
  basicAmount: 605_000,
  caregivingRoundId: '01GSM0PQ5G8HW2GKYXH3VGGMZG',
  caregivingRoundNumber: 2,
  dailyCaregivingCharge: 121_000,
  expectedSettlementDate: '2023-01-01',
  id: '01GVCX47T2590S6RYTTFDGJQP6',
  lastCalculationDateTime: '2023-01-01T00:00:00Z',
  lastTransactionDateTime: '2023-01-01T00:00:00Z',
  patientName: '박재병',
  progressingStatus: 'CONFIRMED',
  receptionId: '01GVFNYEPYJD9TWBA27BN5V9KE',
  settlementCompletionDateTime: null,
  settlementManagerId: null,
  totalAmount: 625_000,
  totalDepositAmount: 100_000,
  totalWithdrawalAmount: 725_000,
}

const settlementResourceData = new SettlementResource(responseData)

describe('정산 리소스 테스트', () => {
  it('정산 리소스 accidentNumber는 입력값 accidentNumber 와 같아야 한다.', () => {
    expect(settlementResourceData.accidentNumber).toBe(
      responseData.accidentNumber,
    )
  })
  it('정산 리소스 additionalAmount는 입력값 additionalAmount 와 같아야 한다', () => {
    expect(settlementResourceData.additionalAmount).toBe(
      responseData.additionalAmount,
    )
  })
  it('정산 리소스 basicAmount는 입력값 basicAmount 와 같아야 한다', () => {
    expect(settlementResourceData.basicAmount).toBe(responseData.basicAmount)
  })
  it('정산 리소스 caregivingRoundId는 입력값 caregivingRoundId 와 같아야 한다', () => {
    expect(settlementResourceData.caregivingRoundId).toBe(
      responseData.caregivingRoundId,
    )
  })
  it('정산 리소스 caregivingRoundNumber는 입력값 caregivingRoundNumber 와 같아야 한다', () => {
    expect(settlementResourceData.caregivingRoundNumber).toBe(
      responseData.caregivingRoundNumber,
    )
  })
  it('정산 리소스 dailyCaregivingCharge는 입력값 dailyCaregivingCharge 와 같아야 한다', () => {
    expect(settlementResourceData.dailyCaregivingCharge).toBe(
      responseData.dailyCaregivingCharge,
    )
  })
  it('정산 리소스 expectedSettlementDate는 입력값 expectedSettlementDate 와 같아야 한다', () => {
    expect(
      isSameDay(
        settlementResourceData.expectedSettlementDate,
        new Date(responseData.expectedSettlementDate),
      ),
    ).toBe(true)
  })
  it('정산 리소스 id는 입력값 id 와 같아야 한다', () => {
    expect(settlementResourceData.id).toBe(responseData.id)
  })
  it('정산 리소스 lastCalculationDateTime는 입력값 lastCalculationDateTime 와 같아야 한다', () => {
    expect(
      isSameDay(
        settlementResourceData.lastCalculationDateTime,
        new Date(responseData.lastCalculationDateTime),
      ),
    ).toBe(true)
  })
  it('정산 리소스 lastTransactionDateTime는 입력값 lastTransactionDateTime 와 같아야 한다', () => {
    settlementResourceData.lastTransactionDateTime &&
      responseData.lastTransactionDateTime &&
      expect(
        isSameDay(
          settlementResourceData.lastTransactionDateTime,
          new Date(responseData.lastTransactionDateTime),
        ),
      ).toBe(true)
  })
  it('정산 리소스 patientName는 입력값 patientName 와 같아야 한다', () => {
    expect(settlementResourceData.patientName).toBe(responseData.patientName)
  })
  it('정산 리소스 patientName는 입력값 patientName 와 같아야 한다', () => {
    expect(settlementResourceData.patientName).toBe(responseData.patientName)
  })
  it('정산 리소스 progressingStatus는 입력값 progressingStatus 와 같아야 한다', () => {
    expect(settlementResourceData.progressingStatus).toBe(
      responseData.progressingStatus,
    )
  })
  it('정산 리소스 receptionId는 입력값 receptionId 와 같아야 한다', () => {
    expect(settlementResourceData.receptionId).toBe(responseData.receptionId)
  })
  it('정산 리소스 settlementCompletionDateTime는 입력값 settlementCompletionDateTime 와 같아야 한다', () => {
    settlementResourceData.settlementCompletionDateTime &&
      responseData.settlementCompletionDateTime &&
      expect(
        isSameDay(
          settlementResourceData.settlementCompletionDateTime,
          new Date(responseData.settlementCompletionDateTime),
        ),
      ).toBe(true)
  })
  it('정산 리소스 settlementManagerId는 입력값 settlementManagerId 와 같아야 한다', () => {
    expect(settlementResourceData.settlementManagerId).toBe(
      responseData.settlementManagerId,
    )
  })
  it('정산 리소스 totalAmount는 입력값 totalAmount 와 같아야 한다', () => {
    expect(settlementResourceData.totalAmount).toBe(responseData.totalAmount)
  })
  it('정산 리소스 totalDepositAmount는 입력값 totalDepositAmount 와 같아야 한다', () => {
    expect(settlementResourceData.totalDepositAmount).toBe(
      responseData.totalDepositAmount,
    )
  })
  it('정산 리소스 totalWithdrawalAmount는 입력값 totalWithdrawalAmount 와 같아야 한다', () => {
    expect(settlementResourceData.totalWithdrawalAmount).toBe(
      responseData.totalWithdrawalAmount,
    )
  })
})

export default {}
