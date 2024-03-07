import {isSameDay} from 'date-fns'
import CoverageListResource from '../ListResource'
import {ICoverageListData} from '~types/dto'

const responseData: ICoverageListData = {
  id: '01GP2QZ9SMRBFGJW69Z518XG79',
  lastModifiedDateTime: '2022-12-31',
  name: '질병 3 년형 (2022)',
  renewalType: 'THREE_YEAR',
  targetSubscriptionYear: 2022,
}

const coverageListResource = new CoverageListResource(responseData)

describe('가입 담보 resource model을 테스트한다.', () => {
  it('가입 담보 resource model은 ICoverageListDataInfoResource의 타입과 동일한 필드를 가진다.', () => {
    expect(coverageListResource.id).toBeDefined()
    expect(coverageListResource.name).toBeDefined()
    expect(coverageListResource.renewalType).toBeDefined()
    expect(coverageListResource.targetSubscriptionYear).toBeDefined()
    expect(coverageListResource.lastModifiedDateTime).toBeDefined()
  })
  it('가입 담보 resource model은 입력한 data 값과 동일한 값을 가진다.', () => {
    expect(coverageListResource.id).toBe(responseData.id)
    expect(coverageListResource.name).toBe(responseData.name)
    expect(coverageListResource.renewalType).toBe(responseData.renewalType)
    expect(coverageListResource.targetSubscriptionYear).toBe(
      responseData.targetSubscriptionYear,
    )
    expect(
      isSameDay(
        coverageListResource.lastModifiedDateTime,
        new Date(responseData.lastModifiedDateTime),
      ),
    ).toBe(true)
  })
})
