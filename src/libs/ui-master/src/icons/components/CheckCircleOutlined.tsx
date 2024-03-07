import * as React from 'react'

function SvgCheckCircleOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 8C18.745 8 8 18.745 8 32s10.745 24 24 24 24-10.745 24-24S45.255 8 32 8zM2.667 32C2.667 15.8 15.8 2.667 32 2.667S61.333 15.8 61.333 32 48.2 61.333 32 61.333 2.667 48.2 2.667 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M47.172 20.736a2.667 2.667 0 01.092 3.77L29.486 43.172a2.667 2.667 0 01-3.861 0l-8.89-9.333a2.667 2.667 0 013.863-3.678l6.957 7.306 15.847-16.64a2.667 2.667 0 013.77-.091z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCheckCircleOutlined
