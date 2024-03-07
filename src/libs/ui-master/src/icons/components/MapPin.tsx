import * as React from 'react'

function SvgMapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32.027 2.667c-13.39 0-24 11.419-24 25.195 0 3.872 1.423 7.77 3.367 11.33 1.958 3.585 4.555 7.026 7.155 10.035 5.2 6.018 10.63 10.553 11.634 11.377a2.905 2.905 0 001.844.665c.767 0 1.4-.301 1.843-.665 1.005-.824 6.433-5.359 11.634-11.377 2.6-3.01 5.197-6.45 7.156-10.036 1.943-3.559 3.367-7.457 3.367-11.329 0-13.776-10.61-25.195-24-25.195zm0 14.666a9.333 9.333 0 100 18.667 9.333 9.333 0 000-18.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgMapPin
