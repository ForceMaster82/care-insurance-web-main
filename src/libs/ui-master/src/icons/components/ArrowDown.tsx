import * as React from 'react'

function SvgArrowDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 59.2a3.2 3.2 0 003.2-3.2V8a3.2 3.2 0 00-6.4 0v48a3.2 3.2 0 003.2 3.2z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 59.2a3.2 3.2 0 002.263-.937l21.333-21.334a3.2 3.2 0 10-4.525-4.525L32 51.474 12.93 32.405a3.2 3.2 0 10-4.526 4.525l21.333 21.334A3.2 3.2 0 0032 59.2z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgArrowDown
