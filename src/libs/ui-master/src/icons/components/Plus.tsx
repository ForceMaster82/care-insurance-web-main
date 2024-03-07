import * as React from 'react'

function SvgPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M4.533 32A3.467 3.467 0 018 28.533h48a3.467 3.467 0 010 6.934H8A3.467 3.467 0 014.533 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 7.2a3.467 3.467 0 013.467 3.466v42.667a3.467 3.467 0 11-6.934 0V10.667A3.467 3.467 0 0132 7.2z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgPlus
