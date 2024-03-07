import * as React from 'react'

function SvgSearchOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8zM2.667 24c0-11.782 9.55-21.333 21.333-21.333 11.782 0 21.333 9.55 21.333 21.333 0 11.782-9.55 21.333-21.333 21.333-11.782 0-21.333-9.55-21.333-21.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M42.667 42.667v1.567l10.595 10.671 1.614-1.586-10.683-10.652h-1.526zm-5.334-2.4a2.933 2.933 0 012.934-2.934h4.918c.777 0 1.522.308 2.072.857l13.102 13.065a2.933 2.933 0 01-.016 4.17l-5.046 4.958a2.933 2.933 0 01-4.137-.026L38.184 47.29a2.933 2.933 0 01-.852-2.067v-4.956z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgSearchOutlined
