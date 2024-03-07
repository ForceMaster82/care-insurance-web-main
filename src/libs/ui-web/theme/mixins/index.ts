import {colors} from '@caredoc/ui-master'
import {css} from 'styled-components'

const TRANSITION_MS = 0.4
const HOVER_OPACITY = 0.7
const RIPPLE_OPACITY = 0.4

export const transition = css`
  transition: color, opacity, height, width,
    background-color ${TRANSITION_MS}s cubic-bezier(0.25, 0.8, 0.5, 1);
`

export const clickable = css`
  cursor: pointer;
  user-select: none;
  outline: none;
`

export const ripple = {
  input: css`
    position: relative;
    background-position: center;
    transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s; /* Safari */

    @media (hover: hover) {
      &:hover {
        opacity: ${HOVER_OPACITY};
      }
    }

    &:after {
    }

    &:active:after {
    }

    &:active {
      opacity: ${RIPPLE_OPACITY};
      transition-duration: 0.4s;
      -webkit-transition-duration: 0.4s; /* Safari */
    }
  `,
  list: css`
    position: relative;
    transition-duration: 0.4s;
    -webkit-transition-duration: 0.4s; /* Safari */

    &:hover {
      background-color: ${colors.bgSecondary};
    }
  `,
}
