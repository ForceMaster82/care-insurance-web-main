import * as React from 'react'

function SvgMyWorkOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M8.774 26.426v27.87c0 .514.416.93.93.93h44.593a.929.929 0 00.929-.93v-27.87H60.8v27.87a6.503 6.503 0 01-6.503 6.504H9.703A6.503 6.503 0 013.2 54.297V26.426h5.574zM30.142 8.774a4.645 4.645 0 00-4.645 4.645v3.716h-5.574V13.42c0-5.644 4.575-10.219 10.22-10.219h3.715c5.644 0 10.22 4.575 10.22 10.22v3.716h-5.575v-3.717a4.645 4.645 0 00-4.645-4.645h-3.716z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M9.703 19.923a.929.929 0 00-.929.929v5.574a4.645 4.645 0 004.646 4.645h37.16a4.645 4.645 0 004.646-4.645v-5.574a.929.929 0 00-.929-.93H9.703zm-6.503.929a6.503 6.503 0 016.503-6.504h44.594a6.503 6.503 0 016.503 6.504v5.574c0 5.644-4.575 10.22-10.22 10.22H13.42c-5.644 0-10.22-4.576-10.22-10.22v-5.574z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgMyWorkOutlined
