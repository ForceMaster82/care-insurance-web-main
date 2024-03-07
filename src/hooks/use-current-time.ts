import {useState} from 'react'
import useInterval from './use-interval'

const ONE_SECOND = 1000

type UseCurrentTime = {
  currentTime: Date
}

const useCurrentTime = (): UseCurrentTime => {
  const [currentTime, setCurrentTime] = useState(new Date())

  const tick = (): void => {
    setCurrentTime(new Date())
  }

  useInterval(tick, ONE_SECOND)

  return {
    currentTime,
  }
}

export default useCurrentTime
