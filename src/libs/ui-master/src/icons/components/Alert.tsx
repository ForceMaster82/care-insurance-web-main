import * as React from 'react'

function SvgAlert(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M34.59 7.124c-1.117-2.011-4.01-2.011-5.128 0L3.248 54.31c-1.086 1.955.328 4.358 2.565 4.358H58.24c2.236 0 3.65-2.403 2.564-4.358L34.59 7.124zM28.026 28l2 14.666h4l2-14.666h-8zm4 22.666a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgAlert
