import * as React from 'react'

function SvgEducationOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M0 6.4a3.2 3.2 0 013.2-3.2h57.6A3.2 3.2 0 0164 6.4v51.2a3.2 3.2 0 01-3.2 3.2H3.2A3.2 3.2 0 010 57.6V6.4zm6.4 3.2v44.8h51.2V9.6H6.4z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        d="M38.785 35.992l-10.346-5.643c-1.279-.698-2.839.228-2.839 1.685V44.45c0 1.526 1.695 2.442 2.971 1.606l10.346-6.771c1.214-.795 1.142-2.598-.132-3.292z"
        fill={props.fill}
      />
      <path
        clipRule="evenodd"
        d="M0 19.2A3.2 3.2 0 013.2 16h57.6a3.2 3.2 0 010 6.4H3.2A3.2 3.2 0 010 19.2z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgEducationOutlined
