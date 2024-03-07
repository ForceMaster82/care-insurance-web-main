/* eslint-disable no-magic-numbers */
import React, {FC, forwardRef} from 'react'
import {isWebview} from '@caredoc/utils-web'
import {ClickableRoot, Root} from './styles'
import {IBox} from './types'

/**
 * spacing alias (gap, padding)
 * - size0: 0
 * - size1: 2
 * - size2: 4
 * - size3: 8
 * - size4: 16
 * - size5: 20
 * - size6: 24
 * - size7: 32
 * - size8: 48
 * - size9: 56
 * - size10: 64
 * - none: size0
 * - xxs: size2
 * - xs: size3
 * - sm: size4
 * - md: size6
 * - lg: size7
 * - xl: size8
 * - xxl: size10
 * - full: '100%'
 *
 * bg color alias (bg, backgroundColor)
 * - bgPrimary: n000
 * - bgSecondary: n100
 * - transparent: 'transparent'
 */
const Box: FC<React.PropsWithChildren<IBox>> = forwardRef((props, ref) => {
  // const {actions} = useAnalysisContext()
  const {
    as,
    children,
    analysis,
    elevation = 'elevation-1',
    flexDirection = 'column',
    flexWrap = 'nowrap',
    alignItems = 'stretch',
    justifyContent = 'flex-start',
    onClick,
    disabled = false,
    ...rest
  } = props

  const commonProps = {
    as,
    ...rest,
    alignItems,
    disabled,
    elevation,
    flexDirection,
    flexWrap,
    justifyContent,
    ref,
  }
  const logEvent = () => {
    if (!analysis) {
      return
    }

    const {
      channels,
      targetAction = 'click',
      targetType = 'button',
      target,
      parameters,
      namespace,
      platform = isWebview() ? 'app' : 'web',
    } = analysis

    const event = new CustomEvent('ANALYSIS_TRIGGER', {
      detail: [
        channels,
        targetAction,
        targetType,
        target,
        parameters,
        namespace,
        platform,
      ],
    })
    window.dispatchEvent(event)
  }
  const handleOnClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    logEvent()
    onClick && onClick(event)
  }

  if (onClick && !disabled) {
    return (
      <ClickableRoot role="button" {...commonProps} onClick={handleOnClick}>
        {children}
      </ClickableRoot>
    )
  }

  return <Root {...commonProps}>{children}</Root>
})

export default Box
