import {Box, Divider, TabItem} from '@caredoc/ui-web'
import React, {ReactElement, useCallback} from 'react'
import {useRouter} from 'next/router'
import {colors} from '@caredoc/ui-master'
import {SubPageTab} from '../types'

const TAB_WIDTH = 120

interface IProps<PathKey> {
  currentPage: PathKey
  replacePage?: boolean
  tabs: SubPageTab<PathKey>[]
}

const SubPageTabBar = <PathKey,>({
  tabs,
  currentPage,
  replacePage = false,
}: IProps<PathKey>): ReactElement => {
  const router = useRouter()
  const {id} = (router.query || {}) as {id?: string}

  const handleOnClickTab = useCallback(
    (tab: SubPageTab<PathKey>) => {
      if (replacePage) {
        router.replace(tab.path(id))
      } else {
        router.push(tab.path(id))
      }
    },
    [id, replacePage, router],
  )

  return (
    <Box>
      <Box flexDirection="row">
        {tabs.map((tab) => (
          <TabItem
            color="fontPrimary"
            focused={currentPage === tab.value}
            key={`sub-page-tab-${tab.value}`}
            minWidth={TAB_WIDTH}
            onClick={(): void => handleOnClickTab(tab)}
            size="sm"
            style={{backgroundColor: colors.bgSecondary}}
          >
            {tab.text}
          </TabItem>
        ))}
      </Box>
      <Divider color="borderTertiary" />
    </Box>
  )
}

export default SubPageTabBar
