import * as React from 'react'

function SvgChat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        d="M2.667 28.382C2.667 13.837 16.185 2.667 32 2.667c15.815 0 29.333 11.17 29.333 25.715S47.815 54.098 32 54.098c-1.472 0-2.888-.118-4.231-.285a2137.3 2137.3 0 01-8.897 6.638c-2.1 1.557-4.93-.188-4.657-2.676l.917-8.341C7.705 44.872 2.667 37.203 2.667 28.382z"
        fill={props.fill}
      />
    </svg>
  )
}

export default SvgChat
