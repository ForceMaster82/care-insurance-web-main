import * as React from 'react'

function SvgEducation(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M2.667 5.6A2.933 2.933 0 015.6 2.667h52.8A2.933 2.933 0 0161.333 5.6v52.8a2.933 2.933 0 01-2.933 2.933H5.6A2.933 2.933 0 012.667 58.4V5.6zM8 8v48h48V8H8z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        d="M39.333 36.949L28.88 30.875c-.96-.558-2.214.071-2.214 1.11v13.364c0 1.089 1.367 1.707 2.315 1.045l10.452-7.29c.796-.554.744-1.664-.101-2.155z"
        fill={props.fill}
      />
      <path
        clipRule="evenodd"
        d="M2.667 18.667A2.667 2.667 0 015.333 16h53.334a2.667 2.667 0 110 5.333H5.333a2.667 2.667 0 01-2.666-2.666z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgEducation
