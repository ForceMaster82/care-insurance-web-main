import {useContext, useMemo} from 'react'
import {ModalStoreContext} from './ModalProvider'
import ModalStore from './ModalStore'

/** @description useModalStore
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
export const useModalStore = <TModalState>(): ModalStore<TModalState> => {
  const context = useContext(ModalStoreContext)
  return useMemo(() => context as ModalStore<TModalState>, [context])
}
