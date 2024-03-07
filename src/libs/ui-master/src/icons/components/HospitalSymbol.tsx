import * as React from 'react'

function SvgHospitalSymbol(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M5.6 2.667A2.933 2.933 0 002.667 5.6v52.8A2.933 2.933 0 005.6 61.333h52.8a2.933 2.933 0 002.933-2.933V5.6A2.933 2.933 0 0058.4 2.667H5.6zm29.067 20a2.667 2.667 0 10-5.334 0v6.666h-8a2.667 2.667 0 100 5.334h8v8a2.667 2.667 0 005.334 0v-8h8a2.667 2.667 0 100-5.334h-8v-6.666z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgHospitalSymbol
