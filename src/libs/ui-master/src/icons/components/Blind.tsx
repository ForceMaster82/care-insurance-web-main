import * as React from 'react'

function SvgBlind(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" height="1em" viewBox="0 0 64 64" width="1em" {...props}>
      <path
        clipRule="evenodd"
        d="M55.416 7a2.667 2.667 0 10-4.165-3.333l-6.083 7.604c-3.737-1.169-8.117-1.94-13.168-1.94-10.277 0-17.778 3.19-22.731 6.437C6.8 17.386 4.974 19.011 3.75 20.25a24.68 24.68 0 00-1.392 1.526c-.159.19-.281.345-.369.458l-.156.21a2.667 2.667 0 004.33 3.112 10.476 10.476 0 01.292-.366c.23-.275.592-.688 1.09-1.193.999-1.011 2.538-2.386 4.647-3.768 4.2-2.754 10.7-5.564 19.807-5.564 3.58 0 6.757.434 9.55 1.129l-3.895 4.869A12.615 12.615 0 0032 19.333c-6.995 0-12.667 5.671-12.667 12.667 0 3.036 1.068 5.822 2.85 8.004l-5.112 6.389a32.254 32.254 0 01-4.878-2.623c-2.11-1.383-3.648-2.757-4.646-3.769-.499-.505-.861-.917-1.09-1.193l-.294-.367a2.667 2.667 0 00-4.33 3.114l.158.209c.087.113.21.268.369.459.317.38.78.906 1.391 1.525 1.223 1.24 3.05 2.864 5.518 4.482a37.395 37.395 0 004.366 2.457l-5.05 6.314a2.667 2.667 0 004.164 3.332l6.084-7.606a84 84 0 00.083.026l3.621-4.527-.086-.021 3.894-4.868.074.037 3.478-4.347a7.288 7.288 0 01-.083-.025L38.35 28.33l.043.076 3.476-4.346a10.402 10.402 0 00-.052-.064l5.112-6.39.077.033 3.434-4.292-.075-.035 5.05-6.313zm-21.23 17.998A7.333 7.333 0 0025.65 35.67L34.188 25zm17.594-4.787l3.345-4.181a33.65 33.65 0 015.124 4.22c.611.62 1.074 1.145 1.391 1.526.16.19.282.345.37.458l.156.21a2.667 2.667 0 01-4.33 3.114l-.293-.368a19.35 19.35 0 00-1.09-1.193c-.998-1.011-2.537-2.386-4.646-3.768l-.027-.018zm-7.374 9.218l-12.19 15.236c6.896-.116 12.45-5.742 12.45-12.665 0-.881-.09-1.741-.26-2.572zM28.59 49.197l-3.918 4.898c2.264.363 4.706.57 7.328.57 10.277 0 17.778-3.189 22.731-6.436 2.468-1.617 4.295-3.243 5.518-4.482a24.68 24.68 0 001.392-1.525c.159-.19.281-.346.369-.459l.156-.209a2.667 2.667 0 00-4.33-3.112l-.048.062c-.049.063-.13.166-.245.303-.229.276-.591.688-1.09 1.194-.998 1.01-2.537 2.385-4.646 3.768-4.2 2.753-10.7 5.563-19.807 5.563-1.18 0-2.317-.047-3.41-.135z"
        fill={props.fill}
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SvgBlind
