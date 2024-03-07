import * as React from 'react'

function SvgChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M51.467 32a3.467 3.467 0 00-1.387-2.773l-32-24a3.467 3.467 0 10-4.16 5.546L42.222 32 13.92 53.227a3.467 3.467 0 004.16 5.546l32-24A3.467 3.467 0 0051.467 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgChevronRight
