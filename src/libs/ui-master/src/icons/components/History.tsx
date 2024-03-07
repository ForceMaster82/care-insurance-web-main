import * as React from 'react'

function SvgHistory(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M8 5.6a2.933 2.933 0 012.933-2.933h42.134A2.933 2.933 0 0156 5.6v52.8a2.933 2.933 0 01-2.933 2.933H10.933A2.933 2.933 0 018 58.4V5.6zM13.333 8v48h37.334V8H13.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M18.667 18.667A2.667 2.667 0 0121.333 16h21.334a2.667 2.667 0 010 5.333H21.333a2.667 2.667 0 01-2.666-2.666zM18.667 32a2.667 2.667 0 012.666-2.667h21.334a2.667 2.667 0 010 5.334H21.333A2.667 2.667 0 0118.667 32zM18.667 45.333a2.667 2.667 0 012.666-2.666h21.334a2.667 2.667 0 010 5.333H21.333a2.667 2.667 0 01-2.666-2.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgHistory
