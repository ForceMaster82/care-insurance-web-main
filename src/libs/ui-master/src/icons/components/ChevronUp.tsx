import * as React from 'react'

function SvgChevronUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 12.533c1.029 0 2.005.457 2.663 1.248l26.667 32a3.467 3.467 0 11-5.326 4.438L32 21.415 7.997 50.22a3.467 3.467 0 11-5.327-4.438l26.667-32A3.467 3.467 0 0132 12.533z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgChevronUp
