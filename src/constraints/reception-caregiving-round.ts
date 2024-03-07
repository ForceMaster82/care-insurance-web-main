import {differenceInSeconds} from 'date-fns'
import {Constraints} from '../types'
import {ReceptionCaregivingRoundData} from '../types/form'
import {removeNotNumber} from '../utils/formatter'

export const receptionCaregivingRoundConstraints: Constraints<ReceptionCaregivingRoundData> =
  {
    'caregiverInfo.birthDate': {
      validate: (value) => {
        const message = '생년월일 입력이 잘못 되었습니다. 다시 입력해 주세요.'
        const matchResult = value.match(/(\d{4})-(\d{2})-(\d{2})/)

        if (!matchResult) {
          return message
        }

        const [, year, month, day] = matchResult

        const YEAR_MIN_VALUE = 1900
        const YEAR_MAX_VALUE = 2099
        const MONTH_MIN_VALUE = 1
        const MONTH_MAX_VALUE = 12
        const DAY_MIN_VALUE = 1
        const DAY_MAX_VALUE = 31

        const isYearValid =
          YEAR_MIN_VALUE <= Number(year) && Number(year) <= YEAR_MAX_VALUE
        const isMonthValid =
          MONTH_MIN_VALUE <= Number(month) && Number(month) <= MONTH_MAX_VALUE
        const isDayValid =
          DAY_MIN_VALUE <= Number(day) && Number(day) <= DAY_MAX_VALUE

        return (isYearValid && isMonthValid && isDayValid) || message
      },
    },
    'caregiverInfo.caregiverOrganizationId': {
      required: {
        message: '간병인 소속을 선택해 주세요.',
        value: true,
      },
    },
    'caregiverInfo.commissionFee': {
      required: {
        message: '간병인의 수수료를 입력해 주세요.',
        value: true,
      },
    },
    'caregiverInfo.dailyCaregivingCharge': {
      validate: {
        isGreaterThanZero: (value) => {
          const dailyCaregivingCharge = Number(removeNotNumber(value))

          return (
            dailyCaregivingCharge > 0 ||
            '간병인 일당은 0원을 초과하여 입력해 주세요.'
          )
        },
      },
    },
    'caregiverInfo.name': {
      required: {
        message: '간병인명을 입력해 주세요.',
        value: true,
      },
    },
    'caregiverInfo.phoneNumber': {
      required: {
        message: '간병인의 휴대폰 번호를 입력해 주세요.',
        value: true,
      },
    },
    endDateTime: {
      required: {
        message: '종료일시를 입력해 주세요.',
        value: true,
      },
    },
    startDateTime: {
      required: {
        message: '시작일시를 입력해 주세요.',
        value: true,
      },
      validate: {
        isBeforeOrSameAsEndDateTime: (value, formValues) => {
          if (Boolean(value) && Boolean(formValues.endDateTime)) {
            const startDateTime = new Date(value)
            const endDateTime = new Date(formValues.endDateTime)
            const secondDiff = differenceInSeconds(endDateTime, startDateTime)

            return (
              secondDiff >= 0 || '시작일시는 종료일시를 초과할 수 없습니다.'
            )
          }
          return true
        },
      },
    },
  }
