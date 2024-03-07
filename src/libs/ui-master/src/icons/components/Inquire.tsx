import * as React from 'react'

function SvgInquire(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32.564 8C18.944 8 8 18.797 8 32s10.945 24 24.564 24c9.696 0 18.054-5.483 22.051-13.413l-13.28-8.047c-2.007-1.216-1.845-4.179.282-5.169l13.72-6.383C51.7 14.22 42.893 8 32.565 8zM2.667 32c0-16.253 13.438-29.333 29.897-29.333 13.42 0 24.811 8.683 28.579 20.694a2.932 2.932 0 01-1.562 3.535L47.947 32.31l11.25 6.817a2.932 2.932 0 011.203 3.597c-4.372 10.917-15.203 18.61-27.835 18.61C16.105 61.333 2.667 48.252 2.667 32z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M24.381 20.914a3.467 3.467 0 013.467 3.467v1.333a3.467 3.467 0 11-6.934 0v-1.333a3.467 3.467 0 013.467-3.467z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgInquire
