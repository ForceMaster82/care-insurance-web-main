import * as React from 'react'

function SvgPersonOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M8.25 56h47.5C54.106 47.328 44.565 40 32 40S9.893 47.328 8.25 56zm-5.58 2.358C2.878 44.732 16.497 34.667 32 34.667c15.502 0 29.121 10.065 29.331 23.69a2.931 2.931 0 01-2.931 2.976H5.6a2.931 2.931 0 01-2.93-2.975zM32 8a9.333 9.333 0 100 18.667A9.333 9.333 0 0032 8zm-14.667 9.333c0-8.1 6.567-14.666 14.667-14.666s14.667 6.566 14.667 14.666C46.667 25.433 40.1 32 32 32s-14.667-6.567-14.667-14.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgPersonOutlined
