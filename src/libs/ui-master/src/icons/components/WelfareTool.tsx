import * as React from 'react'

function SvgWelfareTool(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <g clipPath="url(#welfare-tool_svg__clip0_2926_124)">
        <path
          clipRule="evenodd"
          d="M17.393 19C18.067 11.525 24.35 5.667 32 5.667c7.65 0 13.933 5.858 14.607 13.333h-5.274v11.685a4 4 0 105.333 0V19h11.678a2.933 2.933 0 012.882 3.482L53.709 61.95a2.933 2.933 0 01-2.882 2.384H13.173c-1.408 0-2.618-1-2.882-2.384L2.774 22.482A2.933 2.933 0 015.656 19h11.677v11.685a4 4 0 105.333 0V19h-5.273zm5.368 0c.647-4.523 4.537-8 9.239-8 4.702 0 8.592 3.477 9.239 8H22.76z"
          fill={props.fill}
          fillRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="welfare-tool_svg__clip0_2926_124">
          <path d="M0 0h64v64H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default SvgWelfareTool
