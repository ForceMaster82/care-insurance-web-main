import * as React from 'react'

function SvgShortTimeOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zM2.667 32C2.667 15.8 15.8 2.667 32 2.667S61.333 15.8 61.333 32 48.2 61.333 32 61.333 2.667 48.2 2.667 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 14.095a2.667 2.667 0 012.667 2.667v18.667A2.667 2.667 0 0132 38.095H21.333a2.667 2.667 0 110-5.333h8v-16A2.667 2.667 0 0132 14.095z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgShortTimeOutlined
