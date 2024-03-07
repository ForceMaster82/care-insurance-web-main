import * as React from 'react'

function SvgPerson(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M2.696 58.358c.21-13.626 13.829-23.691 29.33-23.691 15.502 0 29.122 10.065 29.332 23.69a2.931 2.931 0 01-2.931 2.976h-52.8a2.931 2.931 0 01-2.931-2.975zM17.36 17.333c0-8.1 6.567-14.666 14.667-14.666s14.666 6.566 14.666 14.666c0 8.1-6.566 14.667-14.666 14.667-8.1 0-14.667-6.567-14.667-14.667z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgPerson
