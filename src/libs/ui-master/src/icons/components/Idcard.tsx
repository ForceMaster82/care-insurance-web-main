import * as React from 'react'

function SvgIdcard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M2.667 10.933A2.933 2.933 0 015.6 8h52.8a2.933 2.933 0 012.933 2.933v42.134A2.933 2.933 0 0158.4 56H5.6a2.933 2.933 0 01-2.933-2.933V10.933zM8 13.333v37.334h48V13.333H8z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M13.333 24h16v16h-16V24zm5.333 5.333v5.334H24v-5.334h-5.334zM50.666 29.333h-16V24h16v5.333zM50.666 40h-16v-5.333h16V40z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgIdcard
