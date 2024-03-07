import * as React from 'react'

function SvgCamera(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M22.167 5.333a2.933 2.933 0 00-2.638 1.651l-2.531 5.207H5.6a2.933 2.933 0 00-2.933 2.933v40.61A2.933 2.933 0 005.6 58.666h52.8a2.933 2.933 0 002.933-2.934v-40.61a2.933 2.933 0 00-2.933-2.932H47.002l-2.53-5.207a2.933 2.933 0 00-2.639-1.65H22.167zM32 24c-5.891 0-10.667 4.776-10.667 10.667 0 5.89 4.776 10.666 10.667 10.666s10.667-4.775 10.667-10.666S37.89 24 32 24z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCamera
