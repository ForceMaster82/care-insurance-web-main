import * as React from 'react'

function SvgCareplusOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M38.667 9.147c-2.263 1.072-4.524 2.847-6.667 5.454C32 14.601 26.667 8 20.105 8 11.9 8 1.86 16.207 6.516 30.638 11.172 45.068 32 56 32 56s17.273-9.794 24-21.721"
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={6}
      />
      <path
        d="M42.667 18.667h16M50.667 10.667v16"
        stroke={props.fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={6}
      />
    </svg>
  )
}

export default SvgCareplusOutlined
