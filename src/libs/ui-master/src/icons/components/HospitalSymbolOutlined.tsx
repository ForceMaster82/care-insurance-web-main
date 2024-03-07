import * as React from 'react'

function SvgHospitalSymbolOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M2.667 5.6A2.933 2.933 0 015.6 2.667h52.8A2.933 2.933 0 0161.333 5.6v52.8a2.933 2.933 0 01-2.933 2.933H5.6A2.933 2.933 0 012.667 58.4V5.6zM8 8v48h48V8H8z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M18.667 32a2.667 2.667 0 012.666-2.667h21.334a2.667 2.667 0 110 5.334H21.333A2.667 2.667 0 0118.667 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 20a2.667 2.667 0 012.667 2.667v20a2.667 2.667 0 01-5.334 0v-20A2.667 2.667 0 0132 20z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgHospitalSymbolOutlined
