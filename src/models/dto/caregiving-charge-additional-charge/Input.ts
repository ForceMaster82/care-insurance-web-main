import {makeAutoObservable} from 'mobx'
import {ICaregivingChargeAdditionalCharge} from '../../../types/dto'
import {CaregivingChargeAdditionalChargeData} from '../../../types/form'
import {NumberSign} from '../../../types'
import CaregivingChargeAdditionalChargeResource from './Resource'

class CaregivingChargeAdditionalChargeInput {
  name = ''

  amount = '0'

  sign: NumberSign = 'POSITIVE'

  constructor(resource?: CaregivingChargeAdditionalChargeResource) {
    makeAutoObservable(this)

    resource && this.setDataFromResource(resource)
  }

  get isEmpty(): boolean {
    return !this.name && Number(this.amount) === 0
  }

  get input(): ICaregivingChargeAdditionalCharge {
    return {
      amount:
        this.sign === 'NEGATIVE'
          ? Number(this.amount) * -1
          : Number(this.amount),
      name: this.name,
    }
  }

  get data(): CaregivingChargeAdditionalChargeData {
    return {
      amount: this.amount,
      name: this.name,
      sign: this.sign,
    }
  }

  set data(data: CaregivingChargeAdditionalChargeData) {
    const {name, amount, sign} = data

    this.name = name
    this.amount = amount
    this.sign = sign
  }

  set<K extends keyof this>(property: K, value: this[K]): void {
    this[property] = value
  }

  setDataFromResource(
    resource: CaregivingChargeAdditionalChargeResource,
  ): void {
    this.name = resource.name
    this.amount = Math.abs(resource.amount).toString()
    this.sign = resource.amount >= 0 ? 'POSITIVE' : 'NEGATIVE'
  }
}

export default CaregivingChargeAdditionalChargeInput
