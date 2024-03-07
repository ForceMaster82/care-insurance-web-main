import {
  addDays,
  addWeeks,
  differenceInWeeks,
  endOfMonth,
  endOfWeek,
  getDay,
  getMonth,
  startOfMonth,
  startOfWeek,
  subWeeks,
} from 'date-fns'
import {IDateMatrixElement} from './types'

enum DaysOfWeek {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

const WEEK_LENGTH = 7
const FIRST_DAY_OF_WEEK = DaysOfWeek.SUNDAY
const LAST_DAY_OF_WEEK = DaysOfWeek.SATURDAY

const getDateMatrix = (
  currentDate: Date,
  fillDate = false,
): IDateMatrixElement[][] => {
  let startDateOfMonth = startOfMonth(currentDate)
  let endDateOfMonth = endOfMonth(currentDate)

  if (
    getDay(startDateOfMonth) === FIRST_DAY_OF_WEEK &&
    getDay(startDateOfMonth) > 0
  ) {
    startDateOfMonth = subWeeks(startDateOfMonth, 1)
  }
  if (
    getDay(endDateOfMonth) === LAST_DAY_OF_WEEK &&
    getDay(endDateOfMonth) > 0
  ) {
    endDateOfMonth = addWeeks(endDateOfMonth, 1)
  }

  const startDateOfWeek = startOfWeek(startDateOfMonth)
  const endDateOfWeek = endOfWeek(endDateOfMonth)
  const weekDiff = differenceInWeeks(endDateOfWeek, startDateOfWeek, {
    roundingMethod: 'ceil',
  })

  return Array.from({length: weekDiff})
    .fill(0)
    .map((_, weekIndex) =>
      Array.from({length: WEEK_LENGTH})
        .fill(0)
        .map((_, dayIndex) =>
          addDays(startDateOfWeek, weekIndex * WEEK_LENGTH + dayIndex),
        )
        .map((date) => ({
          date,
          isFirstWeek: weekIndex === 0,
          isLastWeek: weekIndex === weekDiff - 1,
          show: fillDate || getMonth(date) === getMonth(currentDate),
        })),
    )
}

export default getDateMatrix
