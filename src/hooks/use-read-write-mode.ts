import {useState} from 'react'

type Mode = 'READ' | 'WRITE'

type UseReadWriteMode = {
  mode: Mode
  setMode: (mode: Mode) => void
}

const useReadWriteMode = (): UseReadWriteMode => {
  const [mode, setMode] = useState<Mode>('READ')

  return {
    mode,
    setMode,
  }
}

export default useReadWriteMode
