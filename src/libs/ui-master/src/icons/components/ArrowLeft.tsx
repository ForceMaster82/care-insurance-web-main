import * as React from 'react'

function SvgArrowLeft(props: React.SVGProps<SVGSVGElement>) {
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
        d="M31.596 8.404a3.2 3.2 0 010 4.526L12.526 32l19.07 19.07a3.2 3.2 0 11-4.525 4.526L5.737 34.263a3.2 3.2 0 010-4.526L27.071 8.404a3.2 3.2 0 014.525 0z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgArrowLeft
