import * as React from 'react'

function SvgChartOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M14.342 12.243h5.73a2.787 2.787 0 100-5.575h-6.659a4.645 4.645 0 00-4.645 4.646v44.84a4.645 4.645 0 004.645 4.646h37.161a4.645 4.645 0 004.645-4.645V11.314a4.645 4.645 0 00-4.645-4.646h-6.658a2.787 2.787 0 000 5.575h5.73v42.983H14.341V12.243z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M18.987 5.987A2.787 2.787 0 0121.774 3.2h20.44A2.787 2.787 0 0145 5.987v6.937a2.787 2.787 0 01-2.787 2.787H21.774a2.787 2.787 0 01-2.787-2.787V5.987zm5.575 2.787v1.363h14.864V8.774H24.561zM18.058 24.568a2.787 2.787 0 012.787-2.787h22.297a2.787 2.787 0 010 5.574H20.845a2.787 2.787 0 01-2.787-2.787zM18.058 35.468a2.787 2.787 0 012.787-2.787h22.297a2.787 2.787 0 110 5.575H20.845a2.787 2.787 0 01-2.787-2.788zM18.058 45.873a2.787 2.787 0 012.787-2.787h11.149a2.787 2.787 0 010 5.575H20.845a2.787 2.787 0 01-2.787-2.788z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgChartOutlined
