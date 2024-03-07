export interface IDatePickerProps {
  availableFrom?: Date
  availableUntil?: Date
  disabled?: boolean
  disabledDates?: Date[]
  disabledDaysOfWeek?: DayOfWeek[]
  /** 최초 렌더링 시 보여주는 연도/월을 설정할 때 사용합니다.  */
  initialMonth?: Date
  onChange?: (value: Date[]) => void
  onClickDate?: (value: Date) => void
  onValidate?: (value: Date) => boolean | undefined
  readonly?: boolean
  value?: Date[]
}

export interface IIndicatorIconProps {
  onClick?: () => void
  type: 'prev' | 'next'
}

export interface IDayOfWeekProps {
  disabled?: boolean
  value: DayOfWeek
}

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface IDayOfWeek {
  key: DayOfWeek
  text: string
}

export interface IDateText {
  dayOfWeek: DayOfWeek
  disabled?: boolean
  selected: boolean
}

export interface IDate {
  date: Date
  dayOfWeek: DayOfWeek
  disabled: boolean
  isFirstSelected: boolean
  isLastSelected: boolean
  readonly: boolean
  selected: boolean
  show: boolean
  text: number
}

export interface IDateMatrixElement {
  date: Date
  isFirstWeek: boolean
  isLastWeek: boolean
  show: boolean
}
