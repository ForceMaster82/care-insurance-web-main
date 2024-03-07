const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const defaultImageDomains = [
  'cdn.pixabay.com',
  'lh3.googleusercontent.com',
  'www.pixsy.com',
  'placeimg.com',
]

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    rootPath: __dirname,
  },
  async headers() {
    return [
      {
        headers: securityHeaders,
        // apply these headers to all routes in your application.
        source: '/:path*',
      },
    ]
  },
  images: {
    domains: defaultImageDomains,
  },
  poweredByHeader: false,
  redirects() {
    return [
      {
        destination: '/caregiving-rounds',
        permanent: true,
        source: '/',
      },
      {
        destination: '/settlements/waiting',
        permanent: true,
        source: '/settlements',
      },
      {
        destination: '/billings/waiting',
        permanent: true,
        source: '/billings',
      },
      {
        destination: '/statistic/monthly-reception',
        permanent: true,
        source: '/statistic',
      },
      {
        destination: '/message-statuses/caregiving-start',
        permanent: true,
        source: '/message-statuses',
      },
    ]
  },
  serverRuntimeConfig: {},
  swcMinify: true,
  webpack(config) {
    // fix for trying load .md fire in middleware and boot
    config.module.noParse = /.md$/

    // // alias
    config.resolve.alias['~'] = path.resolve(__dirname, 'src')
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
