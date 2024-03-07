import {getDay} from 'date-fns'
import {DayOfWeek} from './types'
import {DAYS_OF_WEEK} from './useDatePicker'

export const filterDaysOfWeek = (
  dates: Date[],
  daysOfWeekToFilter: DayOfWeek[],
): Date[] => {
  return dates.filter(
    (date) => !daysOfWeekToFilter.includes(DAYS_OF_WEEK[getDay(date)].key),
  )
}
