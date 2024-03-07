import * as React from 'react'

function SvgAlertOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 13.491L9.865 53.334h44.27L32 13.49zm-2.564-6.366c1.117-2.012 4.01-2.012 5.128 0l26.214 47.184c1.086 1.955-.328 4.358-2.565 4.358H5.786c-2.236 0-3.65-2.403-2.564-4.358L29.436 7.125z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        d="M34.667 48a2.667 2.667 0 11-5.334 0 2.667 2.667 0 015.334 0zM30 42.667L28 28h8l-2 14.667h-4z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgAlertOutlined
