import {Colors, CustomColorKey} from '@caredoc/ui-master'
import {isSameDay} from 'date-fns'
import React, {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
} from 'react'
import Box from '../Box'
import Icon from '../Icon'
import Typography from '../Typography'
import {filterDates} from './filterDates'
import {filterDaysOfWeek} from './filterDaysOfWeek'
import {generateDateList} from './generateDateList'
import {
  DateCell,
  DateTextWrapper,
  IndicatorIconWrapper,
  Root,
  SelectedDateBackground,
  SelectedDateSide,
  TodayText,
} from './styles'
import {
  IDate,
  IDatePickerProps,
  IDateText,
  IDayOfWeekProps,
  IIndicatorIconProps,
} from './types'
import useDatePicker, {DAYS_OF_WEEK} from './useDatePicker'

const IndicatorIcon = ({type, onClick}: IIndicatorIconProps): ReactElement => (
  <IndicatorIconWrapper onClick={onClick}>
    <Icon
      fill="fontSecondary"
      name={(type === 'prev' && 'chevron-left') || 'chevron-right'}
    />
  </IndicatorIconWrapper>
)

const DayOfWeek = ({
  disabled,
  value,
  children,
}: PropsWithChildren<IDayOfWeekProps>): ReactElement => {
  const textColor = useMemo<CustomColorKey>(
    () =>
      (disabled && 'fontTertiary') ||
      (value === 'sun' && 'primary') ||
      (value === 'sat' && 'information') ||
      'fontPrimary',
    [disabled, value],
  )

  return (
    <Box
      alignItems="center"
      disabled={disabled}
      flex={1}
      justifyContent="center"
    >
      <Typography textColor={textColor} variant="body2">
        {children}
      </Typography>
    </Box>
  )
}

const DateText = ({
  disabled,
  children,
  selected,
  dayOfWeek,
}: PropsWithChildren<IDateText>): ReactElement => (
  <DateTextWrapper>
    <Typography
      textColor={
        (disabled && 'fontTertiary') ||
        (selected && 'fontWhite') ||
        (dayOfWeek === 'sun' && 'primary') ||
        (dayOfWeek === 'sat' && 'information') ||
        'fontPrimary'
      }
      variant="body1"
    >
      {children}
    </Typography>
  </DateTextWrapper>
)

const DatePicker = (props: IDatePickerProps): ReactElement => {
  const {
    initialMonth,
    availableFrom,
    availableUntil,
    disabled,
    readonly,
    value = [],
    onChange,
    onClickDate,
    onValidate,
    disabledDates = [],
    disabledDaysOfWeek = [],
  } = props

  const {next, prev, year, month, dateMatrix} = useDatePicker({
    availableFrom,
    availableUntil,
    disabled,
    disabledDates,
    disabledDaysOfWeek,
    initialMonth,
    readonly,
    value,
  })

  const handleOnClickDate = useCallback(
    (date: Date): void => {
      if (onValidate?.(date) === false) {
        return
      }

      onClickDate?.(date)

      if (value.length === 1) {
        const newSelectedDates = filterDates(
          filterDaysOfWeek(
            generateDateList(value[0], date),
            disabledDaysOfWeek,
          ),
          disabledDates,
        )
        onChange?.(newSelectedDates)
      } else {
        onChange?.([date])
      }
    },
    [
      disabledDates,
      disabledDaysOfWeek,
      onChange,
      onClickDate,
      onValidate,
      value,
    ],
  )

  const renderWeek = (week: IDate[]): ReactElement => (
    <Box flexDirection="row">
      {week.map(
        (
          {
            disabled,
            date,
            text,
            selected,
            isFirstSelected,
            isLastSelected,
            show,
            dayOfWeek,
          },
          index,
        ) => {
          const selectedDateSideColor: CustomColorKey | keyof Colors =
            (disabled && 'n400') || 'primary'
          const selectedDateBackgroundColor: keyof Colors =
            (selected && disabled && 'n400') || 'r100'

          return (
            <DateCell
              alignItems="center"
              flex={1}
              justifyContent="center"
              key={`datepicker-date-${index}`}
              onClick={(): void =>
                show && !disabled ? handleOnClickDate(date) : undefined
              }
              selected={selected}
            >
              {show && (
                <>
                  {selected && (
                    <SelectedDateBackground
                      color={selectedDateBackgroundColor}
                      isFirst={isFirstSelected}
                      isLast={isLastSelected}
                    />
                  )}
                  {(isFirstSelected || isLastSelected) && (
                    <SelectedDateSide color={selectedDateSideColor} />
                  )}
                  <DateText
                    dayOfWeek={dayOfWeek}
                    disabled={disabled}
                    selected={selected}
                  >
                    {text}
                  </DateText>
                  {!selected && isSameDay(date, Date.now()) && (
                    <TodayText variant="caption2">오늘</TodayText>
                  )}
                </>
              )}
            </DateCell>
          )
        },
      )}
    </Box>
  )

  return (
    <Root>
      <Box gap="md">
        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
        >
          <IndicatorIcon onClick={prev} type="prev" />
          <Typography
            textColor={(disabled && 'fontTertiary') || 'fontPrimary'}
            variant="subtitle1"
          >
            {year}년 {month}월
          </Typography>
          <IndicatorIcon onClick={next} type="next" />
        </Box>
        <Box flexDirection="row" justifyContent="center">
          {DAYS_OF_WEEK.map(({key, text}) => (
            <DayOfWeek
              disabled={disabledDaysOfWeek.includes(key) || disabled}
              key={`date-picker-day-of-week-${key}`}
              value={key}
            >
              {text}
            </DayOfWeek>
          ))}
        </Box>
        <Box gap="xs">
          {dateMatrix.map((week, index) => (
            <Box key={`datepicker-week-${index}`}>{renderWeek(week)}</Box>
          ))}
        </Box>
      </Box>
    </Root>
  )
}

export default DatePicker
