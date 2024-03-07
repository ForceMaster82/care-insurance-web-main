import React, {ReactElement, useState} from 'react'
import {Box, Textarea} from '@caredoc/ui-web'
import Modal from '../../../../components/Modal'
import StateCityPicker, {State} from '../../../../components/StateCityPicker'
import useStateCity from '../../../../hooks/use-state-city'
import {MAX_LENGTH} from '../../../../constraints/input'
import {HospitalRoomInfoData} from '../../../../types/form'
import Card from '../../../../components/Card'
import HospitalRoomInfoResource from '../../../../models/dto/hospital-room-info/Resource'

interface IProps {
  data: HospitalRoomInfoResource
  onClickClose: () => void
  onSubmit: (data: HospitalRoomInfoData) => void
}

const MODAL_HEIGHT = 600

const HospitalRoomInfoModal = (props: IProps): ReactElement => {
  const {onClickClose, onSubmit, data} = props

  const {city, state, setCity, setState} = useStateCity({
    defaultCity: data.city || null,
    defaultState: (data.state as State) || null,
  })
  const [hospitalAndRoom, setHospitalAndRoom] = useState(data.hospitalAndRoom)

  const submitDisabled =
    state === '세종특별자치시'
      ? !(state && hospitalAndRoom)
      : !(state && city && hospitalAndRoom)

  const handleOnSubmit = (): void => {
    if (submitDisabled) {
      return
    }
    onSubmit({
      city: city || '',
      hospitalAndRoom,
      state: state || '',
    })
    onClickClose()
  }

  return (
    <Modal
      disabled={submitDisabled}
      modalHeight={MODAL_HEIGHT}
      modalWidth="sm"
      onClose={onClickClose}
      onSubmit={handleOnSubmit}
      title="병실 정보"
    >
      <Box gap="sm">
        <Card.Item title="병원 지역">
          <StateCityPicker
            city={city}
            fixedWidth={false}
            onSelectCity={setCity}
            onSelectState={setState}
            state={state}
          />
        </Card.Item>
        <Card.Item fixedHeight={false} title="병원명">
          <Textarea
            maxLength={MAX_LENGTH.DEFAULT}
            onTextChange={setHospitalAndRoom}
            value={hospitalAndRoom}
          />
        </Card.Item>
      </Box>
    </Modal>
  )
}

export default HospitalRoomInfoModal
