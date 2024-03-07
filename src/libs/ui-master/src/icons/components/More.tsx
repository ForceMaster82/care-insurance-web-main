import * as React from 'react'

function SvgMore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M37.333 10.667a5.333 5.333 0 11-10.666 0 5.333 5.333 0 0110.666 0zM37.333 32a5.333 5.333 0 11-10.666 0 5.333 5.333 0 0110.666 0zM37.333 53.333a5.333 5.333 0 11-10.666 0 5.333 5.333 0 0110.666 0z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgMore
