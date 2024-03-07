import * as React from 'react'

function SvgShortTime(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 2.667C15.8 2.667 2.667 15.8 2.667 32S15.8 61.333 32 61.333 61.333 48.2 61.333 32 48.2 2.667 32 2.667zm2.667 14.095a2.667 2.667 0 00-5.334 0v16h-8a2.667 2.667 0 000 5.333H32a2.667 2.667 0 002.667-2.666V16.762z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgShortTime
