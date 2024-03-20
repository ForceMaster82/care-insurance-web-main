import React, { useState } from 'react'
import styled from 'styled-components'

type Props = {
    children: React.ReactNode | React.ReactNode[];
    message: string;
    className?: string;
}

const RTooltip: React.FC<Props> = ({ children, message, className }) => {
    // @ts-ignore
    let scRTooltip = <><ScRTooltip className={className}>
        {children}
        <p className='tooltip'>{message}</p>
    </ScRTooltip></>;
    return scRTooltip
}

const ScRTooltip = styled.span`
  position: relative;
  
  .tooltip {
    position: absolute;
    left: -100%;
    top: -100%;
    min-width: 250px;
    min-height: 60px;
    padding: 10px;
    background-color: #777;
    color: #fff;
    font-size: 15px;
    border-radius: 10px;
    z-index: 10;
    display: none;
    white-space:pre-line;
  }

  &:hover {
    .tooltip {
      display: block;
    }
  }
`

export default RTooltip