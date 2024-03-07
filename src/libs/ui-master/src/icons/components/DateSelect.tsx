import * as React from 'react'

function SvgDateSelect(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M8 13.333V56h48V13.333H8zm-5.333-2.4A2.933 2.933 0 015.6 8h52.8a2.933 2.933 0 012.933 2.933V58.4a2.933 2.933 0 01-2.933 2.933H5.6A2.933 2.933 0 012.667 58.4V10.933z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M41.824 33.388a2.667 2.667 0 01.121 3.77L32.14 47.615a2.933 2.933 0 01-4.28 0l-5.805-6.192a2.667 2.667 0 113.89-3.648L30 42.101l8.055-8.591a2.667 2.667 0 013.769-.122zM17.333 2.667A2.667 2.667 0 0120 5.333v8a2.667 2.667 0 11-5.333 0v-8a2.667 2.667 0 012.666-2.666zM46.667 2.667a2.667 2.667 0 012.666 2.666v8a2.667 2.667 0 11-5.333 0v-8a2.667 2.667 0 012.667-2.666zM2.667 22.667A2.667 2.667 0 015.333 20h53.334a2.667 2.667 0 010 5.333H5.333a2.667 2.667 0 01-2.666-2.666z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgDateSelect
