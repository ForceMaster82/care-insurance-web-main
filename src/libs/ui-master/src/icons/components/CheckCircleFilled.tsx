import * as React from 'react'

function SvgCheckCircleFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 2.667C15.8 2.667 2.667 15.8 2.667 32S15.8 61.333 32 61.333 61.333 48.2 61.333 32 48.2 2.667 32 2.667zm15.264 21.839a2.667 2.667 0 00-3.862-3.678L27.555 37.467l-6.957-7.306a2.667 2.667 0 00-3.862 3.678l8.889 9.333a2.667 2.667 0 003.862 0l17.777-18.666z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCheckCircleFilled
