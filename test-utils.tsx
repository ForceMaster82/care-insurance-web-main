import {ThemeProvider} from '@caredoc/ui-web'
import {render, RenderOptions, RenderResult} from '@testing-library/react'
import React, {PropsWithChildren, ReactElement} from 'react'

const AllTheProviders = ({children}: PropsWithChildren<unknown>) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

const customRender = (
  ui: ReactElement,
  options?: RenderOptions,
): RenderResult => render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}
