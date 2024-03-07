import {OrganizationType} from '../../types'

export type PageKey =
  | 'CAREGIVING'
  | 'RECEPTION'
  | 'SETTLEMENT'
  | 'BILLING'
  | 'RECONCILIATION'
  | 'CARE_STATUS'
  | 'NOTIFICATION'

export interface NavigationData {
  id: PageKey
  organizationCapability: OrganizationType[]
  path: string
  title: string
}
