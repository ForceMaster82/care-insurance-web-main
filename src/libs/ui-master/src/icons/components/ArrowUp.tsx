import * as React from 'react'

function SvgArrowUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 4.8A3.2 3.2 0 0135.2 8v48a3.2 3.2 0 01-6.4 0V8A3.2 3.2 0 0132 4.8z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 4.8a3.2 3.2 0 012.263.937l21.333 21.334a3.2 3.2 0 11-4.525 4.525L32 12.526 12.93 31.596a3.2 3.2 0 11-4.526-4.525L29.737 5.737A3.2 3.2 0 0132 4.8z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgArrowUp
