import {colors} from '@caredoc/ui-master'
import React, {FC} from 'react'
import {ImageOptionText, Root} from './styles'
import {IImageOption} from './types'

const ImageOption: FC<React.PropsWithChildren<IImageOption>> = (props) => {
  const {renderImage, size = 'sm', selected = false, onSelect, children} = props

  const handleOnSelect = () => {
    onSelect && onSelect(!selected)
  }

  return (
    <Root
      alignItems="center"
      backgroundColor={(selected && 'primaryVariant') || 'bgPrimary'}
      borderColor={(selected && 'transparent') || 'borderSecondary'}
      borderRadius="sm"
      borderWidth="sm"
      justifyContent="center"
      onClick={handleOnSelect}
      p="sm"
      variant="outlined"
    >
      {renderImage((selected && colors.fontWhite) || 'fontPrimary')}
      <ImageOptionText imageOptionSize={size} selected={selected}>
        {children}
      </ImageOptionText>
    </Root>
  )
}

export default ImageOption
