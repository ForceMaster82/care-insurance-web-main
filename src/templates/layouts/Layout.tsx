/* eslint-disable unicorn/filename-case */
/* eslint-disable no-alert */
import {zIndices} from '@caredoc/ui-master'
import {Box, Divider} from '@caredoc/ui-web'
import React, {ReactElement, ReactNode} from 'react'
import styled from 'styled-components'
import {PageKey} from '../../components/Navigator/types'
import Footer from '~components/Footer'
import Navigator from '~components/Navigator'

interface IProps {
  children: ReactNode | undefined
  currentPage: PageKey
  renderSubNavigator?: () => ReactElement
}

const Layout = (props: IProps): ReactElement => {
  const {children, currentPage, renderSubNavigator} = props

  return (
    <Root>
      <Header elevation="elevation-5" variant="shadow">
        <Navigator currentPage={currentPage} />
        {renderSubNavigator && (
          <>
            <Divider color="borderPrimary" />
            {renderSubNavigator()}
          </>
        )}
      </Header>
      <Box height="100%" overflowX="hidden">
        <Box flex={1}>{children}</Box>
        <Footer />
      </Box>
    </Root>
  )
}

export default Layout

const Root = styled(Box)`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const Header = styled(Box)`
  z-index: ${zIndices.navigation};
  position: sticky;
  top: 0;
`
