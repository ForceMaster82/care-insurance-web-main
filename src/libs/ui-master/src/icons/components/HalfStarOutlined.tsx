import * as React from 'react'

function SvgHalfStarOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M32 11.697l-5.722 12.396a2.933 2.933 0 01-2.312 1.684l-12.87 1.549 9.36 9.36c.661.66.968 1.596.826 2.52l-2.24 14.558 11.56-6.262A2.931 2.931 0 0132 47.148v5.663l-14.668 7.945c-2.132 1.155-4.665-.629-4.296-3.026l2.79-18.133-11.99-11.99c-1.731-1.73-.707-4.694 1.723-4.987l16.439-1.978L29.337 4.74A2.896 2.896 0 0132 3.036v8.66z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgHalfStarOutlined
