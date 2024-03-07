import {Box, Typography} from '@caredoc/ui-web'
import {useRouter} from 'next/router'
import React, {ReactChild, ReactElement, useCallback, useMemo} from 'react'
import {sizes} from '@caredoc/ui-master'
import {NavigationData, PageKey} from './types'

interface IProps {
  children: ReactChild
  currentPage: PageKey
  item: NavigationData
}

const HEIGHT = sizes.md

const NavigatorItem = (props: IProps): ReactElement => {
  const {children: pageTitle, item, currentPage} = props
  const route = useRouter()
  const isFocused = useMemo(
    () => item.id === currentPage,
    [currentPage, item.id],
  )

  const handleOnClickNavigatorItem = useCallback(() => {
    route.push(item.path)
  }, [item.path, route])

  return (
    <Box
      alignItems="center"
      height={HEIGHT}
      justifyContent="center"
      onClick={handleOnClickNavigatorItem}
      px="sm"
    >
      <Typography
        textColor={(isFocused && 'fontPrimary') || 'fontTertiary'}
        variant="body1"
      >
        {pageTitle}
      </Typography>
    </Box>
  )
}

export default NavigatorItem
