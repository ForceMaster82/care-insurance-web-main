import React, {ReactElement} from 'react'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import {colors, iconSizes, space} from '@caredoc/ui-master'

const globalCSS = `
  body {
    background-color: ${colors.bgSecondary};
  }
  input::-webkit-calendar-picker-indicator {
    width: ${iconSizes.sm}px;
    height: ${iconSizes.sm}px;
    padding-left: ${space.xxs}px;
    padding-right: ${space.xxs}px;
    cursor: pointer;
  }
`

class CustomDocument extends Document<DocumentProps> {
  /**
   * custom getInitialProps for server middleware and styled-components server rendering
   * @param context
   */
  static async getInitialProps(
    context: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
          enhanceComponent: (Component) => (props: any) =>
            sheet.collectStyles(<Component {...props} />),
        })
      const initialProps = await Document.getInitialProps(context)
      const styles = (
        <>
          {/* {initialProps.styles} */}
          {sheet.getStyleElement()}
        </>
      )

      return {
        ...initialProps,
        styles,
      }
    } finally {
      sheet.seal()
    }
  }

  render(): ReactElement {
    return (
      <Html lang="ko">
        <Head>
          <link href="/favicon.png" rel="icon" type="image/png" />
          <link href="/favicons/favicon.png" rel="icon" />
          <link
            as="font"
            crossOrigin=""
            href="https://static.prd.caredoc.kr/font/SpoqaHanSansNeo/SpoqaHanSansNeo-Bold.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            as="font"
            crossOrigin=""
            href="https://static.prd.caredoc.kr/font/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff2"
            rel="preload"
            type="font/woff2"
          />
          <link
            href="https://static.prd.caredoc.kr/font/SpoqaHanSansNeo/SpoqaHanSansNeo.css"
            rel="stylesheet"
          />
          {this.props.styles}
          <style>{globalCSS}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
