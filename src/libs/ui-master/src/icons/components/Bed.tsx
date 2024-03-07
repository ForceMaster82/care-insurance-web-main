import * as React from 'react'

function SvgBed(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M10.667 29.333A2.667 2.667 0 008 32v29.333H2.667V32a8 8 0 018-8h42.666a8 8 0 018 8v29.333H56V32a2.667 2.667 0 00-2.667-2.667H10.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M58.667 48H5.333v-5.333h53.334V48zM14.667 8A2.667 2.667 0 0012 10.667v14.666H6.667V10.667a8 8 0 018-8h34.666a8 8 0 018 8v16H52v-16A2.667 2.667 0 0049.333 8H14.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M24 18.667v6.666h-5.333v-9.066a2.933 2.933 0 012.933-2.934h20.8a2.933 2.933 0 012.933 2.934V24H40v-5.333H24z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgBed
