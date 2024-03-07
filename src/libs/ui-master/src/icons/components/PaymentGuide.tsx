import * as React from 'react'

function SvgPaymentGuide(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M8 5.6a2.933 2.933 0 012.933-2.933h42.134A2.933 2.933 0 0156 5.6v52.8a2.933 2.933 0 01-2.933 2.933H10.933A2.933 2.933 0 018 58.4V5.6zM13.333 8v48h37.334V8H13.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M10.667 50.667A2.667 2.667 0 0113.333 48h37.334a2.667 2.667 0 010 5.333H13.333a2.667 2.667 0 01-2.666-2.666zM24.956 16.027a2.667 2.667 0 013.017 2.262l.552 3.866.867-4.047a2.667 2.667 0 015.216 0l.867 4.047.552-3.866a2.667 2.667 0 015.28.755L38.64 37.71a2.667 2.667 0 01-5.248.181L32 31.394l-1.392 6.498a2.667 2.667 0 01-5.248-.181l-2.666-18.667a2.667 2.667 0 012.262-3.017z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M17.333 25.524A2.667 2.667 0 0120 22.857h5.333a2.667 2.667 0 110 5.333H20a2.667 2.667 0 01-2.667-2.666zM36 25.524a2.667 2.667 0 012.667-2.667H44a2.667 2.667 0 110 5.333h-5.333A2.667 2.667 0 0136 25.524z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgPaymentGuide
