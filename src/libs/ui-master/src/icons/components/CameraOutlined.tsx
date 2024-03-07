import * as React from 'react'

function SvgCameraOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M23.669 10.667l-2.531 5.206a2.933 2.933 0 01-2.638 1.65H8v35.81h48v-35.81H45.5a2.933 2.933 0 01-2.638-1.65l-2.53-5.206H23.668zm-4.14-3.683a2.933 2.933 0 012.638-1.65h19.666c1.123 0 2.147.64 2.638 1.65l2.531 5.207H58.4a2.933 2.933 0 012.933 2.933v40.61a2.933 2.933 0 01-2.933 2.933H5.6a2.933 2.933 0 01-2.933-2.934v-40.61A2.933 2.933 0 015.6 12.192h11.398l2.53-5.207z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 28a6.667 6.667 0 100 13.333A6.667 6.667 0 0032 28zm-12 6.667c0-6.628 5.373-12 12-12s12 5.372 12 12c0 6.627-5.373 12-12 12s-12-5.373-12-12z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCameraOutlined
