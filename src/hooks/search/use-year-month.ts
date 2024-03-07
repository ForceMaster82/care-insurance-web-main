import {useState} from 'react'
import {getThisMonth, getThisYear} from '../../utils/date'

interface IUseYearMonthProps {
  /** 기본값은 당월입니다. */
  defaultMonth?: number
  /** 기본값은 당해연도입니다. */
  defaultYear?: number
}

type UseYearMonth = {
  month: number
  setMonth: (value: number) => void
  setYear: (value: number) => void
  year: number
}

const useYearMonth = (props: IUseYearMonthProps): UseYearMonth => {
  const {defaultYear = getThisYear(), defaultMonth = getThisMonth() + 1} = props

  const [year, setYear] = useState(defaultYear)
  const [month, setMonth] = useState(defaultMonth)

  return {
    month,
    setMonth,
    setYear,
    year,
  }
}

export default useYearMonth
