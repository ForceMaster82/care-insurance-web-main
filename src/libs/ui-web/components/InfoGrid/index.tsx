import React, {FC} from 'react'
import {InfoGridLabel, InfoGridText, Root} from './styles'
import {IInfoGrid} from './types'

const InfoGrid: FC<React.PropsWithChildren<IInfoGrid>> = (props) => {
  const {
    disabled,
    children,
    color = 'fontPrimary',
    label,
    size = 'sm',
    ...rest
  } = props

  const renderLabel = () => {
    if (!label) {
      return null
    }

    return (
      <InfoGridLabel infoGridSize={size} textColor="fontSecondary">
        {label}
      </InfoGridLabel>
    )
  }

  return (
    <Root
      alignItems="center"
      backgroundColor="bgPrimary"
      borderColor="borderSecondary"
      borderRadius="sm"
      borderWidth="size1"
      disabled={disabled}
      gap="xs"
      justifyContent="center"
      p="sm"
      {...rest}
      size={size}
      variant="outlined"
    >
      {renderLabel()}
      <InfoGridText infoGridSize={size} textColor={color}>
        {children}
      </InfoGridText>
    </Root>
  )
}

export default InfoGrid
