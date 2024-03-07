import {differenceInCalendarDays, formatISO, parseISO} from 'date-fns'
import {useCallback, useState} from 'react'

const TODAY = formatISO(Date.now(), {representation: 'date'})

interface IUseDateProps {
  /** 기본값은 당일입니다. */
  defaultDate?: string
  /** 오늘 이전의 일자를 입력 가능하게 한다면 true를 전달합니다. 기본값은 true 입니다. */
  enablePast?: boolean
}

type UseDate = {
  date: string
  updateDate: (value: string) => void
}

const useDate = ({
  enablePast = true,
  defaultDate = TODAY,
}: IUseDateProps): UseDate => {
  const [dateString, setDateString] = useState(defaultDate)

  const updateDateString = useCallback(
    (newDateString: string): void => {
      const isPast =
        differenceInCalendarDays(parseISO(newDateString), parseISO(TODAY)) < 0
      const isInvalidDate = !newDateString || (!enablePast && isPast)

      setDateString((prev) => (isInvalidDate && prev) || newDateString)
    },
    [enablePast],
  )

  return {
    date: dateString,
    updateDate: updateDateString,
  }
}

export default useDate
