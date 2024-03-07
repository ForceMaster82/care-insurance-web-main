import * as React from 'react'

function SvgMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M58.667 16.8H5.333V9.867h53.334V16.8zM58.667 35.467H5.333v-6.934h53.334v6.934zM58.667 54.133H5.333V47.2h53.334v6.933z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgMenu
