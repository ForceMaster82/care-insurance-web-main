import * as React from 'react'

function SvgMenuOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M3.2 11.26c0-.917.806-1.66 1.8-1.66h54c.994 0 1.8.743 1.8 1.66v1.659c0 .916-.806 1.659-1.8 1.659H5c-.994 0-1.8-.743-1.8-1.66V11.26zM3.2 31.17c0-.916.806-1.659 1.8-1.659h54c.994 0 1.8.743 1.8 1.66v1.659c0 .916-.806 1.659-1.8 1.659H5c-.994 0-1.8-.743-1.8-1.66V31.17zM3.2 51.081c0-.916.806-1.659 1.8-1.659h54c.994 0 1.8.743 1.8 1.66v1.659c0 .916-.806 1.659-1.8 1.659H5c-.994 0-1.8-.743-1.8-1.66v-1.659z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgMenuOutlined
