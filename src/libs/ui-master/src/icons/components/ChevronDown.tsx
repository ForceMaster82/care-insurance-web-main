import * as React from 'react'

function SvgChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 51.467a3.466 3.466 0 002.663-1.248l26.667-32a3.467 3.467 0 10-5.327-4.438L32 42.585 7.996 13.781a3.467 3.467 0 00-5.326 4.438l26.667 32A3.467 3.467 0 0032 51.467z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgChevronDown
