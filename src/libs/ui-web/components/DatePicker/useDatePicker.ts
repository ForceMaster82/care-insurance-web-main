import {useCallback, useMemo, useState} from 'react'
import {
  addMonths,
  differenceInCalendarDays,
  getDate,
  getDay,
  getMonth,
  getYear,
  isSameDay,
  subMonths,
} from 'date-fns'
import {IDate, IDateMatrixElement, IDatePickerProps, IDayOfWeek} from './types'
import getDateMatrix from './getDateMatrix'

export const DAYS_OF_WEEK: IDayOfWeek[] = [
  {key: 'sun', text: '일'},
  {key: 'mon', text: '월'},
  {key: 'tue', text: '화'},
  {key: 'wed', text: '수'},
  {key: 'thu', text: '목'},
  {key: 'fri', text: '금'},
  {key: 'sat', text: '토'},
]

type IUseDatePickerProps = Pick<
  IDatePickerProps,
  | 'initialMonth'
  | 'availableFrom'
  | 'availableUntil'
  | 'readonly'
  | 'disabled'
  | 'value'
  | 'disabledDates'
  | 'disabledDaysOfWeek'
>

type UseDatePicker = {
  dateMatrix: IDate[][]
  month: number
  next: () => void
  prev: () => void
  year: number
}

const useDatePicker = (props: IUseDatePickerProps): UseDatePicker => {
  const {
    initialMonth,
    readonly = false,
    disabled: _disabled = false,
    value: selectedDates = [],
    availableFrom,
    availableUntil,
    disabledDates = [],
    disabledDaysOfWeek = [],
  } = props

  const [month, setMonth] = useState(initialMonth || new Date())

  const isSelectableDate = useCallback(
    (date: Date) => {
      if (availableFrom && differenceInCalendarDays(availableFrom, date) > 0) {
        return false
      }
      if (
        availableUntil &&
        differenceInCalendarDays(date, availableUntil) > 0
      ) {
        return false
      }
      if (disabledDaysOfWeek.includes(DAYS_OF_WEEK[getDay(date)].key)) {
        return false
      }
      if (disabledDates.some((disabledDate) => isSameDay(disabledDate, date))) {
        return false
      }
      return true
    },
    [availableFrom, availableUntil, disabledDates, disabledDaysOfWeek],
  )

  const generateDatesOfWeek = useCallback(
    (week: IDateMatrixElement[]): IDate[] =>
      week.map(({date, show}) => {
        const {key: dayOfWeek} = DAYS_OF_WEEK[getDay(date)]
        const selectedIndex = selectedDates.findIndex((selectedDate) =>
          isSameDay(selectedDate, date),
        )
        const selected = selectedIndex > -1
        const isFirstSelected = selected && selectedIndex === 0
        const isLastSelected =
          selected && selectedIndex === selectedDates.length - 1
        const disabled = !isSelectableDate(date) || _disabled

        return {
          date,
          dayOfWeek,
          disabled,
          isFirstSelected,
          isLastSelected,
          readonly,
          selected,
          show,
          text: getDate(date),
        }
      }),
    [_disabled, isSelectableDate, readonly, selectedDates],
  )

  const dateMatrix = useMemo<IDate[][]>(
    () => getDateMatrix(month).map((week) => generateDatesOfWeek(week)),
    [month, generateDatesOfWeek],
  )

  const handleOnNext = (): void => {
    setMonth((month) => addMonths(month, 1))
  }

  const handleOnPrev = (): void => {
    setMonth((month) => subMonths(month, 1))
  }

  return {
    dateMatrix,
    month: getMonth(month) + 1,
    next: handleOnNext,
    prev: handleOnPrev,
    year: getYear(month),
  }
}

export default useDatePicker
