import * as React from 'react'

function SvgCloseCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 2.667C15.8 2.667 2.667 15.8 2.667 32S15.8 61.333 32 61.333 61.333 48.2 61.333 32 48.2 2.667 32 2.667zm-8.781 16.78a2.667 2.667 0 10-3.771 3.772L28.228 32l-8.78 8.781a2.667 2.667 0 003.771 3.771L32 35.772l8.781 8.78a2.667 2.667 0 003.771-3.771L35.772 32l8.78-8.781a2.667 2.667 0 10-3.77-3.771L32 28.228l-8.781-8.78z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCloseCircle
