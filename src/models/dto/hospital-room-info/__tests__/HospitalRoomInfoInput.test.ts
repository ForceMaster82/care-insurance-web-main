import HospitalRoomInfoInput from '../Input'
import HospitalRoomInfoResource from '../Resource'
import {HospitalRoomInfoData} from '~types/form'
import {IHospitalRoomInfo} from '~types/dto'

const dataInput: HospitalRoomInfoData = {
  city: '',
  hospitalAndRoom: '서울 삼성병원',
  state: '',
}

const dataGetterOutput: HospitalRoomInfoData = {
  city: '',
  hospitalAndRoom: '서울 삼성병원',
  state: '',
}

const inputGetterOutput: IHospitalRoomInfo = {
  city: null,
  hospitalAndRoom: '서울 삼성병원',
  state: null,
}

const hospitalRoomInfoResource = new HospitalRoomInfoResource({
  city: '서울',
  hospitalAndRoom: '강남 성모병원',
  state: '서울',
})

const hospitalRoomInfoInput = new HospitalRoomInfoInput(
  hospitalRoomInfoResource,
)

describe('HospitalRoomInfoInput model을 테스트 한다.', () => {
  it('hospitalRoomInfoInput 생성 constructor를 테스트한다.', () => {
    expect(hospitalRoomInfoInput.city).toBe(hospitalRoomInfoResource.city)
    expect(hospitalRoomInfoInput.hospitalAndRoom).toBe(
      hospitalRoomInfoResource.hospitalAndRoom,
    )
    expect(hospitalRoomInfoInput.state).toBe(hospitalRoomInfoResource.state)
  })

  it('HospitalRoomInfoInput model getter를 테스트한다.', () => {
    hospitalRoomInfoInput.data = dataInput
    expect(hospitalRoomInfoInput.data).toStrictEqual(dataGetterOutput)
    expect(hospitalRoomInfoInput.input).toStrictEqual(inputGetterOutput)
  })
})
