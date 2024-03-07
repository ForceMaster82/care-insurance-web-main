import * as React from 'react'

function SvgCoupon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M40.217 20.497a2.667 2.667 0 01.62 3.72L27.503 42.883a2.667 2.667 0 01-4.34-3.1l13.334-18.666a2.667 2.667 0 013.72-.62zM20 24a1.333 1.333 0 100 2.667A1.333 1.333 0 0020 24zm-6.667 1.333a6.667 6.667 0 1113.334 0 6.667 6.667 0 01-13.334 0zM44 37.333A1.333 1.333 0 1044 40a1.333 1.333 0 000-2.667zm-6.667 1.334a6.667 6.667 0 1113.334 0 6.667 6.667 0 01-13.334 0z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCoupon
