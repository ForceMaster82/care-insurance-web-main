import * as React from 'react'

function SvgCheckBold(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M51.33 16.271a5 5 0 01.415 7.059l-21.333 24a5 5 0 01-7.474 0l-10.667-12a5 5 0 017.474-6.644l6.93 7.796L44.27 16.686a5 5 0 017.059-.415z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgCheckBold
