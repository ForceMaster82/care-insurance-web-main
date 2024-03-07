import {IComboBoxItemData} from '@caredoc/ui-web'
import CoverageListResource from '../models/dto/coverage/ListResource'
import {
  IExternalCaregivingManagerListData,
  IExternalCaregivingOrganizationListData,
  IInternalCaregivingManagerListData,
} from '../types/dto'

export const getCoverageOptions = (
  resources: CoverageListResource[],
): IComboBoxItemData<string>[] =>
  resources.map((item) => ({
    data: item.id,
    label: item.name,
  }))

export const getExternalCaregivingOrganizationOptions = (
  data: IExternalCaregivingOrganizationListData[],
): IComboBoxItemData<string>[] =>
  data
    .map((item) => ({
      data: item.id,
      label: item.name,
    }))
    .sort((a, b) => {
      if (a.label.toUpperCase() > b.label.toUpperCase()) {
        return 1
      }
      if (a.label.toUpperCase() < b.label.toUpperCase()) {
        return -1
      }
      return 0
    })

export const getCaregivingManagerOptions = (
  caregivingManagerData: (
    | IExternalCaregivingManagerListData
    | IInternalCaregivingManagerListData
  )[],
): {
  managingUserId: string
  name: string
  organizationId: string | null
}[] =>
  caregivingManagerData
    .map((item) => ({
      managingUserId: item.id,
      name: item.name,
      organizationId:
        'externalCaregivingOrganizationId' in item
          ? item.externalCaregivingOrganizationId
          : null,
    }))
    .sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1
      }
      if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1
      }
      return 0
    })
