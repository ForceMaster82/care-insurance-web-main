import * as React from 'react'

function SvgArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M4.8 32A3.2 3.2 0 018 28.8h48a3.2 3.2 0 010 6.4H8A3.2 3.2 0 014.8 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32.404 8.404a3.2 3.2 0 014.525 0l21.334 21.333a3.2 3.2 0 010 4.526L36.929 55.596a3.2 3.2 0 11-4.525-4.525L51.474 32 32.405 12.93a3.2 3.2 0 010-4.526z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgArrowRight
