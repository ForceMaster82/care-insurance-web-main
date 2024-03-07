import {action, computed, makeObservable, observable, toJS} from 'mobx'
import {ReactNode} from 'react'

interface ModalToArrayList<TModalStoreType> {
  key: TModalStoreType
  value: ReactNode
}
class ModalStore<TModalStoreType> {
  modalMap = new Map<TModalStoreType, ReactNode>()
  modalTempMap = new Map<TModalStoreType, ReactNode>()
  constructor() {
    makeObservable(this, {
      clear: action,
      close: action,
      create: action,
      delete: action,
      has: action,
      modalMap: observable,
      modalTempMap: observable,
      open: action,
      set: action,
      toArray: computed,
    })
  }

  has(key: TModalStoreType): boolean {
    return this.modalMap.has(key)
  }

  get toArray(): ModalToArrayList<TModalStoreType>[] {
    return [...this.modalMap].map(([key, value]) => ({
      key: key,
      value: toJS(value),
    }))
  }
  set(key: TModalStoreType, component: ReactNode): void {
    this.modalTempMap.set(key, component)
  }
  open(key: TModalStoreType): void {
    const component = this.modalTempMap.get(key)
    this.modalMap.set(key, component)
  }
  close(key: TModalStoreType): void {
    this.delete(key)
  }
  create(key: TModalStoreType, component: ReactNode): void {
    this.modalMap.set(key, component)
  }

  delete(key: TModalStoreType): void {
    this.modalMap.delete(key)
  }

  clear(): void {
    this.modalMap.clear()
  }
}

export default ModalStore
