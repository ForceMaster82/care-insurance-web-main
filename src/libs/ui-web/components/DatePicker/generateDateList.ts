import {addDays, compareAsc, differenceInCalendarDays} from 'date-fns'

export const generateDateList = (_startDate: Date, _endDate: Date): Date[] => {
  const [startDate, endDate] = [_startDate, _endDate].sort(compareAsc)
  const periodLength = differenceInCalendarDays(endDate, startDate) + 1

  return Array.from({length: periodLength}).map((_, idx) =>
    addDays(startDate, idx),
  )
}
