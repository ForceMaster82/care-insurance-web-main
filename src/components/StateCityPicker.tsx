import {Box, ComboBox, IComboBoxItemData, Typography} from '@caredoc/ui-web'
import React, {ReactElement, useMemo} from 'react'
import stateCityListJson from '../database/state-city-list.json'

const COMBOBOX_WIDTH = 160

type StateCityListJson = typeof stateCityListJson
export type State = keyof StateCityListJson

interface IStateCityPickerProps {
  city?: string | null
  /** 기본값은 true 입니다. false 일 때 남는 공간을 가득 채웁니다. */
  fixedWidth?: boolean
  onSelectCity: (value: string) => void
  onSelectState: (value: State) => void
  state?: State | null
  title?: string
}

const stateCityList = Object.entries(stateCityListJson).sort(([, a], [, b]) => {
  if (a.code > b.code) {
    return 1
  }
  if (a.code < b.code) {
    return -1
  }
  return 0
})
const stateList: IComboBoxItemData<State>[] = stateCityList.map(([state]) => ({
  data: state as State,
  label: state,
}))

const StateCityPicker = (props: IStateCityPickerProps): ReactElement => {
  const {
    fixedWidth = true,
    state,
    city,
    onSelectState,
    onSelectCity,
    title,
  } = props

  const cityList = useMemo<IComboBoxItemData<string>[]>(() => {
    if (!state) {
      return []
    }
    const _cityList = (stateCityListJson[state].cityList as string[]).sort()

    return _cityList.map((city) => ({data: city, label: city}))
  }, [state])

  return (
    <Box alignItems="center" flexDirection="row" gap="sm">
      {title && (
        <>
          <Typography variant="body3">{title}</Typography>
          <Typography textColor="fontTertiary" variant="body4">
            |
          </Typography>
        </>
      )}
      <Box flex={1} flexDirection="row" gap="xs">
        <Box
          flex={(!fixedWidth && 1) || undefined}
          width={(fixedWidth && COMBOBOX_WIDTH) || undefined}
        >
          <ComboBox<State>
            items={stateList}
            onSelect={onSelectState}
            selectionText="시/도"
            value={state || undefined}
          />
        </Box>
        <Box
          flex={(!fixedWidth && 1) || undefined}
          width={(fixedWidth && COMBOBOX_WIDTH) || undefined}
        >
          <ComboBox<string>
            disabled={!state || cityList.length === 0}
            items={cityList}
            onSelect={onSelectCity}
            selectionText="시/군/구"
            value={city || undefined}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default StateCityPicker
