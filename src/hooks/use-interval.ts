import {useEffect, useRef} from 'react'

type UseInterval = (callback: () => void, interval: number) => void

const useInterval: UseInterval = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = (): void => {
      savedCallback.current?.()
    }

    // eslint-disable-next-line prefer-const
    let id = setInterval(tick, interval)

    return () => clearInterval(id)
  }, [interval])
}

export default useInterval
