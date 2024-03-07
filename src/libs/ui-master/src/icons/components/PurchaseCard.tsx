import * as React from 'react'

function SvgPurchaseCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M2.667 10.933A2.933 2.933 0 015.6 8h52.8a2.933 2.933 0 012.933 2.933v42.134A2.933 2.933 0 0158.4 56H5.6a2.933 2.933 0 01-2.933-2.933V10.933zM8 13.333v37.334h48V13.333H8z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M5.333 21.333A2.667 2.667 0 018 18.667h49.778a2.667 2.667 0 010 5.333H8a2.667 2.667 0 01-2.667-2.667zM34 34.667A2.667 2.667 0 1034 40a2.667 2.667 0 000-5.333zm-8 2.666a8 8 0 1116 0 8 8 0 01-16 0z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M43.841 34.667c-.45 0-.868.098-1.237.268a2.81 2.81 0 00-1.105.906 2.667 2.667 0 11-4.332-3.111 8.144 8.144 0 013.203-2.638 8.274 8.274 0 013.471-.759c4.432 0 8.159 3.509 8.159 8 0 4.492-3.727 8-8.159 8a8.274 8.274 0 01-3.47-.758 8.144 8.144 0 01-3.204-2.638 2.667 2.667 0 014.332-3.112 2.81 2.81 0 001.105.907c.369.17.786.268 1.237.268 1.635 0 2.826-1.267 2.826-2.667s-1.191-2.666-2.826-2.666z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgPurchaseCard
