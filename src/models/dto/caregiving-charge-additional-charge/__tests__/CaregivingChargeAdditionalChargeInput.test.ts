import {faker} from '@faker-js/faker'
import {ICaregivingChargeAdditionalCharge} from '../../../../types/dto'
import CaregivingChargeAdditionalChargeResource from '../Resource'
import CaregivingChargeAdditionalChargeInput from '../Input'
import {CaregivingChargeAdditionalChargeData} from '../../../../types/form'
import {NumberSign} from '../../../../types'

const source: ICaregivingChargeAdditionalCharge = {
  amount: faker.datatype.number({max: 50_000, min: -50_000}),
  name: faker.commerce.productName(),
}

const data: CaregivingChargeAdditionalChargeData = {
  amount: faker.datatype.number({max: 50_000, min: 10_000}).toString(),
  name: faker.commerce.productName(),
  sign: faker.helpers.arrayElement([
    'POSITIVE',
    'NEGATIVE',
  ] satisfies NumberSign[]),
}

const resource = new CaregivingChargeAdditionalChargeResource(source)

describe('model / Input / CaregivingChargeAdditionalCharge', () => {
  describe('construct without data', () => {
    const input = new CaregivingChargeAdditionalChargeInput()

    it('construct', () => {
      expect(input.name).toBe('')
      expect(input.amount).toBe('0')
      expect(input.sign).toBe('POSITIVE')
    })

    it('getter', () => {
      expect(input.isEmpty).toBe(true)
      expect(input.input).toEqual({
        amount: 0,
        name: '',
      })
      expect(input.data).toEqual({
        amount: '0',
        name: '',
        sign: 'POSITIVE',
      })
    })

    it('set data', () => {
      input.data = data

      expect(input.name).toBe(data.name)
      expect(input.amount).toBe(data.amount)
      expect(input.sign).toBe(data.sign)
    })
  })

  describe('construct with data', () => {
    const input = new CaregivingChargeAdditionalChargeInput(resource)

    it('costruct', () => {
      expect(input.name).toBe(resource.name)
      expect(Number(input.amount)).toBe(Math.abs(resource.amount))
      expect(input.sign).toBe(resource.amount >= 0 ? 'POSITIVE' : 'NEGATIVE')
    })

    it('getter', () => {
      expect(input.isEmpty).toBe(false)
      expect(input.input).toEqual({
        amount: resource.amount,
        name: resource.name,
      })
      expect(input.data).toEqual({
        amount: Math.abs(resource.amount).toString(),
        name: resource.name,
        sign: resource.amount >= 0 ? 'POSITIVE' : 'NEGATIVE',
      })
    })
  })
})
