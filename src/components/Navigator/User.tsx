/* eslint-disable no-magic-numbers */
import {Box, Icon, ListItem, Typography} from '@caredoc/ui-web'
import React, {ReactElement, useRef, useState} from 'react'
import {space} from '@caredoc/ui-master'
import {useRouter} from 'next/router'
import {useOnClickOutside} from '@caredoc/utils-web'
import {ACCOUNT_PATH} from '../../constants/route-paths'
import {removeToken} from '../../utils/manage-token'
import {formatDateTime} from '../../utils/date'
import {ORGANIZATION_TYPE} from '../../constants'
import useExternalCaregivingOrganization from '../../hooks/api/external-caregiving-organization/use-external-caregiving-organization'
import UserResource from '../../models/dto/user/Resource'

interface IProps {
  userResource?: UserResource
}

const User = ({userResource: user}: IProps): ReactElement => {
  const router = useRouter()

  const menuRef = useRef<HTMLDivElement>(null)

  const [menuVisible, setMenuVisible] = useState(false)

  const userOrganization = useExternalCaregivingOrganization({
    externalCaregivingOrganizationId: user?.organizationId,
  })

  const handleOnClickLogout = (): void => {
    // eslint-disable-next-line no-alert
    const logoutRequested = confirm('로그아웃 하시겠습니까?')

    if (!logoutRequested) {
      return
    }

    removeToken()
    router.push(ACCOUNT_PATH.LOGIN)
  }

  const handleOnClickPasswordChange = (): void => {
    router.push(ACCOUNT_PATH.PASSWORD_CHANGE)
  }

  useOnClickOutside(menuRef, () => setMenuVisible(false))

  return (
    <Box gap="xxs" justifyContent="center" position="relative">
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box alignItems="center" flexDirection="row" gap="xxs">
          <Typography textColor="fontPrimary" variant="subtitle1">
            {user?.name}
          </Typography>
          <Typography textColor="borderTertiary" variant="caption2">
            |
          </Typography>
          <Typography textColor="fontSecondary" variant="caption2">
            {(user?.organizationType === 'INTERNAL' &&
              ORGANIZATION_TYPE['INTERNAL']) ||
              userOrganization?.name}
          </Typography>
        </Box>
        <Box onClick={(): void => setMenuVisible((prev) => !prev)}>
          <Icon fill="fontTertiary" name="more" size="sm" />
        </Box>
      </Box>
      {user?.lastLoginDateTime && (
        <Typography textColor="fontTertiary" variant="caption4">
          최근 로그인: {formatDateTime(user.lastLoginDateTime)}
        </Typography>
      )}
      {menuVisible && (
        <Box
          elevation="elevation-2"
          position="absolute"
          ref={menuRef}
          right={space.xxs}
          top={space.lg}
          variant="shadow"
          width="fit-content"
        >
          <ListItem onClick={handleOnClickPasswordChange}>
            비밀번호 변경
          </ListItem>
          <ListItem onClick={handleOnClickLogout}>로그아웃</ListItem>
        </Box>
      )}
    </Box>
  )
}

export default User
