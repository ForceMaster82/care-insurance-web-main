import {type ITypography, Typography} from '@caredoc/ui-web'
import React, {PropsWithChildren} from 'react'
import styled from 'styled-components'

export interface IEllipsisTypographyProps extends ITypography {
  line?: number
}

const EllipsisTypography = ({
  children,
  line = 1,
  ...rest
}: PropsWithChildren<IEllipsisTypographyProps>) => {
  return (
    <Typography {...rest}>
      <EllipsisArea line={line}>{children}</EllipsisArea>
    </Typography>
  )
}

const EllipsisArea = styled.span<{line: number}>`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({line}) => line};
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`
export default EllipsisTypography
