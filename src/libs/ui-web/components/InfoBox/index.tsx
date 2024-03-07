import {IconType} from '@caredoc/ui-master'
import React, {FC} from 'react'
import {InfoBoxIcon, InfoBoxText, Root} from './styles'
import {IInfoBox} from './types'

export enum IconNameMap {
  error = 'close-circle',
  info = 'help',
  success = 'check-circle--filled',
  warning = 'alert',
}

const InfoBox: FC<React.PropsWithChildren<IInfoBox>> = (props) => {
  const {children, state, size = 'sm', ...rest} = props

  return (
    <Root
      alignItems="center"
      backgroundColor="bgPrimary"
      borderRadius="sm"
      flexDirection="row"
      gap="xs"
      size={size}
      state={state}
      {...rest}
    >
      <InfoBoxIcon
        name={IconNameMap[state] as IconType}
        size={size}
        state={state}
      />
      <InfoBoxText infoBoxSize={size} state={state}>
        {children}
      </InfoBoxText>
    </Root>
  )
}

export default InfoBox
