import {colors} from '@caredoc/ui-master'
import {Box} from '@caredoc/ui-web'
import React from 'react'
import styled from 'styled-components'

export const Loading = () => {
  return (
    <Box alignItems="center" height="100vh" justifyContent="center" p="xl">
      <Loader>
        <div />
        <div />
        <div />
        <div />
      </Loader>
    </Box>
  )
}

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 40px;
  height: 40px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 32px;
    height: 32px;
    margin: 4px;
    border: 4px solid ${colors.primary};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${colors.primary} transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Loading
