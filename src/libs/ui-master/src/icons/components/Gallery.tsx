import * as React from 'react'

function SvgGallery(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M2.693 5.6a2.933 2.933 0 012.934-2.933h52.8A2.933 2.933 0 0161.36 5.6v52.8a2.933 2.933 0 01-2.933 2.933h-52.8A2.933 2.933 0 012.693 58.4V5.6zM8.027 8v48h48V8h-48z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        d="M41.754 26.47a2.933 2.933 0 014.005-.112l14.23 12.588c.63.556.99 1.356.99 2.197V58.4a2.933 2.933 0 01-2.933 2.933H13.628c-2.621 0-3.926-3.176-2.062-5.019l30.188-29.845z"
        fill={props.fill}
      />
      <path
        d="M15.049 38.45a2.933 2.933 0 014.38 0l6.521 7.32c.479.537.743 1.231.743 1.95V58.4a2.933 2.933 0 01-2.933 2.933H5.627A2.933 2.933 0 012.693 58.4v-4.965c0-.72.265-1.414.743-1.951L15.05 38.45z"
        fill={props.fill}
      />
      <path
        clipRule="evenodd"
        d="M14.693 21.333a6.667 6.667 0 1113.334 0 6.667 6.667 0 01-13.334 0z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgGallery
