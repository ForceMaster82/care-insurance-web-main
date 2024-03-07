import * as React from 'react'

function SvgStatement(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M17.333 13.333A3.467 3.467 0 0120.8 9.867h34.4a3.467 3.467 0 110 6.933H20.8a3.467 3.467 0 01-3.467-3.467zM17.333 32a3.467 3.467 0 013.467-3.467h34.4a3.467 3.467 0 010 6.934H20.8A3.467 3.467 0 0117.333 32zM17.333 50.667A3.467 3.467 0 0120.8 47.2h34.4a3.467 3.467 0 010 6.933H20.8a3.467 3.467 0 01-3.467-3.466z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        d="M13.333 13.333a4 4 0 11-8 0 4 4 0 018 0zM13.333 32a4 4 0 11-8 0 4 4 0 018 0zM13.333 50.667a4 4 0 11-8 0 4 4 0 018 0z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgStatement
