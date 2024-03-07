import * as React from 'react'

function SvgVisitNursing(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M32 8.443l-24 14.4V56h48V22.843l-24-14.4zM30.49 3.13a2.933 2.933 0 013.02 0l26.4 15.84a2.933 2.933 0 011.423 2.515V58.4a2.933 2.933 0 01-2.933 2.933H5.6A2.933 2.933 0 012.667 58.4V21.484c0-1.03.54-1.985 1.424-2.515l26.4-15.84z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 20a4 4 0 100 8 4 4 0 000-8zm-9.333 4a9.333 9.333 0 1118.666 0 9.333 9.333 0 01-18.666 0z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M32 36c-8.1 0-14.667 6.566-14.667 14.667H12c0-11.046 8.954-20 20-20s20 8.954 20 20h-5.333C46.667 42.567 40.1 36 32 36z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M29.333 42.667h12V48h-12v-5.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M38.013 40v10.667H32.68V40h5.333z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgVisitNursing
