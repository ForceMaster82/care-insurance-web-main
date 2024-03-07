import {differenceInHours, format} from 'date-fns'
import {isNumber} from 'lodash'
import {Period} from '../types'

/**
 *
 * @param _year 기본값은 현재 연도입니다.
 * @param _month 기본값은 현재 달입니다. 0(1월)~11(12월) 사이의 값을 입력하세요.
 */
export const getFirstDateOfMonth = (_year?: number, _month?: number): Date => {
  const now = new Date()
  const year = _year || now.getFullYear()
  const month = isNumber(_month) ? _month : now.getMonth()

  return new Date(year, month, 1)
}

/**
 *
 * @param _year 기본값은 현재 연도입니다.
 * @param _month 기본값은 현재 달입니다. 0(1월)~11(12월) 사이의 값을 입력하세요.
 */
export const getLastDateOfMonth = (_year?: number, _month?: number): Date => {
  const now = new Date()
  const year = _year || now.getFullYear()
  const month = isNumber(_month) ? _month : now.getMonth()

  return new Date(year, month + 1, 0)
}

export const getToday = (): Date => {
  const now = new Date()
  return now
}

export const getThisYear = (): number => {
  const now = new Date()

  return now.getFullYear()
}

export const getThisMonth = (): number => {
  const now = new Date()

  return now.getMonth()
}

export const getDayString = (date: Date): string => {
  const weekString = ['일', '월', '화', '수', '목', '금', '토']
  const dateIndex = date.getDay()
  return weekString[dateIndex]
}

/** @param date iso 8601 포맷으로 입력 **/
export const getIsoString = (date: string): string => {
  const currentDate = new Date(date)
  return currentDate.toISOString()

  // return formatISO(currentDate)
}

/**
 * @returns "yyyy-MM-dd'T'hh:mm:ss" 포맷의 문자열을 리턴합니다.
 */
export const formatDateTimeText = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss")
}

/**
 * @returns "yyyy-MM-dd HH:mm" 포맷의 문자열을 리턴합니다.
 */
export const formatDateTime = (date: Date): string => {
  return format(date, 'yyyy-MM-dd HH:mm')
}

/**
 * @returns "yyyy-MM-dd" 포맷의 문자열을 리턴합니다.
 */
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd')
}

export const getDateDistance = (date: Date, baseDate: Date): Period => {
  const DAY = 24

  const diffInHours = differenceInHours(date, baseDate, {
    roundingMethod: 'floor',
  })
  const diffInDays = Math.floor(diffInHours / DAY)
  const lastHours = diffInHours % DAY

  return {
    days: diffInDays,
    hours: lastHours,
  }
}
