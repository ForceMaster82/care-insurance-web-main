import * as React from 'react'

function SvgPlay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M10.667 5.807c0-2.286 2.498-3.694 4.453-2.509l39.253 23.79c1.792 1.086 1.9 3.647.205 4.88L15.325 60.515c-1.938 1.41-4.658.025-4.658-2.372V5.807z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgPlay
