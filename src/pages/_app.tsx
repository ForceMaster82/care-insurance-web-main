/* eslint-disable no-alert */
import React, {useState} from 'react'
import {AppContext, AppInitialProps, AppProps} from 'next/app'
import {NextComponentType} from 'next'
import Head from 'next/head'
import {DefaultSeo} from 'next-seo'
import {GlobalStyle, ThemeProvider} from '@caredoc/ui-web'
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {GlobalStoreProvider} from '../providers/GlobalStoreProvider'
import useQueryClientConfig from '../config/query-client'
import SEO from '~config/seo'

const Meta: React.FC = () => (
  <Head>
    <meta
      content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width"
      name="viewport"
    />
    <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
    <meta content="yes" name="mobile-web-app-capable" />
  </Head>
)

const CareInsuranceWebApp: NextComponentType<
  AppContext,
  AppInitialProps,
  AppProps
> = ({Component, pageProps}: AppProps) => {
  const queryClientConfig = useQueryClientConfig()
  const [queryClient] = useState(new QueryClient(queryClientConfig))

  return (
    <>
      <GlobalStyle />
      <GlobalStoreProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider>
              <Meta />
              <DefaultSeo {...SEO} />
              <Component {...pageProps} />
            </ThemeProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </GlobalStoreProvider>
    </>
  )
}

export default CareInsuranceWebApp
