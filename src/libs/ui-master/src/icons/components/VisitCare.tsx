import * as React from 'react'

function SvgVisitCare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 9.104L11.77 29.334h2.896V56H24V42.933A2.933 2.933 0 0126.933 40h10.134A2.933 2.933 0 0140 42.933V56h9.333V29.333h2.896L31.999 9.104zm-2.074-5.468a2.933 2.933 0 014.148 0L60.097 29.66c1.848 1.848.54 5.008-2.074 5.008h-3.356V58.4a2.933 2.933 0 01-2.934 2.933H37.6a2.933 2.933 0 01-2.933-2.933V45.333h-5.334V58.4a2.933 2.933 0 01-2.933 2.933H12.267A2.933 2.933 0 019.333 58.4V34.667H5.977c-2.613 0-3.922-3.16-2.074-5.008L29.926 3.636z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M24 23.524h16v5.333H24v-5.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M34.667 19.333V34h-5.334V19.333h5.334z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgVisitCare
