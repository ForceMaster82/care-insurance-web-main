import * as React from 'react'

function SvgWrite(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M43.226 3.676a2.933 2.933 0 014.185-.037l12.95 12.95a2.933 2.933 0 01-.037 4.184L21.91 57.863a2.933 2.933 0 01-1.513.775L6.19 61.22c-2.016.367-3.777-1.394-3.41-3.41l2.583-14.209c.103-.57.373-1.096.775-1.512l37.09-38.414zM29.333 58.666A2.667 2.667 0 0132 56h26.666a2.667 2.667 0 010 5.333H32a2.667 2.667 0 01-2.667-2.666z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgWrite
