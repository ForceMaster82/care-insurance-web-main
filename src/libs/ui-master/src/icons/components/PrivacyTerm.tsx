import * as React from 'react'

function SvgPrivacyTerm(props: React.SVGProps<SVGSVGElement>) {
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
        d="M18.667 24.267a2.933 2.933 0 012.933-2.934h20.8a2.933 2.933 0 012.933 2.934v20.8A2.933 2.933 0 0142.4 48H21.6a2.933 2.933 0 01-2.933-2.933v-20.8zm5.333 2.4v16h16v-16H24z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 18.667a2.667 2.667 0 00-2.667 2.666H24a8 8 0 0116 0h-5.333A2.667 2.667 0 0032 18.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        d="M35.333 34.667a3.333 3.333 0 11-6.666 0 3.333 3.333 0 016.666 0z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgPrivacyTerm
