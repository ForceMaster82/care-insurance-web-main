import * as React from 'react'

function SvgNotice(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M48 9.878L22.695 24.02c-.437.244-.93.372-1.431.372H8v12.55h13.264c.5 0 .994.127 1.43.372L48 51.455V9.878zm.97-6.65c1.954-1.093 4.363.32 4.363 2.56v49.757c0 2.24-2.409 3.654-4.364 2.561L20.64 42.275H5.6a2.933 2.933 0 01-2.933-2.934V21.992A2.933 2.933 0 015.6 19.06H20.64l28.33-15.832z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M24 20v21.333h-5.333V20H24z"
        fill={props.fill}
        fillRule="evenodd"
      />
      <path
        clipRule="evenodd"
        d="M11.418 39.212L17.982 56H22l-5.804-14.846 4.967-1.942 7.084 18.12c.752 1.924-.666 4.001-2.732 4.001h-9.172a2.933 2.933 0 01-2.732-1.865l-7.16-18.314 4.967-1.942zM54.19 24.724c-1.069-1.425-2.342-2.057-3.523-2.057v-5.334c3.236 0 5.963 1.756 7.79 4.191 1.826 2.435 2.876 5.676 2.876 9.143 0 3.466-1.05 6.707-2.876 9.142C56.63 42.245 53.903 44 50.667 44v-5.333c1.181 0 2.454-.633 3.523-2.058 1.07-1.426 1.81-3.518 1.81-5.942 0-2.425-.74-4.517-1.81-5.943z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgNotice
