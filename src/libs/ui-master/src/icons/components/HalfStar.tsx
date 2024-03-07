import * as React from 'react'

function SvgHalfStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M32 52.81l-14.668 7.946c-2.132 1.155-4.665-.629-4.296-3.026l2.79-18.133-11.99-11.99c-1.731-1.73-.707-4.694 1.723-4.987l16.439-1.978L29.337 4.74A2.896 2.896 0 0132 3.036v49.775z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgHalfStar
