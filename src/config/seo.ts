/* eslint-disable camelcase */
import {DefaultSeoProps} from 'next-seo'

const url = 'https://care-insurance.caredoc.kr'
const title = '케어닥 - 케어 인슈어런스'

const SEO: DefaultSeoProps = {
  canonical: url,
  defaultTitle: title,
  facebook: {
    appId: '',
  },
  openGraph: {
    locale: 'ko_KR',
    site_name: title,
    title,
    type: 'website',
    url,
  },
}

export default SEO
