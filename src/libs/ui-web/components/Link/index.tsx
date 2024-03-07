import React, {FC} from 'react'
import {ILink} from './types'
import {LinkText, Root} from './styles'

const Link: FC<React.PropsWithChildren<ILink>> = (props) => {
  const {
    as,
    className,
    children,
    flat = false,
    flex,
    analysis,
    size = 'sm',
    color = 'fontPrimary',
    disabled = false,
    isLoading = false,
    onClick = () => null,
  } = props

  const handleOnClick = (): void => {
    onClick()
  }

  const renderComponent = () => {
    if (disabled || isLoading) {
      return null
    }

    return as
  }

  return (
    <Root
      alignItems="center"
      analysis={analysis}
      borderRadius={flat ? 'none' : 'sm'}
      className={className}
      color={color}
      disabled={disabled || isLoading}
      flat={flat}
      flex={flex}
      flexDirection="row"
      justifyContent="center"
      onClick={handleOnClick}
      opacityBorderColor={color}
      size={size}
    >
      <>{renderComponent()}</>
      <LinkText flat={flat} size={size} textAlign="center" textColor={color}>
        {isLoading ? (
          <span aria-label="content-loader">loading...</span>
        ) : (
          children
        )}
      </LinkText>
    </Root>
  )
}

export default Link
