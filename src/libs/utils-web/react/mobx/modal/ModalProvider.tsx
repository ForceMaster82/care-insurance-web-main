import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useEffect,
} from 'react'
import {observer} from 'mobx-react-lite'
import ModalStore from './ModalStore'

export const ModalStoreContext = createContext<ModalStore<''>>(new ModalStore())

/** @description ModalProvider - PAGE ROOT 상단에 위치 하도록 한다
 *  @example
 *  ```tsx
 *   import {Button} from '@caredoc/ui-web'
 *   import {ModalProvider, useModalStore} from '@caredoc/utils-web'
 *
 *   const HomePage = () => {
 *    const modalStore = useModalStore()
 *
 *    const handleOnClickModalOpen = () => {
 *      modalStore.open('EXAMPLE')
 *    }
 *    const handleOnClickModalClose = () => {
 *      modalStore.close('EXAMPLE')
 *    }
 *    const handleOnClickModalClear = () => {
 *      modalStore.clear()
 *    }
 *
 *    return (
 *       <ModalProvider>
 *        <Button onClick={handleOnClickModalCreate}>모달 오픈</Button>
 *        <Button onClick={handleOnClickModalClose}>모달 제거</Button>
 *        <Button onClick={handleOnClickModalClear}>모달 모두 제거</Button>
 *        <>{modalStore.create('DETAIL', <div>미리 모달을 렌더링 시켜야 할 경우</div>)}</>
 *        <>{modalStore.set('EXAMPLE', <div>Example</div>)}</>
 *      </ModalProvider>
 *     )
 * }
 *```
 * */
const ModalProvider = ({
  children,
}: PropsWithChildren<unknown>): ReactElement => {
  return (
    <>
      <ModalStoreContext.Consumer>
        {(modalStore) => <ModalObserver modalStore={modalStore} />}
      </ModalStoreContext.Consumer>
      {children}
    </>
  )
}

const ModalObserver = observer(
  ({modalStore}: {modalStore: ModalStore<''>}): ReactElement => {
    useEffect(() => {
      return () => {
        modalStore.clear()
      }
    }, [])
    return (
      <>
        {modalStore.toArray?.map(({key, value}) => {
          return <React.Fragment key={key}>{value}</React.Fragment>
        })}
      </>
    )
  },
)

export default ModalProvider
