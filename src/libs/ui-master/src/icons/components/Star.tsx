import * as React from 'react'

function SvgStar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M29.337 4.74c1.048-2.272 4.278-2.272 5.326 0l7.34 15.902 16.464 1.982c2.376.286 3.428 3.143 1.805 4.902L49.134 39.592l1.877 18.3c.24 2.345-2.242 4.002-4.315 2.88L32 52.81l-14.668 7.945c-2.132 1.155-4.665-.629-4.296-3.026l2.79-18.133-11.99-11.99c-1.731-1.73-.707-4.694 1.723-4.987l16.439-1.978L29.337 4.74z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgStar
