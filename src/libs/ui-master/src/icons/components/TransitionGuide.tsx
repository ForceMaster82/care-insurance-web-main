import * as React from 'react'

function SvgTransitionGuide(props: React.SVGProps<SVGSVGElement>) {
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
        d="M10.667 50.667A2.667 2.667 0 0113.333 48h37.334a2.667 2.667 0 010 5.333H13.333a2.667 2.667 0 01-2.666-2.666zM17.333 14.933A2.933 2.933 0 0120.267 12h23.466a2.933 2.933 0 012.934 2.933V22.4a2.933 2.933 0 01-2.934 2.933H20.267a2.933 2.933 0 01-2.934-2.933v-7.467zm5.334 2.4V20h18.666v-2.667H22.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgTransitionGuide
