import * as React from 'react'

function SvgFilterOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M8 5.6a2.933 2.933 0 012.933-2.933h42.134A2.933 2.933 0 0156 5.6v9.626c0 .757-.293 1.485-.817 2.031L40 33.074v25.112c0 2.304-2.534 3.71-4.488 2.488L25.379 54.34A2.933 2.933 0 0124 51.852v-18.78L8.817 17.258A2.933 2.933 0 018 15.228V5.6zM13.333 8v6.26l15.183 15.816c.525.546.817 1.274.817 2.031v18.415l5.334 3.333V32.107c0-.757.292-1.485.817-2.031L50.667 14.26V8H13.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgFilterOutlined
