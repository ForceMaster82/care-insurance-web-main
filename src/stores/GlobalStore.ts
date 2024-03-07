import {configure} from 'mobx'

// https://ko.mobx.js.org/configuration.html
configure({
  computedRequiresReaction: true,
  enforceActions: 'always',
  observableRequiresReaction: true,
  reactionRequiresObservable: true,
})

export default class GlobalStore {
  // readonly authStore: AuthStore

  constructor() {
    // this.authStore = new AuthStore(this)
  }

  // eslint-disable-next-line unused-imports/no-unused-vars-ts, @typescript-eslint/no-unused-vars
  async hydrate(initialState?: Partial<GlobalStore>): Promise<void> {
    // tODO: hydrate your global stores when needed
    // this.exampleStore.hydrate(initialState.exampleStore);
  }
}
