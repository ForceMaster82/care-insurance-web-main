import * as React from 'react'

function SvgChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M12.533 32c0 1.091.514 2.119 1.387 2.773l32 24a3.467 3.467 0 004.16-5.546L21.778 32 50.08 10.773a3.467 3.467 0 10-4.16-5.546l-32 24A3.467 3.467 0 0012.533 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgChevronLeft
