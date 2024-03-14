import {Box, ComboBox, IComboBoxItemData, Typography} from '@caredoc/ui-web'
import React, {ReactElement} from 'react'
import {SEARCH_COMBOBOX_WIDTH} from '../constants'
import {getThisYear} from '../utils/date'
import SearchFilterTitleWrapper from './SearchFilterTitleWrapper'

const yearRange = {end: getThisYear(), start: 2023}

const yearList: IComboBoxItemData<number>[] = Array.from(
  {length: yearRange.end - yearRange.start + 1},
  (_, i) => ({
    data: yearRange.start + i,
    label: `${yearRange.start + i}년`,
  }),
)
const monthList: IComboBoxItemData<number>[] = Array.from(
  {length: 12},
  (_, i) => ({
    data: i + 1,
    label: `${i + 1}월`,
  }),
)

interface IYearMonthPickerProps {
  month?: number
  onSelectMonth: (value: number) => void
  onSelectYear: (value: number) => void
  title: string
  year?: number
}

const YearMonthPicker = (props: IYearMonthPickerProps): ReactElement => {
  const {title, year, month, onSelectMonth, onSelectYear} = props
  return (
    <SearchFilterTitleWrapper title={title}>
      <Box alignItems="center" flexDirection="row" gap="xs">
        <Box width={SEARCH_COMBOBOX_WIDTH}>
          <ComboBox items={yearList} onSelect={onSelectYear} value={year} />
        </Box>
        <Box width={SEARCH_COMBOBOX_WIDTH}>
          <ComboBox items={monthList} onSelect={onSelectMonth} value={month} />
        </Box>
      </Box>
      <Box>
          <Typography textColor="fontSecondary">
              {year}년 {month} 월 현황입니다.
          </Typography>
      </Box>
    </SearchFilterTitleWrapper>
  )
}

export default YearMonthPicker
