import * as React from 'react'

function SvgBedOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M13.42 27.355A4.645 4.645 0 008.773 32v26.013a2.787 2.787 0 11-5.574 0V32c0-5.644 4.576-10.22 10.22-10.22h37.16c5.645 0 10.22 4.576 10.22 10.22v26.013a2.787 2.787 0 11-5.574 0V32a4.645 4.645 0 00-4.645-4.645H13.419z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M15.278 8.774a4.645 4.645 0 00-4.646 4.645v14.865H5.059V13.419C5.058 7.775 9.634 3.2 15.278 3.2h33.445c5.644 0 10.22 4.575 10.22 10.22v14.864h-5.575V13.419a4.645 4.645 0 00-4.645-4.645H15.278zM58.013 47.794H5.987v-5.575h52.026v5.575z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M23.639 18.064v4.646h-5.574v-5.575a4.645 4.645 0 014.645-4.645h18.58a4.645 4.645 0 014.646 4.646v5.574H40.36v-4.646H23.64z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgBedOutlined
