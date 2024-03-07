import React, {PropsWithChildren} from 'react'
import {ThemeProvider as SCThemeProvider} from 'styled-components'
import {CustomTheme, defaultTheme} from '../theme'

export interface IThemeProvider {
  theme?: CustomTheme
}

const ThemeProvider = ({
  children,
  theme,
}: PropsWithChildren<IThemeProvider>) => {
  const targetTheme = theme || defaultTheme
  return <SCThemeProvider theme={targetTheme}>{children}</SCThemeProvider>
}

export default ThemeProvider
