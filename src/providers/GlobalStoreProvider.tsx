import React, {
  Context,
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react'
import GlobalStore from '../stores/GlobalStore'

let _globalStore: GlobalStore

export const getGlobalStore = (): GlobalStore => _globalStore

export const setupGlobalStore = (
  initialState: Partial<GlobalStore> = {},
): GlobalStore => {
  if (!_globalStore) {
    _globalStore = new GlobalStore()
  }
  if (initialState) {
    _globalStore.hydrate(initialState)
  }
  return _globalStore
}

export const GlobalStoreContext: Context<GlobalStore> = createContext(
  setupGlobalStore(),
)

export const useGlobalStore = (): GlobalStore => useContext(GlobalStoreContext)

interface IProps {
  hydrationData?: Partial<GlobalStore>
}

export const GlobalStoreProvider = ({
  children,
  hydrationData,
}: PropsWithChildren<IProps>): ReactElement => {
  _globalStore = setupGlobalStore(hydrationData)
  return (
    <GlobalStoreContext.Provider value={_globalStore}>
      {children}
    </GlobalStoreContext.Provider>
  )
}

GlobalStoreProvider.displayName = 'GlobalStoreProvider'
GlobalStoreProvider.defaultProps = {}
