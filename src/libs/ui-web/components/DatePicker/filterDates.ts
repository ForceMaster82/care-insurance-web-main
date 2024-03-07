import {isSameDay} from 'date-fns'

export const filterDates = (
  originalDates: Date[],
  datesToFilter: Date[],
): Date[] => {
  return originalDates.filter((date) =>
    datesToFilter.every((dateToFilter) => !isSameDay(dateToFilter, date)),
  )
}
