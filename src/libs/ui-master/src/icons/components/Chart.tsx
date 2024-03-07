import * as React from 'react'

function SvgChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M13.333 12h5.334a2.667 2.667 0 000-5.333h-7.734A2.933 2.933 0 008 9.6v48.8a2.933 2.933 0 002.933 2.933h42.134A2.933 2.933 0 0056 58.4V9.6a2.933 2.933 0 00-2.933-2.933h-7.734a2.667 2.667 0 000 5.333h5.334v44H13.333V12z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M18.667 24a2.667 2.667 0 012.666-2.667h21.334a2.667 2.667 0 010 5.334H21.333A2.667 2.667 0 0118.667 24zM18.667 34.667A2.667 2.667 0 0121.333 32h21.334a2.667 2.667 0 010 5.333H21.333a2.667 2.667 0 01-2.666-2.666zM18.667 45.333a2.667 2.667 0 012.666-2.666H32A2.667 2.667 0 1132 48H21.333a2.667 2.667 0 01-2.666-2.667zM17.333 5.6a2.933 2.933 0 012.934-2.933h23.466A2.933 2.933 0 0146.667 5.6v7.467A2.933 2.933 0 0143.733 16H20.267a2.933 2.933 0 01-2.934-2.933V5.6zM22.667 8v2.667h18.666V8H22.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgChart
