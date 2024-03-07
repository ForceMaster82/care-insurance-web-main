import * as React from 'react'

function SvgCloseCircleOutlined(props: React.SVGProps<SVGSVGElement>) {
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
        d="M19.448 19.448a2.667 2.667 0 013.771 0L44.552 40.78a2.667 2.667 0 11-3.77 3.771L19.447 23.22a2.667 2.667 0 010-3.771z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M44.552 19.448a2.667 2.667 0 010 3.771L23.22 44.552a2.667 2.667 0 11-3.771-3.77L40.78 19.447a2.667 2.667 0 013.771 0z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCloseCircleOutlined
