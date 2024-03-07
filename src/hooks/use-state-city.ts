import {useState} from 'react'
import {State} from '../components/StateCityPicker'

interface IUseStateCity {
  defaultCity?: string | null
  defaultState?: State | null
}

type UseStateCity = {
  city?: string | null
  setCity: (value: string | null) => void
  setState: (value: State | null) => void
  state?: State | null
}

const useStateCity = (props?: IUseStateCity): UseStateCity => {
  const {defaultState = null, defaultCity = null} = props || {}

  const [state, setState] = useState(defaultState)
  const [city, setCity] = useState(defaultCity)

  const handleOnChangeState = (value: State | null): void => {
    setState(value)
    setCity(null)
  }

  return {
    city,
    setCity,
    setState: handleOnChangeState,
    state,
  }
}

export default useStateCity
