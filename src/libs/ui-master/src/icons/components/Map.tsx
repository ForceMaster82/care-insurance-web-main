import * as React from 'react'

function SvgMap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32.027 2.667c-10.6 0-18.667 9.57-18.667 20.69 0 3.146 1.071 6.295 2.521 9.152 1.462 2.88 3.399 5.638 5.34 8.05 3.88 4.825 7.967 8.498 8.875 9.295a2.921 2.921 0 003.862 0c.907-.797 4.993-4.47 8.875-9.294 1.94-2.413 3.878-5.171 5.34-8.05 1.45-2.858 2.52-6.006 2.52-9.154 0-11.119-8.067-20.69-18.666-20.69zm0 12a6.667 6.667 0 100 13.333 6.667 6.667 0 000-13.333zM2.693 37.6a2.933 2.933 0 012.934-2.933h7.733V40H8.027v21.333H2.693V37.6zM61.36 37.6a2.933 2.933 0 00-2.933-2.933h-7.734V40h5.334v21.333h5.333V37.6z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgMap
