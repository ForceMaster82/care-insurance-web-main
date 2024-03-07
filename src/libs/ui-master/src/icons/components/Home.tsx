import * as React from 'react'

function SvgHome(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M29.926 3.636a2.933 2.933 0 014.148 0L60.097 29.66c1.848 1.848.54 5.008-2.074 5.008h-5.245V58.4a2.933 2.933 0 01-2.934 2.934H37.6a2.933 2.933 0 01-2.933-2.934V45.334h-5.334V58.4a2.933 2.933 0 01-2.933 2.934H14.156a2.933 2.933 0 01-2.934-2.934V34.667H5.977c-2.613 0-3.922-3.16-2.074-5.008L29.926 3.637z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgHome
