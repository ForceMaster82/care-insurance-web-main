import * as React from 'react'

function SvgCheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 3.2C16.094 3.2 3.2 16.094 3.2 32S16.094 60.8 32 60.8 60.8 47.906 60.8 32 47.906 3.2 32 3.2zm15.044 21.411a2.787 2.787 0 10-4.075-3.803L27.664 37.206l-6.633-7.108a2.787 2.787 0 10-4.075 3.804l8.671 9.29a2.787 2.787 0 004.075 0l17.342-18.58z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCheckCircle
