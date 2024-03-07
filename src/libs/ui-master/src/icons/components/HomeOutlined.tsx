import * as React from 'react'

function SvgHomeOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 9.104l-20.229 20.23h1.851a2.933 2.933 0 012.934 2.933V56H24V42.933A2.933 2.933 0 0126.933 40h10.134A2.933 2.933 0 0140 42.933V56h7.444V32.267a2.933 2.933 0 012.934-2.934h1.85L32 9.104zm-2.074-5.468a2.933 2.933 0 014.148 0L60.097 29.66c1.848 1.848.54 5.008-2.074 5.008h-5.245V58.4a2.933 2.933 0 01-2.934 2.933H37.6a2.933 2.933 0 01-2.933-2.933V45.333h-5.334V58.4a2.933 2.933 0 01-2.933 2.933H14.156a2.933 2.933 0 01-2.934-2.933V34.667H5.977c-2.613 0-3.922-3.16-2.074-5.008L29.926 3.636z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgHomeOutlined
