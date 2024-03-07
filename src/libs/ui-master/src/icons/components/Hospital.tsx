import * as React from 'react'

function SvgHospital(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M8 18.667h13.333v-5.334H5.6a2.933 2.933 0 00-2.933 2.934V58.4A2.933 2.933 0 005.6 61.333h52.8a2.933 2.933 0 002.933-2.933V16.267a2.933 2.933 0 00-2.933-2.934H42.667v5.334H56V56H8V18.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M28 42.667v18.666h-5.333V40.267a2.933 2.933 0 012.933-2.934h12.8a2.933 2.933 0 012.933 2.934v21.066H36V42.667h-8zM17.333 5.6a2.933 2.933 0 012.934-2.933h23.466A2.933 2.933 0 0146.667 5.6v23.467A2.933 2.933 0 0143.733 32H20.267a2.933 2.933 0 01-2.934-2.933V5.6zM22.667 8v18.667h18.666V8H22.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M25.333 14.667h13.334V20H25.333v-5.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M34.667 11.333v12h-5.334v-12h5.334z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgHospital
