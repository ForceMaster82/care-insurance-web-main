import * as React from 'react'

function SvgClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M55.785 8.215a3.467 3.467 0 010 4.903L13.117 55.784a3.467 3.467 0 01-4.903-4.902L50.882 8.215a3.467 3.467 0 014.903 0z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M8.215 8.215a3.467 3.467 0 014.903 0l42.666 42.667a3.467 3.467 0 01-4.902 4.903L8.215 13.117a3.467 3.467 0 010-4.903z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgClose
