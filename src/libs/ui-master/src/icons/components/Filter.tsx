import * as React from 'react'

function SvgFilter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M8.027 5.6a2.933 2.933 0 012.933-2.933h42.133A2.933 2.933 0 0156.027 5.6v9.626c0 .757-.293 1.485-.818 2.031L40.027 33.074v25.112c0 2.304-2.535 3.71-4.488 2.488L25.405 54.34a2.933 2.933 0 01-1.378-2.488v-18.78L8.844 17.258a2.933 2.933 0 01-.817-2.031V5.6z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgFilter
