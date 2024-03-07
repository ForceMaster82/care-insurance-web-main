import * as React from 'react'

function SvgCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M61.057 10.823a3.467 3.467 0 01.12 4.901L25.62 53.057a3.466 3.466 0 01-5.02 0L2.823 34.391a3.467 3.467 0 015.02-4.782l15.268 16.03 33.045-34.697a3.467 3.467 0 014.901-.12z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCheck
