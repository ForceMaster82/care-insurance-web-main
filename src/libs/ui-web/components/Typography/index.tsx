import React, {FC} from 'react'
import {Root} from './styles'
import {ITypography} from './types'

/**
 * font color alias (textColor)
 * - fontPrimary: n700
 * - fontSecondary: n600
 * - fontTertiary: n500
 * - fontWhite: n000
 */
const Typography: FC<React.PropsWithChildren<ITypography>> = (props) => {
  const {
    textColor = 'fontPrimary',
    backgroundColor,
    variant = 'body2',
    children,
    ...rest
  } = props
  return (
    <Root
      {...rest}
      backgroundColor={backgroundColor}
      textColor={textColor}
      variant={variant}
    >
      {children}
    </Root>
  )
}

export default Typography
