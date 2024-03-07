import {faker} from '@faker-js/faker'
import {OrganizationType} from '../../../../types'
import {IReceptionCaregivingManagerInfo} from '../../../../types/dto'
import ReceptionCaregivingManagerInfoResource from '../Resource'

const organizationType: OrganizationType = faker.helpers.arrayElement([
  'INTERNAL',
  'AFFILIATED',
  'ORGANIZATION',
] as OrganizationType[])

const data: IReceptionCaregivingManagerInfo = {
  managingUserId: faker.datatype.uuid(),
  organizationId:
    organizationType === 'INTERNAL' ? null : faker.datatype.uuid(),
  organizationType,
}

describe('model / Resource / ReceptionCaregivingManagerInfo', () => {
  const resource = new ReceptionCaregivingManagerInfoResource(data)

  it('construct', () => {
    expect(resource.organizationType).toBe(data.organizationType)
    expect(resource.organizationId).toBe(data.organizationId)
    expect(resource.managingUserId).toBe(data.managingUserId)
  })
})
