import {Box, Container, Divider} from '@caredoc/ui-web'
import {colors, sizes} from '@caredoc/ui-master'
import React, {ReactElement, useMemo, useState} from 'react'
import {useRouter} from 'next/dist/client/router'
import {
  BILLINGS_PATH,
  CAREGIVING_ROUNDS_PATH,
  DEFAULT_PATH,
  MESSAGE_STATUSES_PATH,
  RECEPTIONS_PATH,
  RECONCILIATION_PATH,
  SETTLEMENTS_PATH,
  STATISTIC_PATH,
} from '../../constants/route-paths'
import {getUserIdFromToken} from '../../utils/manage-token'
import useUserDetail from '../../hooks/api/user/use-user-detail'
import CaredocSymbol from '../svg/caredoc/Symbol'
import {NavigationData, PageKey} from './types'
import NavigatorItem from './NavigatorItem'
import User from './User'

interface IProps {
  currentPage: PageKey
}

const NAVIGATION_DATA: NavigationData[] = [
  {
    id: 'CAREGIVING',
    organizationCapability: ['INTERNAL', 'ORGANIZATION', 'AFFILIATED'],
    path: CAREGIVING_ROUNDS_PATH.INDEX,
    title: '고객(간병) 관리',
  },
  {
    id: 'RECEPTION',
    organizationCapability: ['INTERNAL'],
    path: RECEPTIONS_PATH.INDEX(),
    title: '접수 관리',
  },
  {
    id: 'SETTLEMENT',
    organizationCapability: ['INTERNAL'],
    path: SETTLEMENTS_PATH.WAITING(),
    title: '정산 관리',
  },
  {
    id: 'BILLING',
    organizationCapability: ['INTERNAL'],
    path: BILLINGS_PATH.WAITING(),
    title: '청구 관리',
  },
  {
    id: 'RECONCILIATION',
    organizationCapability: ['INTERNAL'],
    path: RECONCILIATION_PATH.INDEX,
    title: '정산대사',
  },
  {
    id: 'CARE_STATUS',
    organizationCapability: ['INTERNAL'],
    path: STATISTIC_PATH.MONTHLY_RECEPTION(),
    title: '보고(통계) 지표',
  },
  {
    id: 'NOTIFICATION',
    organizationCapability: ['INTERNAL'],
    path: MESSAGE_STATUSES_PATH.CAREGIVING_START(),
    title: '알림톡/비즈콜',
  },
]
const LOGO_SIZE = sizes.sm
const GNB_HEIGHT = sizes.xl

const Navigator = ({currentPage}: IProps): ReactElement => {
  const route = useRouter()

  const [userId] = useState(getUserIdFromToken())
  const user = useUserDetail({userId})

  const navigatorItems = useMemo(
    () =>
      NAVIGATION_DATA.filter(
        (item) =>
          user?.organizationType &&
          item.organizationCapability.includes(user.organizationType),
      ),
    [user?.organizationType],
  )

  const handleOnClickLogo = (): void => {
    route.push(DEFAULT_PATH)
  }

  return (
    <Box
      backgroundColor="bgPrimary"
      height={GNB_HEIGHT}
      justifyContent="center"
      width="100%"
    >
      <Container fluid py="xs" style={{height: '100%'}}>
        <Box flex={1} flexDirection="row" justifyContent="space-between">
          <Box alignItems="center" flexDirection="row" gap="lg">
            <Box onClick={handleOnClickLogo}>
              <CaredocSymbol
                fill={colors.primary}
                height={LOGO_SIZE}
                width={LOGO_SIZE}
              />
            </Box>
            <Box flexDirection="row">
              {navigatorItems.map((item) => (
                <NavigatorItem
                  currentPage={currentPage}
                  item={item}
                  key={`insurance-erp-GNB-${item.id}-${item.title}`}
                >
                  {item.title}
                </NavigatorItem>
              ))}
            </Box>
          </Box>
          <User userResource={user} />
        </Box>
      </Container>
      <Divider />
    </Box>
  )
}

export default Navigator
