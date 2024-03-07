import * as React from 'react'

function SvgWelfareToolOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M2.774 19.482A2.933 2.933 0 015.656 16h52.688a2.933 2.933 0 012.882 3.482L53.709 58.95a2.933 2.933 0 01-2.882 2.384H13.173c-1.408 0-2.618-1-2.882-2.384L2.774 19.482zm5.782 1.851L15.159 56h33.682l6.603-34.667H8.556z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 8a9.333 9.333 0 00-9.333 9.333V28a2.667 2.667 0 11-5.334 0V17.333c0-8.1 6.567-14.666 14.667-14.666s14.667 6.566 14.667 14.666V28a2.667 2.667 0 11-5.334 0V17.333A9.333 9.333 0 0032 8z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        d="M24 30.667a4 4 0 11-8 0 4 4 0 018 0zM48 30.667a4 4 0 11-8 0 4 4 0 018 0z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgWelfareToolOutlined
