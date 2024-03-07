import * as React from 'react'

function SvgChatOutlined(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M2.667 28.382C2.667 13.837 16.185 2.667 32 2.667c15.815 0 29.333 11.17 29.333 25.715S47.815 54.098 32 54.098c-1.472 0-2.888-.118-4.231-.285-2.78 2.09-7.37 5.507-8.897 6.638-2.1 1.557-4.93-.188-4.657-2.676l.917-8.341C7.705 44.872 2.667 37.203 2.667 28.382zM32 8C18.375 8 8 17.486 8 28.382c0 7.086 4.305 13.514 11.081 17.175a2.935 2.935 0 011.523 2.902l-.485 4.416c1.9-1.416 3.923-2.93 5.227-3.915a2.927 2.927 0 012.184-.56c1.498.215 2.977.364 4.47.364 13.625 0 24-9.485 24-20.382C56 17.486 45.625 8 32 8z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgChatOutlined
